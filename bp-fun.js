/* Bullpen mini-game helpers: progress dots, animated bars, confetti and a count-up on the final score. */
(function () {
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  var BP = window.BP = {
    dots: function (cur, total) { var d = el('div', 'bp-dots'); for (var i = 1; i <= total; i++) { var q = el('i', i < cur ? 'on' : i === cur ? 'cur' : ''); if (total > 12) q.style.width = '10px'; d.appendChild(q); } return d; },
    bar: function (label, val, max, text, cls) { var b = el('div', 'bp-bar ' + (cls || '')); var h = el('div'); h.appendChild(el('span', null, label)); h.appendChild(el('b', null, text)); b.appendChild(h); var s = el('span'), i = el('i'); i.style.setProperty('--w', Math.max(2, Math.min(100, 100 * val / (max || 1))) + '%'); s.appendChild(i); b.appendChild(s); return b; },
    shelf: function (units, ghostUnits, label) {
      var s = el('div', 'bp-shelf'), n = Math.min(14, Math.ceil(units / 100)), g = Math.min(14 - n, Math.ceil((ghostUnits || 0) / 100));
      for (var i = 0; i < n; i++) { var b = el('span', null, '📦'); b.style.animationDelay = (i * 30) + 'ms'; s.appendChild(b); }
      for (var j = 0; j < g; j++) s.appendChild(el('span', 'ghost', '📦'));
      if (!n && !g) s.appendChild(el('span', null, '🚫'));
      if (label) s.appendChild(el('small', null, label)); return s;
    },
    flash: function (ok) { var g = document.getElementById('game'); if (!g) return; g.classList.remove('f-ok', 'f-no'); void g.offsetWidth; g.classList.add(ok ? 'f-ok' : 'f-no'); },
    confetti: function (n) {
      var c = el('canvas', 'bp-conf'), x = c.getContext('2d'), W = c.width = innerWidth, H = c.height = innerHeight, cols = ['#34d399', '#facc15', '#60a5fa', '#f472b6', '#fb923c', '#a78bfa'], p = [];
      for (var i = 0; i < (n || 120); i++) p.push({ x: W / 2 + (Math.random() - .5) * 200, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 4 + Math.random() * 6, c: cols[i % cols.length], r: Math.random() * 6 });
      document.body.appendChild(c); var t = 0;
      (function f() { x.clearRect(0, 0, W, H); p.forEach(function (q) { q.vy += .4; q.x += q.vx; q.y += q.vy; q.r += .2; x.fillStyle = q.c; x.save(); x.translate(q.x, q.y); x.rotate(q.r); x.fillRect(-q.s / 2, -q.s / 2, q.s, q.s * .6); x.restore(); }); if (++t < 110) requestAnimationFrame(f); else c.remove(); })();
    },
    count: function (node) {
      var raw = node.textContent, m = raw.match(/-?[\d,]+/); if (!m) return; var target = parseInt(m[0].replace(/,/g, ''), 10), pre = raw.slice(0, m.index), suf = raw.slice(m.index + m[0].length), t0 = performance.now();
      if (isNaN(target)) return;
      (function f(t) { var k = Math.min(1, (t - t0) / 900), v = Math.round(target * (1 - Math.pow(1 - k, 3))); node.textContent = (target < 0 ? '-' : '') + (pre.indexOf('$') > -1 ? '$' : '') + Math.abs(v).toLocaleString('en-US') + suf; if (k < 1) requestAnimationFrame(f); else node.textContent = raw; })(t0);
    }
  };
  var g = document.getElementById('game');
  if (g) new MutationObserver(function (ms) {
    ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1 && n.classList.contains('gameover')) { var f = n.querySelector('.final'); if (f) { BP.count(f); if (!/^-/.test(f.textContent) && f.textContent.trim() !== '0' && f.textContent.trim() !== '$0') BP.confetti(); } } }); });
  }).observe(g, { childList: true });
})();
