const https = require('https');

const SUPABASE_URL = 'xkfxofcmrmpazfjviatq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q';

// Simple HTTP helpers
function sbFetch(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: '/rest/v1/' + path,
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve(data); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getQuotes(symbols) {
  return new Promise((resolve) => {
    const path = '/api/quotes?symbols=' + symbols.join(',');
    const req = https.get({
      hostname: 'stockpilot-production-c94f.up.railway.app',
      path,
      headers: { 'Accept': 'application/json' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const quotes = json?.quoteResponse?.result || [];
          const map = {};
          quotes.forEach(q => { map[q.symbol] = q.regularMarketChangePercent || 0; });
          resolve(map);
        } catch(e) { resolve({}); }
      });
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async (req, res) => {
  // Allow GET (for cron) or POST
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Get all leagues where week_start_date is 7+ days ago
    const leagues = await sbFetch('bullpen_leagues?select=*&order=created_at.desc');
    if (!Array.isArray(leagues)) {
      return res.status(200).json({ message: 'No leagues found', leagues });
    }

    const results = [];

    for (const league of leagues) {
      const weekStart = new Date(league.week_start_date);
      const daysSince = Math.floor((now - weekStart) / 86400000);

      // Only reset if 7+ days have passed
      if (daysSince < 7) {
        results.push({ league: league.code, status: 'not_due', days: daysSince });
        continue;
      }

      // Get members
      const members = await sbFetch(`bullpen_members?league_code=eq.${league.code}&order=joined_at.asc`);
      if (!Array.isArray(members) || !members.length) continue;

      // Collect all tickers
      const allTickers = new Set();
      members.forEach(m => {
        (m.starters || []).forEach(t => allTickers.add(t));
      });

      // Get prices
      const priceMap = allTickers.size > 0 ? await getQuotes([...allTickers]) : {};

      // Calculate weekly scores
      for (const m of members) {
        if (!m.starters || !m.starters.length) continue;
        const baseline = m.week_baseline || {};
        let weekScore = 0;
        m.starters.forEach(t => {
          const curr = priceMap[t] || 0;
          const base = baseline[t];
          if (base && base > 0) {
            weekScore += ((curr - base) / base) * 100;
          } else {
            weekScore += curr; // fallback to daily change
          }
        });
        m._weekScore = parseFloat(weekScore.toFixed(2));
      }

      // Sort by weekly score
      const ranked = [...members].sort((a, b) => (b._weekScore || 0) - (a._weekScore || 0));
      const weekNum = league.current_week || 1;
      const n = ranked.length;

      // Award points and reset
      for (let i = 0; i < ranked.length; i++) {
        const m = ranked[i];
        const pts = n - i; // 1st = n pts, last = 1pt
        const newSeasonPts = (m.season_points || 0) + pts;

        // New baseline from current prices
        const newBaseline = {};
        (m.starters || []).forEach(t => {
          if (priceMap[t] !== undefined) newBaseline[t] = priceMap[t];
        });

        // Save weekly score history
        await sbFetch('bullpen_weekly_scores', 'POST', {
          league_code: league.code,
          member_id: m.id,
          member_name: m.name,
          week_number: weekNum,
          week_start: league.week_start_date,
          week_end: today,
          score: m._weekScore || 0,
          season_points: pts
        });

        // Update member
        await sbFetch(`bullpen_members?id=eq.${m.id}`, 'PATCH', {
          weekly_score: 0,
          season_points: newSeasonPts,
          week_baseline: newBaseline,
          trades_left: 2,
          fa_moves: 2
        });
      }

      // Update league week
      await sbFetch(`bullpen_leagues?code=eq.${league.code}`, 'PATCH', {
        current_week: weekNum + 1,
        week_start_date: today
      });

      // Store recap for league
      const winner = ranked[0];
      await sbFetch('bullpen_leagues?code=eq.' + league.code, 'PATCH', {
        last_recap: JSON.stringify({
          week: weekNum,
          winner: winner?.name || '—',
          winnerScore: winner?._weekScore || 0,
          resetAt: today,
          topStocks: [...allTickers].slice(0, 3)
        })
      });

      results.push({
        league: league.code,
        leagueName: league.name,
        status: 'reset',
        week: weekNum,
        winner: winner?.name,
        winnerScore: winner?._weekScore,
        membersReset: ranked.length
      });
    }

    res.status(200).json({
      success: true,
      timestamp: now.toISOString(),
      processed: results.length,
      results
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
