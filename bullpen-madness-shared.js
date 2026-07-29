// ── Bullpen Madness: bracket advancement engine ──
// Shared logic used both by the app (when a commissioner starts round 1)
// and by the scheduled job that closes finished rounds and advances winners.

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Decide who gets a bye this round, preferring entries who haven't had one yet.
function pickByes(entries, byeCount) {
  if (byeCount === 0) return [];
  const neverByed = entries.filter(e => !e.had_bye);
  const pool = neverByed.length >= byeCount ? neverByed : entries;
  return shuffle(pool).slice(0, byeCount);
}

// Given a list of still-active entries in one bracket (winners or losers),
// split them into tables of 4 plus byes for this round.
// Returns { tables: [[entry,entry,entry,entry], ...], byes: [entry,...], isFinal: bool }
function planRound(entries) {
  if (entries.length <= 4) {
    return { tables: [entries], byes: [], isFinal: true };
  }
  const byeCount = entries.length % 4; // always 0 or 2 for even starting sizes
  const byes = pickByes(entries, byeCount);
  const byeIds = new Set(byes.map(b => b.id));
  const remaining = shuffle(entries.filter(e => !byeIds.has(e.id)));

  const tables = [];
  for (let i = 0; i < remaining.length; i += 4) {
    tables.push(remaining.slice(i, i + 4));
  }
  return { tables, byes, isFinal: false };
}

// After a table's round has played out, rank members by pct_return
// and decide who advances / drops / is eliminated.
// isFinalTable: true when this table is the last one for this bracket
// (planRound's isFinal flag) — in that case only 1st place "wins" the
// bracket, there's no next round to send a 2nd-place finisher to.
function resolveTable(members, eliminationType, isFinalTable) {
  const ranked = [...members].sort((a, b) => (b.pct_return || 0) - (a.pct_return || 0));
  return ranked.map((m, i) => {
    const placement = i + 1;
    const advanced = isFinalTable ? false : placement <= 2;
    const bracketChampion = isFinalTable && placement === 1;
    let nextBracket = m.bracket;
    let eliminated = false;

    if (!advanced && !bracketChampion) {
      if (eliminationType === 'double' && m.bracket === 'winners') {
        nextBracket = 'losers'; // second chance
      } else {
        eliminated = true; // already in losers, or single elim, or lost the final
      }
    }
    return { ...m, placement, advanced, bracketChampion, nextBracket, eliminated };
  });
}

if (typeof module !== 'undefined') {
  module.exports = { shuffle, pickByes, planRound, resolveTable };
}
