/* Spot the Error: five journal entries, one is wrong. Built from the Blitz deals, seeded by date. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./acct-blitz.js"));
  else root.AcctSpot = factory(root.AcctBlitz);
})(typeof self !== "undefined" ? self : this, function (B) {
  const ROUNDS = 5, SECONDS = 25;
  function hash(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function rngFor(seed) { let a = hash(String(seed)); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const pickN = (arr, n, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
  // Accounts that are never a sensible swap-in for the deal's own accounts.
  const used = new Set(B.QUESTIONS.reduce((s, q) => s.concat([q.dr, q.cr]), []));
  function puzzle(r) {
    const qs = pickN(B.QUESTIONS, 5, r), bad = Math.floor(r() * 5), kind = r() < 0.5 ? "swap" : "wrong";
    const lines = qs.map((q) => ({ text: q.text, dr: q.dr, cr: q.cr }));
    const q = qs[bad], L = lines[bad];
    let why;
    if (kind === "swap") {
      L.dr = q.cr; L.cr = q.dr;
      why = "Debit and credit are flipped. It should be Debit " + q.dr + ", Credit " + q.cr + ".";
    } else {
      const side = r() < 0.5 ? "dr" : "cr";
      const bads = B.POOL.filter((n) => n !== q.dr && n !== q.cr && used.has(n));
      const pickBad = pickN(bads, 1, r)[0];
      L[side] = pickBad;
      why = "The " + (side === "dr" ? "debit" : "credit") + " account is wrong. It should be Debit " + q.dr + ", Credit " + q.cr + ".";
    }
    return { lines, bad, why };
  }
  function daily(seed) { const r = rngFor(seed); const out = []; for (let i = 0; i < ROUNDS; i++) out.push(puzzle(r)); return out; }
  function points(correct, secondsLeft) { return correct ? 100 + Math.max(0, Math.floor(secondsLeft)) * 4 : 0; }
  return { ROUNDS, SECONDS, daily, puzzle, points, rngFor };
});
