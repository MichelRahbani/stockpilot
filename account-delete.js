"use strict";
/*
 * Self-serve account deletion for StockPilot.
 *
 * Plugs into server.js with one line. Handles only /api/account/* and ignores
 * everything else, so it cannot affect quotes, history, or any other route.
 *
 * Needs (set as Railway environment variables, never in code):
 *   SUPABASE_SERVICE_KEY       the Supabase "service_role" secret. Without it this
 *                              module does nothing and reports itself as disabled.
 *   ACCOUNT_DELETE_ALLOWLIST   comma-separated emails. While set, ONLY those accounts can
 *                              delete. Use it for the first test.
 *   ACCOUNT_DELETE_ENABLED     set to "true" to open the feature to everyone.
 *
 * The feature is OFF unless one of those two is set, even when the service key
 * exists (the key is also used by the leaderboard jobs, so its presence alone must
 * not switch on anything destructive).
 *
 * What it will and will not do:
 *   - Deletes everything tied to the signed-in person's account, then their login.
 *   - Refuses (409) if the person OWNS a class, tournament, or league, because
 *     deleting those would also wipe other people's data. The UI tells them what
 *     they own and how to ask us to remove it.
 *   - Deletes the login LAST. If any step fails the login is kept, so the person
 *     can simply try again; every step is safe to repeat.
 *   - Some older shared-game tables (e.g. Crash Survival scores) only store a
 *     display name, not an account. Those rows cannot be tied to one person and
 *     are left alone. The confirmation screen says so.
 */

const DEFAULT_SUPABASE_URL = "https://xkfxofcmrmpazfjviatq.supabase.co";
const ALLOWED_ORIGINS = new Set(["https://mystockspilot.com", "https://www.mystockspilot.com"]);
const SAFE_ID = /^[A-Za-z0-9_-]{1,64}$/;
const CHUNK = 50;
const REQUEST_TIMEOUT_MS = 15000;
const MAX_BODY_BYTES = 10 * 1024;

const baseUrl = () => process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const serviceKey = () => process.env.SUPABASE_SERVICE_KEY || "";
const switchedOn = () => !!serviceKey() && (process.env.ACCOUNT_DELETE_ENABLED === "true" || allowlist().length > 0);
const allowlist = () => (process.env.ACCOUNT_DELETE_ALLOWLIST || "")
  .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

// ---------------------------------------------------------------- what to delete
// Things a person OWNS. If they own any, we do not delete automatically.
const OWNED = [
  ["classes", "instructor_id", "class"],
  ["bullpen_showdown_tournaments", "commissioner_user_id", "Showdown tournament"],
  ["bullpen_madness_tournaments", "commissioner_user_id", "Madness tournament"],
  ["sports_fantasy_leagues", "commissioner_user_id", "Sports Fantasy league"]
];

// Rows that name the person by account id. [table, column]
const DIRECT = [
  ["assignment_comments", "user_id"],
  ["assignment_comments", "student_user_id"],
  ["assignment_completions", "user_id"],
  ["budget_challenge_submissions", "user_id"],
  ["budget_submissions", "user_id"],
  ["bullpen_team_members", "user_id"],
  ["class_co_teachers", "user_id"],
  ["class_fantasy_rosters", "user_id"],
  ["class_fantasy_trades", "from_user_id"],
  ["class_fantasy_trades", "to_user_id"],
  ["class_members", "user_id"],
  ["class_notifications", "user_id"],
  ["class_stream_comments", "user_id"],
  ["daily_challenge_submissions", "user_id"],
  ["instructor_subscriptions", "user_id"],
  ["leaderboard", "user_id"],
  ["sports_fantasy_rosters", "user_id"],
  ["sports_fantasy_trades", "from_user_id"],
  ["sports_fantasy_trades", "to_user_id"],
  ["student_badges", "user_id"],
  ["student_streaks", "user_id"],
  ["trades", "user_id"],
  ["user_data", "user_id"],
  ["virtual_portfolios", "user_id"]
];

// Tables that hold the person's posts. Replies/comments by OTHER people hang off
// them, so those go first or the delete would be refused.
const POSTS = [
  { table: "class_stream_posts", childTable: "class_stream_comments", childCol: "post_id" },
  { table: "class_fantasy_posts", childTable: "class_fantasy_posts", childCol: "parent_id" },
  { table: "sports_fantasy_posts", childTable: "sports_fantasy_posts", childCol: "parent_id" }
];

// Parents whose children point at them by internal id rather than account id.
// children are listed deepest-first. [childTable, childColumn, optional]
const TWO_HOP = [
  { table: "bullpen_showdown_entries", children: [["bullpen_showdown_trades", "entry_id"]] },
  {
    table: "bullpen_madness_entries",
    viaMid: { table: "bullpen_madness_table_members", col: "entry_id", children: [["bullpen_madness_trades", "table_member_id"]] }
  },
  {
    table: "bullpen_members",
    children: [
      ["bullpen_league_posts", "member_id"],
      ["bullpen_league_activity", "member_id"],
      ["bullpen_league_comments", "member_id", true],
      ["bullpen_weekly_scores", "member_id"],
      ["bullpen_trades", "from_member_id"],
      ["bullpen_trades", "to_member_id"]
    ]
  },
  { table: "tycoon_players", children: [["tycoon_holdings", "player_id"]] }
];

// ---------------------------------------------------------------- tiny helpers
const json = (res, status, body, origin) => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
};

const readBody = (req) => new Promise((resolve, reject) => {
  let size = 0; const chunks = [];
  req.on("data", (c) => { size += c.length; if (size > MAX_BODY_BYTES) { reject(new Error("body_too_large")); req.destroy(); } else chunks.push(c); });
  req.on("end", () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}); } catch (e) { reject(new Error("bad_json")); } });
  req.on("error", reject);
});

const sb = async (method, path, { token, prefer, body } = {}) => {
  const key = serviceKey();
  const headers = { apikey: key, Authorization: "Bearer " + (token || key), "Content-Type": "application/json" };
  if (prefer) headers.Prefer = prefer;
  const res = await fetch(baseUrl() + path, {
    method, headers, body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  });
  return res;
};

const eq = (v) => "eq." + encodeURIComponent(v);
const inList = (ids) => "in.(" + ids.join(",") + ")";
const chunks = (arr) => { const out = []; for (let i = 0; i < arr.length; i += CHUNK) out.push(arr.slice(i, i + CHUNK)); return out; };

const verifyToken = async (token) => {
  if (!token) return null;
  try {
    const res = await sb("GET", "/auth/v1/user", { token });
    if (!res.ok) return null;
    const u = await res.json();
    if (!u || !SAFE_ID.test(String(u.id || "")) || !u.email) return null;
    return { id: u.id, email: String(u.email) };
  } catch (e) { return null; }
};

const bearer = (req) => {
  const h = req.headers["authorization"] || "";
  return h.toLowerCase().startsWith("bearer ") ? h.slice(7).trim() : "";
};

// Rate limit real deletions: 3 attempts per person per 10 minutes.
const attempts = new Map();
const tooManyAttempts = (uid) => {
  const now = Date.now();
  const recent = (attempts.get(uid) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now); attempts.set(uid, recent);
  return recent.length > 3;
};

// ---------------------------------------------------------------- the work
class StepError extends Error { constructor(step, detail) { super(step); this.step = step; this.detail = detail; } }

// Delete rows matching one filter. Returns how many were removed.
const del = async (table, col, filterValue) => {
  const res = await sb("DELETE", `/rest/v1/${table}?${col}=${filterValue}`, { prefer: "count=exact,return=minimal" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new StepError(`${table}.${col}`, `${res.status} ${text.slice(0, 160)}`);
  }
  const range = res.headers.get("content-range") || "";
  const n = parseInt(range.split("/")[1], 10);
  return Number.isFinite(n) ? n : 0;
};

// Read the ids of rows matching one filter (used to find children to delete first).
const ids = async (table, col, value, optional) => {
  const res = await sb("GET", `/rest/v1/${table}?select=id&${col}=${value}`);
  if (!res.ok) {
    if (optional && res.status === 400) return []; // column/table not present in this project
    const text = await res.text().catch(() => "");
    throw new StepError(`read ${table}.${col}`, `${res.status} ${text.slice(0, 160)}`);
  }
  const rows = await res.json();
  const out = rows.map((r) => String(r.id));
  for (const id of out) if (!SAFE_ID.test(id)) throw new StepError(`read ${table}.${col}`, "unexpected id format");
  return out;
};

// Delete children of a set of parent ids, in chunks.
const delChildren = async (counts, table, col, parentIds, optional) => {
  for (const part of chunks(parentIds)) {
    try {
      counts[table] = (counts[table] || 0) + await del(table, col, inList(part));
    } catch (e) {
      if (optional && String(e.detail).startsWith("400")) continue;
      throw e;
    }
  }
};

const findOwned = async (uid) => {
  const owned = [];
  for (const [table, col, label] of OWNED) {
    let res = await sb("GET", `/rest/v1/${table}?select=id,name&${col}=${eq(uid)}`);
    if (res.status === 400) res = await sb("GET", `/rest/v1/${table}?select=id&${col}=${eq(uid)}`);
    if (!res.ok) throw new StepError(`check ${table}`, String(res.status));
    for (const r of await res.json()) owned.push({ type: label, name: r.name || "(unnamed)" });
  }
  return owned;
};

const deleteEverything = async (uid) => {
  const counts = {};
  const add = (t, n) => { counts[t] = (counts[t] || 0) + n; };
  const me = eq(uid);

  // 1) Posts, after clearing other people's replies/comments on them.
  for (const p of POSTS) {
    const postIds = await ids(p.table, "user_id", me);
    if (postIds.length) await delChildren(counts, p.childTable, p.childCol, postIds);
    add(p.table, await del(p.table, "user_id", me));
  }

  // 2) Records reached through internal ids (children first, then the parent).
  for (const g of TWO_HOP) {
    const parentIds = await ids(g.table, "user_id", me);
    if (parentIds.length) {
      if (g.viaMid) {
        for (const part of chunks(parentIds)) {
          const midIds = await ids(g.viaMid.table, g.viaMid.col, inList(part));
          if (midIds.length) {
            for (const [ct, cc] of g.viaMid.children) await delChildren(counts, ct, cc, midIds);
            add(g.viaMid.table, await del(g.viaMid.table, g.viaMid.col, inList(part)));
          }
        }
      }
      for (const [ct, cc, optional] of (g.children || [])) await delChildren(counts, ct, cc, parentIds, optional);
    }
    add(g.table, await del(g.table, "user_id", me));
  }

  // 3) Everything else that names the person directly.
  for (const [table, col] of DIRECT) add(table, await del(table, col, me));

  return counts;
};

const removeLogin = async (uid) => {
  const res = await sb("DELETE", `/auth/v1/admin/users/${encodeURIComponent(uid)}`);
  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => "");
    throw new StepError("remove login", `${res.status} ${text.slice(0, 160)}`);
  }
};

// ---------------------------------------------------------------- the routes
const handle = async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (!url.pathname.startsWith("/api/account/")) return false;
  const origin = req.headers["origin"] || "";

  if (req.method === "OPTIONS") {
    const headers = { "Cache-Control": "no-store" };
    if (ALLOWED_ORIGINS.has(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
      headers["Vary"] = "Origin";
      headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS";
      headers["Access-Control-Allow-Headers"] = "Authorization,Content-Type";
      headers["Access-Control-Max-Age"] = "600";
    }
    res.writeHead(204, headers); res.end();
    return true;
  }

  try {
    // Is the feature switched on (for this person, if an allowlist is active)?
    if (req.method === "GET" && url.pathname === "/api/account/status") {
      if (!switchedOn()) return json(res, 200, { enabled: false }, origin), true;
      const list = allowlist();
      if (!list.length) return json(res, 200, { enabled: true }, origin), true;
      const user = await verifyToken(bearer(req));
      return json(res, 200, { enabled: !!(user && list.includes(user.email.toLowerCase())) }, origin), true;
    }

    if (req.method === "POST" && url.pathname === "/api/account/delete") {
      if (!serviceKey()) return json(res, 503, { error: "not_configured" }, origin), true;
      if (!switchedOn()) return json(res, 503, { error: "not_enabled" }, origin), true;

      const user = await verifyToken(bearer(req));
      if (!user) return json(res, 401, { error: "not_signed_in" }, origin), true;

      const list = allowlist();
      if (list.length && !list.includes(user.email.toLowerCase())) {
        return json(res, 403, { error: "not_enabled_for_account" }, origin), true;
      }

      let body;
      try { body = await readBody(req); } catch (e) { return json(res, 400, { error: e.message }, origin), true; }

      const owned = await findOwned(user.id);
      if (owned.length) return json(res, 409, { error: "owns_data", owned }, origin), true;

      if (body.dryRun === true) return json(res, 200, { ok: true, canDelete: true, email: user.email }, origin), true;

      const typed = String(body.confirmEmail || "").trim().toLowerCase();
      if (body.confirm !== "DELETE" || typed !== user.email.toLowerCase()) {
        return json(res, 400, { error: "confirmation_mismatch" }, origin), true;
      }
      if (tooManyAttempts(user.id)) return json(res, 429, { error: "too_many_attempts" }, origin), true;

      let deleted;
      try { deleted = await deleteEverything(user.id); }
      catch (e) {
        console.error(`[account-delete] failed for ${user.id} at ${e.step || "?"}: ${e.detail || e.message}`);
        return json(res, 500, { error: "delete_failed", step: e.step || "unknown", loginKept: true }, origin), true;
      }
      try { await removeLogin(user.id); }
      catch (e) {
        console.error(`[account-delete] data removed but login removal failed for ${user.id}: ${e.detail || e.message}`);
        return json(res, 500, { error: "login_removal_failed", dataDeleted: true }, origin), true;
      }
      console.log(`[account-delete] removed account ${user.id}`);
      return json(res, 200, { ok: true, deleted }, origin), true;
    }

    return json(res, 404, { error: "Endpoint not found" }, origin), true;
  } catch (e) {
    console.error("[account-delete] unexpected error:", e && e.message);
    return json(res, 500, { error: "server_error" }, origin), true;
  }
};

module.exports = { handle, _resetRateLimitForTests: () => attempts.clear() };
