"use strict";
/*
 * Public league standings (read only).
 *
 *   GET /api/public/league/<CODE>   ->  { league: {...}, standings: [{ rank, name, score }] }
 *
 * Built so a club can show its Bullpen league on its own website (see
 * embed-leaderboard.html). It exposes only the league name, week, and each
 * player's display name and score. No emails, ids or portfolios.
 *
 * Classroom leagues are never exposed: their players can be minors.
 * If this file fails to load, server.js carries on without it.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://xkfxofcmrmpazfjviatq.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q";

const CACHE_MS = 20 * 1000;          // same league asked again within 20s reuses the answer
const RATE_LIMIT = 60;               // requests per minute per caller
const cache = new Map();             // code -> { at, body, status }
const hits = new Map();              // ip -> { windowStart, count }

const json = (res, status, body, extra) => {
  res.writeHead(status, Object.assign({
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=15"
  }, extra || {}));
  res.end(JSON.stringify(body));
};

const tooMany = (ip) => {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.windowStart > 60000) { hits.set(ip, { windowStart: now, count: 1 }); return false; }
  h.count += 1;
  return h.count > RATE_LIMIT;
};

const sb = async (path) => {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
  });
  if (!r.ok) throw new Error("data source " + r.status);
  return r.json();
};

const build = async (code) => {
  const leagues = await sb(`bullpen_leagues?code=eq.${encodeURIComponent(code)}&select=code,name,format,season,current_week,league_type&limit=1`);
  const league = leagues && leagues[0];
  if (!league) return { status: 404, body: { error: "League not found" } };
  if (String(league.league_type || "").toLowerCase() === "classroom") {
    return { status: 403, body: { error: "This league is not available publicly" } };
  }
  const members = await sb(`bullpen_members?league_code=eq.${encodeURIComponent(code)}&select=name,score&order=score.desc`);
  const standings = (members || [])
    .map((m) => ({ name: String(m.name || "Player").slice(0, 40), score: Number(m.score) || 0 }))
    .sort((a, b) => b.score - a.score)
    .map((m, i) => ({ rank: i + 1, name: m.name, score: Math.round(m.score * 100) / 100 }));
  return {
    status: 200,
    body: {
      league: { code: league.code, name: league.name, format: league.format, season: league.season, week: league.current_week || 1, players: standings.length },
      standings,
      updatedAt: new Date().toISOString(),
      poweredBy: "StockPilot (mystockspilot.com)"
    }
  };
};

// Returns true if it handled the request.
const handle = async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  const m = u.pathname.match(/^\/api\/public\/league\/([A-Za-z0-9]{4,8})\/?$/);
  if (!m) return false;
  if (req.method === "OPTIONS") { json(res, 204, {}); return true; }
  if (req.method !== "GET") { json(res, 405, { error: "GET only" }); return true; }

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (tooMany(ip)) { json(res, 429, { error: "Too many requests, try again in a minute" }, { "Retry-After": "60" }); return true; }

  const code = m[1].toUpperCase();
  const hit = cache.get(code);
  if (hit && Date.now() - hit.at < CACHE_MS) { json(res, hit.status, hit.body); return true; }
  try {
    const out = await build(code);
    cache.set(code, { at: Date.now(), status: out.status, body: out.body });
    if (cache.size > 500) cache.delete(cache.keys().next().value);
    json(res, out.status, out.body);
  } catch (e) {
    json(res, 502, { error: "Standings are temporarily unavailable" });
  }
  return true;
};

module.exports = { handle };
