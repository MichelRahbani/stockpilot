/* Learn: new Overview and Tips. Reads the same progress the Pathway uses, adds a daily streak,
   a placement quiz, a unit map with unit quizzes and badges, self-confirming missions, and swipeable tips. */
(function () {
  'use strict';
  var KEY_DAYS = 'sp_learn_days_v1', KEY_LEVEL = 'sp_learn_level_v1', KEY_BADGES = 'sp_learn_badges_v1', KEY_TIPS = 'sp_learn_tips_v1', KEY_PEND = 'sp_learn_pending_v1';
  var GOAL = 3;
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function h(tag, cls, text, attrs) {
    var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function day(off) { var d = new Date(); d.setDate(d.getDate() - (off || 0)); return d.toLocaleDateString('en-CA'); }
  function go(area, panel) {
    var sel = panel ? '.learning-area-tab[data-learning-area="' + area + '"][data-default-panel="' + panel + '"]' : '.learning-area-tab[data-learning-area="' + area + '"]';
    var b = document.querySelector(sel); if (b) b.click();
    var r = document.querySelector('main.app-shell'); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ----- daily activity and streak
  function touch() { var d = load(KEY_DAYS, {}); d[day()] = (d[day()] || 0) + 1; save(KEY_DAYS, d); }
  window.lhTouch = function () { touch(); render(); };
  function streak() {
    var d = load(KEY_DAYS, {}), n = 0, i = d[day()] ? 0 : 1;
    while (d[day(i)]) { n++; i++; }
    return n;
  }
  function todayCount() { return load(KEY_DAYS, {})[day()] || 0; }

  // ----- data from the app
  function lessons() { return typeof getLearningLessons === 'function' ? getLearningLessons() : []; }
  function done(id) { return typeof completedLessons !== 'undefined' && completedLessons.indexOf(id) >= 0; }
  function nextLesson() { var L = lessons(); for (var i = 0; i < L.length; i++) if (!done(L[i].id)) return L[i]; return null; }
  function openLesson(id) { try { learnSelId = id; } catch (e) {} go('pathway'); }

  // ----- Overview
  var QUIZ = [
    { q: 'What does positive cash flow mean?', a: ['More money came in than went out.', 'You own some stocks.', 'You have no bills.'], c: 0 },
    { q: 'A credit card has a 27% APR. What does that mean?', a: ['You earn 27% on your balance.', 'Carrying a balance costs about 27% a year.', 'You can spend 27% more.'], c: 1 },
    { q: 'What does diversification do?', a: ['Guarantees a profit.', 'Spreads risk so one bad pick hurts less.', 'Lets you time the market.'], c: 1 }
  ];
  var LEVELS = [{ n: 'Beginner', u: 0 }, { n: 'Beginner', u: 0 }, { n: 'Intermediate', u: 2 }, { n: 'Advanced', u: 3 }];
  var MISSIONS = [
    { id: 'mission-budget-review', href: '/budget-workspace.html', cta: 'Open the budget' },
    { id: 'mission-emergency-runway', href: '/budget-workspace.html', cta: 'Open the budget' },
    { id: 'mission-subscription', href: '/budget-workspace.html', cta: 'Open the budget' },
    { id: 'mission-correlation', href: '/investing', cta: 'Open investing' },
    { id: 'mission-history', go: ['library', 'history'], cta: 'Open History' }
  ];
  var WARM = [['/bullpen-blitz.html', 'Debit/Credit Blitz', '60 second accounting speed round'], ['/bullpen-crunch.html', 'Cash Crunch', 'Survive 24 months'], ['/bullpen-spot.html', 'Spot the Error', 'Daily puzzle'], ['/bullpen-supply.html', 'Supply Chain Showdown', 'Run a shop for 6 months']];

  function todayCard() {
    var c = h('div', 'lh-card lh-today'), nl = nextLesson(), L = lessons(), n = L.filter(function (l) { return done(l.id); }).length;
    c.appendChild(h('div', 'lh-eyebrow', 'Today'));
    c.appendChild(h('h2', null, nl ? 'Continue: ' + nl.title : 'You finished the path'));
    c.appendChild(h('p', null, nl ? nl.unitTitle + ' \u00b7 ' + nl.skill : 'Review any lesson, or take a unit quiz to earn badges.'));
    var row = h('div', 'lh-row');
    var b = h('button', 'lh-btn', nl ? 'Continue lesson' : 'Open the pathway', { type: 'button' });
    b.addEventListener('click', function () { if (nl) openLesson(nl.id); else go('pathway'); });
    row.appendChild(b);
    var st = h('div', 'lh-streak'); st.appendChild(h('b', null, streak() + ' day streak')); st.appendChild(h('span', null, n + ' of ' + L.length + ' lessons done'));
    row.appendChild(st); c.appendChild(row);
    var up = L.filter(function (l) { return !done(l.id); }).slice(1, 4);
    if (up.length) { var ul = h('div', 'lh-up'); ul.appendChild(h('span', null, 'Up next')); up.forEach(function (l) { ul.appendChild(h('b', null, l.title)); }); c.appendChild(ul); }
    var g = h('div', 'lh-goal'); var tc = todayCount();
    g.appendChild(h('span', null, 'Daily goal: ' + Math.min(tc, GOAL) + ' of ' + GOAL + ' things today'));
    var dots = h('div', 'lh-dots'); for (var i = 0; i < GOAL; i++) dots.appendChild(h('i', i < tc ? 'on' : ''));
    g.appendChild(dots); c.appendChild(g);
    return c;
  }
  function warmCard() {
    var c = h('div', 'lh-card'); c.appendChild(h('div', 'lh-eyebrow', 'Warm up'));
    c.appendChild(h('h3', null, 'Play a quick game'));
    WARM.forEach(function (w) { var a = h('a', 'lh-link'); a.href = w[0]; a.appendChild(h('b', null, w[1])); a.appendChild(h('span', null, w[2])); c.appendChild(a); });
    return c;
  }
  function levelCard() {
    var lv = load(KEY_LEVEL, null), c = h('div', 'lh-card');
    c.appendChild(h('div', 'lh-eyebrow', 'Your level'));
    if (lv) {
      var info = LEVELS[Math.min(3, lv.score)], units = typeof LEARNING_PATH_UNITS !== 'undefined' ? LEARNING_PATH_UNITS : [], u = units[info.u];
      c.appendChild(h('h3', null, info.n + ' (' + lv.score + ' of 3 right)'));
      var need = info.u > 0 && lessons().some(function (l) { return l.unitIndex < info.u && !done(l.id); });
      c.appendChild(h('p', null, info.u === 0 ? 'Start at the top: ' + (u ? u.title : 'Money Basics') + '.' : 'You can start at ' + (u ? u.title : '') + '.'));
      var row = h('div', 'lh-row');
      if (need) {
        var b = h('button', 'lh-btn', 'Skip to ' + (u ? u.title : 'there'), { type: 'button' });
        b.addEventListener('click', function () {
          if (!confirm('This marks the lessons before ' + u.title + ' as done. Continue?')) return;
          lessons().forEach(function (l) { if (l.unitIndex < info.u && !done(l.id)) completedLessons.push(l.id); });
          try { saveAppState(); renderLearningPath(); renderLearningDashboard(); } catch (e) {}
          render();
        });
        row.appendChild(b);
      }
      var r = h('button', 'lh-btn ghost', 'Retake the quiz', { type: 'button' }); r.addEventListener('click', function () { save(KEY_LEVEL, null); render(); }); row.appendChild(r);
      c.appendChild(row); return c;
    }
    c.appendChild(h('h3', null, 'Find your starting point'));
    c.appendChild(h('p', null, '3 quick questions. No pressure.'));
    var i = 0, score = 0, box = h('div');
    function q() {
      box.textContent = ''; var Q = QUIZ[i]; box.appendChild(h('p', 'lh-q', (i + 1) + '. ' + Q.q));
      Q.a.forEach(function (t, k) {
        var o = h('button', 'lh-opt', t, { type: 'button' });
        o.addEventListener('click', function () { if (k === Q.c) score++; i++; if (i >= QUIZ.length) { save(KEY_LEVEL, { score: score, at: day() }); touch(); render(); } else q(); });
        box.appendChild(o);
      });
    }
    q(); c.appendChild(box); return c;
  }
  function unitCards() {
    var wrap = h('div', 'lh-card'), units = typeof LEARNING_PATH_UNITS !== 'undefined' ? LEARNING_PATH_UNITS : [], badges = load(KEY_BADGES, {});
    wrap.appendChild(h('div', 'lh-eyebrow', 'Unit map')); wrap.appendChild(h('h3', null, 'Your path, unit by unit'));
    var grid = h('div', 'lh-units');
    units.forEach(function (u, ui) {
      var total = u.lessons.length, d = u.lessons.filter(function (l) { return done(l.id); }).length, full = d === total;
      var c = h('div', 'lh-unit' + (full ? ' full' : ''));
      c.appendChild(h('span', 'lh-tag', u.theme)); c.appendChild(h('b', null, u.title));
      var bar = h('div', 'lh-bar'), f = h('i'); f.style.width = Math.round(100 * d / total) + '%'; bar.appendChild(f); c.appendChild(bar);
      c.appendChild(h('small', null, d + ' of ' + total + ' lessons'));
      var row = h('div', 'lh-row');
      var open = h('button', 'lh-btn ghost sm', d ? 'Open' : 'Start', { type: 'button' });
      open.addEventListener('click', function () { var next = u.lessons.filter(function (l) { return !done(l.id); })[0] || u.lessons[0]; openLesson(next.id); });
      row.appendChild(open);
      if (badges[u.title]) row.appendChild(h('span', 'lh-badge', '\u2605 Badge earned'));
      else { var qb = h('button', 'lh-btn sm', full ? 'Unit quiz' : 'Quiz locked', { type: 'button' }); qb.disabled = !full; qb.addEventListener('click', function () { unitQuiz(ui); }); row.appendChild(qb); }
      c.appendChild(row); grid.appendChild(c);
    });
    wrap.appendChild(grid); return wrap;
  }
  function missionsCard() {
    var c = h('div', 'lh-card'); c.appendChild(h('div', 'lh-eyebrow', 'Money missions')); c.appendChild(h('h3', null, 'Do one real thing'));
    var pend = load(KEY_PEND, null), list = typeof LEARNING_MISSIONS !== 'undefined' ? LEARNING_MISSIONS : [];
    list.forEach(function (m) {
      var cfg = MISSIONS.filter(function (x) { return x.id === m.id; })[0] || {}, isDone = completedLearningMissions.indexOf(m.id) >= 0;
      var r = h('div', 'lh-mission' + (isDone ? ' done' : ''));
      var t = h('div'); t.appendChild(h('b', null, m.title)); t.appendChild(h('span', null, m.detail)); r.appendChild(t);
      var act = h('div', 'lh-row');
      if (isDone) act.appendChild(h('span', 'lh-badge', '\u2713 Done'));
      else if (pend === m.id) {
        act.appendChild(h('span', 'lh-ask', 'Did you do it?'));
        var y = h('button', 'lh-btn sm', 'Yes', { type: 'button' }); y.addEventListener('click', function () { completedLearningMissions.push(m.id); save(KEY_PEND, null); try { saveAppState(); renderLearningDashboard(); } catch (e) {} touch(); render(); });
        var n = h('button', 'lh-btn ghost sm', 'Not yet', { type: 'button' }); n.addEventListener('click', function () { save(KEY_PEND, null); render(); });
        act.appendChild(y); act.appendChild(n);
      } else {
        var b = h('button', 'lh-btn ghost sm', cfg.cta || 'Do it', { type: 'button' });
        b.addEventListener('click', function () { if (cfg.go) { save(KEY_PEND, m.id); go(cfg.go[0], cfg.go[1]); } else { save(KEY_PEND, m.id); location.href = cfg.href || '/budget-workspace.html'; } });
        act.appendChild(b);
      }
      r.appendChild(act); c.appendChild(r);
    });
    return c;
  }
  function weakCard() {
    var c = h('div', 'lh-card'); c.appendChild(h('div', 'lh-eyebrow', 'Weak spots')); c.appendChild(h('h3', null, 'Review these'));
    var weak = typeof getLearningWeakTopics === 'function' ? getLearningWeakTopics() : [];
    if (!weak.length) {
      c.appendChild(h('p', null, 'Nothing here yet. Missed quiz questions show up so you can fix them.'));
      var b = h('button', 'lh-btn', 'Take the quiz', { type: 'button' }); b.addEventListener('click', function () { go('practice'); }); c.appendChild(b); return c;
    }
    weak.slice(0, 4).forEach(function (w) { var r = h('div', 'lh-weak'); r.appendChild(h('b', null, w.topic)); r.appendChild(h('span', null, w.explanation)); c.appendChild(r); });
    var rb = h('button', 'lh-btn', 'Practice these', { type: 'button' }); rb.addEventListener('click', function () { go('practice'); }); c.appendChild(rb);
    return c;
  }

  // ----- unit quiz
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function unitQuiz(ui) {
    var u = LEARNING_PATH_UNITS[ui], qs = shuffle(u.lessons).slice(0, 4).map(function (l) {
      var wrong = shuffle(u.lessons.filter(function (x) { return x.id !== l.id; })).slice(0, 2).map(function (x) { return x.simple || x.skill; });
      var opts = shuffle([{ t: l.simple || l.skill, ok: true }].concat(wrong.map(function (t) { return { t: t, ok: false }; })));
      return { q: 'Which explanation matches "' + l.title + '"?', o: opts };
    });
    var ov = h('div', 'lh-modal'), box = h('div', 'lh-modal-box'), i = 0, right = 0; ov.appendChild(box); document.body.appendChild(ov);
    function close() { ov.remove(); render(); }
    function step() {
      box.textContent = ''; var x = h('button', 'lh-x', '\u00d7', { type: 'button', 'aria-label': 'Close' }); x.addEventListener('click', close); box.appendChild(x);
      if (i >= qs.length) {
        var pass = right >= 3;
        box.appendChild(h('div', 'lh-eyebrow', u.title + ' quiz')); box.appendChild(h('h2', null, right + ' of ' + qs.length + (pass ? ': badge earned' : ': try again')));
        box.appendChild(h('p', null, pass ? 'You earned the ' + u.title + ' badge.' : 'You need 3 right. Review the lessons and try again.'));
        if (pass) {
          var bd = load(KEY_BADGES, {}); bd[u.title] = day(); save(KEY_BADGES, bd); touch();
          var cp = h('button', 'lh-btn ghost', 'Copy a brag line', { type: 'button' });
          cp.addEventListener('click', function () { var t = 'I earned the ' + u.title + ' badge on StockPilot Learn. mystockspilot.com/learn'; try { navigator.clipboard.writeText(t); cp.textContent = 'Copied'; } catch (e) { cp.textContent = t; } });
          box.appendChild(cp);
        }
        var cl = h('button', 'lh-btn', 'Close', { type: 'button' }); cl.addEventListener('click', close); box.appendChild(cl); return;
      }
      var Q = qs[i]; box.appendChild(h('div', 'lh-eyebrow', u.title + ' quiz \u00b7 ' + (i + 1) + ' of ' + qs.length)); box.appendChild(h('h3', null, Q.q));
      Q.o.forEach(function (o) {
        var b = h('button', 'lh-opt', o.t, { type: 'button' });
        b.addEventListener('click', function () { if (o.ok) right++; b.classList.add(o.ok ? 'right' : 'wrong'); [].forEach.call(box.querySelectorAll('.lh-opt'), function (z) { z.disabled = true; }); setTimeout(function () { i++; step(); }, 650); });
        box.appendChild(b);
      });
    }
    step();
  }

  // ----- Tips
  var TOOLS = { budgeting: ['/budget-workspace.html', 'Open the budget planner'], saving: ['/budget-workspace.html', 'Plan your savings'], 'cash flow': ['/accounting-lab', 'Try the Statements Lab'], spending: ['/budget-workspace.html', 'Open the budget planner'],
    tracking: ['/budget-workspace.html', 'Open the budget planner'], income: ['/budget-workspace.html', 'Open the budget planner'], behavior: ['/bullpen-spot.html', 'Sharpen up with a game'], debt: ['/budget-workspace.html', 'Open Protection tools'],
    credit: ['/budget-workspace.html', 'Open Protection tools'], emergency: ['/budget-workspace.html', 'Build an emergency fund'], insurance: ['/budget-workspace.html', 'Open Protection tools'], investing: ['/investing', 'Open investing'],
    portfolio: ['/investing', 'Open investing'], mindset: ['/bullpen-crunch.html', 'Play Cash Crunch'], timing: ['/investing', 'Open investing'], diversifying: ['/investing', 'Open investing'], news: ['/investing', 'Open investing'] };
  var GROUPS = [['all', 'All tips'], ['money', 'Everyday money'], ['debt', 'Debt and emergencies'], ['invest', 'Investing'], ['list', 'My checklist']];
  var tipState = { filter: 'all', i: 0, tips: null };
  function readTips() {
    if (tipState.tips) return tipState.tips;
    var sec = document.querySelector('[data-education-panel="tips"]'), out = [];
    if (!sec) return [];
    var gi = -1;
    [].forEach.call(sec.children, function (el) {
      if (el.classList.contains('learning-category')) gi++;
      else if (el.classList.contains('lesson-grid')) [].forEach.call(el.querySelectorAll('.lesson-card'), function (c) {
        var t = c.querySelector('strong').textContent;
        out.push({ id: t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), topic: c.querySelector('span').textContent, title: t, body: c.querySelector('p').textContent, group: ['money', 'debt', 'invest'][Math.max(0, gi)] });
      });
    });
    tipState.tips = out; return out;
  }
  function tipsView(box) {
    var all = readTips(), st = load(KEY_TIPS, {});
    box.textContent = '';
    var head = h('div', 'lh-card lh-tod'); head.appendChild(h('div', 'lh-eyebrow', 'Tip of the day'));
    var seed = 0, ds = day(); for (var k = 0; k < ds.length; k++) seed += ds.charCodeAt(k) * (k + 1);
    var tod = all[seed % (all.length || 1)];
    if (tod) {
      head.appendChild(h('h3', null, tod.title)); head.appendChild(h('p', null, tod.body));
      var did = st[tod.id] === 'do', b = h('button', 'lh-btn' + (did ? ' ghost' : ''), did ? '\u2713 You do this' : 'I did this today', { type: 'button' });
      b.addEventListener('click', function () { st[tod.id] = 'do'; save(KEY_TIPS, st); touch(); tipsView(box); });
      head.appendChild(b);
    }
    box.appendChild(head);
    var chips = h('div', 'lh-chips');
    GROUPS.forEach(function (g) {
      var cnt = g[0] === 'all' ? all.length : g[0] === 'list' ? all.filter(function (t) { return st[t.id] === 'try'; }).length : all.filter(function (t) { return t.group === g[0]; }).length;
      var c = h('button', 'lh-chip' + (tipState.filter === g[0] ? ' on' : ''), g[1] + ' (' + cnt + ')', { type: 'button' });
      c.addEventListener('click', function () { tipState.filter = g[0]; tipState.i = 0; tipsView(box); }); chips.appendChild(c);
    });
    box.appendChild(chips);
    if (tipState.filter === 'list') {
      var mine = all.filter(function (t) { return st[t.id] === 'try'; }), c2 = h('div', 'lh-card');
      c2.appendChild(h('h3', null, 'Tips you want to try'));
      if (!mine.length) c2.appendChild(h('p', null, 'Tap "I\'ll try this" on a tip and it lands here.'));
      mine.forEach(function (t) {
        var r = h('div', 'lh-mission'), tx = h('div'); tx.appendChild(h('b', null, t.title)); tx.appendChild(h('span', null, t.body)); r.appendChild(tx);
        var ck = h('button', 'lh-btn sm', 'I did it', { type: 'button' }); ck.addEventListener('click', function () { st[t.id] = 'do'; save(KEY_TIPS, st); touch(); tipsView(box); }); r.appendChild(ck); c2.appendChild(r);
      });
      box.appendChild(c2); return;
    }
    var pool = all.filter(function (t) { return tipState.filter === 'all' || t.group === tipState.filter; });
    var unseen = pool.filter(function (t) { return !st[t.id]; }), deck = unseen.length ? unseen : pool;
    var card = h('div', 'lh-card lh-deck');
    if (!pool.length) { box.appendChild(card); return; }
    tipState.i = Math.min(tipState.i, deck.length - 1); var t = deck[tipState.i];
    card.appendChild(h('div', 'lh-eyebrow', (unseen.length ? 'New tip ' : 'Review ') + (tipState.i + 1) + ' of ' + deck.length));
    card.appendChild(h('span', 'lh-tag', t.topic)); card.appendChild(h('h2', null, t.title)); card.appendChild(h('p', 'lh-big', t.body));
    if (st[t.id]) card.appendChild(h('div', 'lh-ask', 'You marked this: ' + (st[t.id] === 'do' ? 'I do this' : st[t.id] === 'try' ? "I'll try this" : 'Not for me')));
    var tool = TOOLS[t.topic.toLowerCase()];
    if (tool) { var a = h('a', 'lh-btn ghost', tool[1] + ' \u2192'); a.href = tool[0]; a.style.display = 'inline-block'; a.style.textDecoration = 'none'; card.appendChild(a); }
    var row = h('div', 'lh-row lh-three');
    function mark(v) { return function () { st[t.id] = v; save(KEY_TIPS, st); if (v === 'do') touch(); tipState.i = 0; tipsView(box); }; }
    [['do', 'I do this'], ['try', "I'll try this"], ['skip', 'Not for me']].forEach(function (x) { var b = h('button', 'lh-btn' + (x[0] === 'skip' ? ' ghost' : ''), x[1], { type: 'button' }); b.addEventListener('click', mark(x[0])); row.appendChild(b); });
    card.appendChild(row);
    var nav = h('div', 'lh-row'); var pv = h('button', 'lh-btn ghost sm', '\u2190 Back', { type: 'button' }), nx = h('button', 'lh-btn ghost sm', 'Skip for now \u2192', { type: 'button' });
    pv.addEventListener('click', function () { tipState.i = Math.max(0, tipState.i - 1); tipsView(box); }); nx.addEventListener('click', function () { tipState.i = (tipState.i + 1) % deck.length; tipsView(box); });
    nav.appendChild(pv); nav.appendChild(nx); card.appendChild(nav);
    var sx = null; card.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (dx > 70) mark('do')(); else if (dx < -70) mark('skip')(); }, { passive: true });
    box.appendChild(card);
    var s = {}; all.forEach(function (x) { if (st[x.id]) s[st[x.id]] = (s[st[x.id]] || 0) + 1; });
    box.appendChild(h('p', 'lh-foot', 'You do ' + (s['do'] || 0) + ' of ' + all.length + ' tips. Swipe right on a phone for "I do this", left for "Not for me".'));
  }

  // ----- mount
  var home, tips;
  function mount() {
    var dash = document.querySelector('.learning-dashboard-section[data-learning-area-panel="overview"]');
    var tipSec = document.querySelector('[data-education-panel="tips"]');
    if (dash && !home) { home = h('div', 'lh-home'); home.id = 'lhHome'; dash.appendChild(home); dash.classList.add('lh-host'); }
    if (tipSec && !tips) { readTips(); tips = h('div', 'lh-tips'); tips.id = 'lhTips'; tipSec.appendChild(tips); tipSec.classList.add('lh-host'); }
  }
  function render() {
    mount();
    if (home) {
      home.textContent = '';
      var top = h('div', 'lh-grid2'); top.appendChild(todayCard()); top.appendChild(warmCard()); home.appendChild(top);
      home.appendChild(levelCard()); home.appendChild(unitCards());
      var bot = h('div', 'lh-grid2'); bot.appendChild(missionsCard()); bot.appendChild(weakCard()); home.appendChild(bot);
      var cl = h('button', 'lh-clear', 'Clear all learning progress', { type: 'button' });
      cl.addEventListener('click', function () { var b = document.getElementById('clearLearningButton'); if (b) b.click(); setTimeout(render, 300); });
      home.appendChild(cl);
    }
    if (tips) tipsView(tips);
  }
  window.lhRender = render;
  render();
  // refresh when the Overview or Tips become visible again
  [document.querySelector('.learning-dashboard-section[data-learning-area-panel="overview"]'), document.querySelector('[data-education-panel="tips"]')].forEach(function (el) {
    if (el) new MutationObserver(function () { if (!el.hidden) render(); }).observe(el, { attributes: true, attributeFilter: ['hidden'] });
  });
  window.addEventListener('pageshow', render);
})();
