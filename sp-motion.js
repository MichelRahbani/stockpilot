/* ==========================================================================
   StockPilot motion layer
   Small, purposeful animations tied to the product: the logo draws its own
   trail, figures rise into place, Bullpen headlines flip like a scoreboard,
   standings reshuffle into their real order, prices flash when they update.

   Rules: plays once, settles on the exact original text, never shows a
   number that is not the real one, never invents market data (charts and
   tickers only use the site's own data feeds and disappear if those fail),
   and is skipped entirely for prefers-reduced-motion.
   ========================================================================== */
(function(){
  if(window.__spMotion) return; window.__spMotion = true;

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/index';
  if(path === '/') path = '/index';
  var isHome = path === '/index';
  var isBullpen = path.indexOf('/bullpen') === 0;
  var isBullpenHome = path === '/bullpen';
  var isMarket = path === '/trade';
  // Same data source the site already uses (see trade.html)
  var API = /(^|\.)mystockspilot\.com$|michelrahbani\.github\.io$/.test(location.hostname)
    ? 'https://stockpilot-production-c94f.up.railway.app' : location.origin;
  var TAPE = ['AAPL','NVDA','TSLA','MSFT','AMZN','META','GOOGL','SPY','QQQ','AMD','NFLX','COIN','PLTR','BA','DIS'];

  function session(key){ try { if(sessionStorage.getItem(key) === '1') return true; sessionStorage.setItem(key, '1'); } catch(e) {} return false; }

  /* ---------- Before first paint ---------- */
  root.classList.add('sp-js');
  if(isBullpen && path !== '/bullpen-tycoon') root.classList.add('sp-arena');   // Tycoon keeps its own illustrated world
  if(!reduce){
    root.classList.add('sp-motion-on');
    // Logo intro: every visit to Home and Bullpen, once per session elsewhere
    var introSeen = session('sp_logo_intro');
    if(!introSeen || isHome || isBullpenHome){
      root.classList.add('sp-intro-run');
      setTimeout(function(){ root.classList.remove('sp-intro-run'); }, 2600);
    }
    // Bullpen tunnel: the first Bullpen page you open in a session
    if(isBullpen && !session('sp_tunnel')) root.classList.add('sp-tunnel');
  }

  /* ---------- Helpers ---------- */
  function onReady(fn){ if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  function $$(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function inView(el){ var r = el.getBoundingClientRect(); return r.top < (window.innerHeight || 800) && r.bottom > 0; }
  function whenVisible(els, fn, threshold){
    if(!els.length) return;
    if(!('IntersectionObserver' in window)){ els.forEach(fn); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); fn(e.target); } });
    }, {threshold: threshold == null ? 0.35 : threshold});
    els.forEach(function(el){ io.observe(el); });
  }
  function getJSON(url){ return fetch(url).then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); }); }

  /* ---------- Arrows nudge on hover ---------- */
  function wrapArrows(){
    $$('a, button').forEach(function(el){
      if(el.querySelector('.sp-arrow')) return;
      var node = el.lastChild;
      while(node && node.nodeType === 3 && !node.nodeValue.trim()) node = node.previousSibling;
      if(!node || node.nodeType !== 3) return;
      var m = node.nodeValue.match(/^([\s\S]*?)(\s?)(→)(\s*)$/);
      if(!m) return;
      // the gap is a margin, not a space character: flex buttons drop trailing spaces
      var before = m[1].replace(/\s+$/, '');
      node.nodeValue = before;
      var span = document.createElement('span');
      span.className = 'sp-arrow' + (before && !/\($/.test(before) ? ' sp-arrow-gap' : ''); span.textContent = m[3];
      node.parentNode.insertBefore(span, node.nextSibling);
      if(m[4]) span.parentNode.insertBefore(document.createTextNode(m[4]), span.nextSibling);
    });
  }

  /* ---------- Figures rise into place (only ever shows the real value) ---------- */
  function riseIn(el, delay){
    if(!el || el.dataset.spRise) return;
    var text = el.textContent;
    if(!text.trim()){ el.style.visibility = 'visible'; return; }
    el.dataset.spRise = '1';
    el.textContent = '';
    var spans = [];
    for(var i = 0; i < text.length; i++){
      var o = document.createElement('span'), n = document.createElement('span');
      o.className = 'sp-rise'; n.textContent = text[i] === ' ' ? ' ' : text[i];
      o.appendChild(n); el.appendChild(o); spans.push(n);
    }
    el.style.visibility = 'visible';
    var d = delay || 0;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      spans.forEach(function(n, i){ n.style.transitionDelay = (d + i * 45) + 'ms'; n.classList.add('in'); });
    }); });
    setTimeout(function(){ el.textContent = text; delete el.dataset.spRise; }, d + spans.length * 45 + 750);
  }
  function riseGroup(selector, startDelay){
    var els = $$(selector);
    els.filter(inView).forEach(function(el, i){ riseIn(el, (startDelay || 200) + i * 110); });
    whenVisible(els.filter(function(el){ return !inView(el); }), function(el){
      var sib = el.parentNode && el.parentNode.parentNode ? $$(selector, el.parentNode.parentNode) : [el];
      riseIn(el, Math.max(0, sib.indexOf(el)) * 110);
    }, 0.6);
  }

  /* ---------- Scoreboard flip for headline words (digits never change) ---------- */
  var LETTERS_UP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LETTERS_LO = 'abcdefghijklmnopqrstuvwxyz';
  function scramble(el, opts){
    opts = opts || {};
    var dur = opts.duration || 900;
    var nodes = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n;
    while((n = walker.nextNode())) if(n.nodeValue.trim()) nodes.push({node: n, text: n.nodeValue});
    if(!nodes.length) return;
    var total = nodes.reduce(function(a, x){ return a + x.text.length; }, 0);
    el.style.minHeight = el.offsetHeight + 'px';
    var t0 = null, tick = 0;
    function frame(ts){
      if(!t0) t0 = ts;
      var k = (ts - t0) / dur, pos = 0;
      if(++tick % 2 === 0 || k >= 1){
        nodes.forEach(function(x){
          var out = '';
          for(var i = 0; i < x.text.length; i++, pos++){
            var c = x.text[i];
            if(k >= 0.25 + 0.75 * pos / total || !/[A-Za-z]/.test(c)) out += c;
            else { var set = /[a-z]/.test(c) ? LETTERS_LO : LETTERS_UP; out += set[Math.floor(Math.random() * set.length)]; }
          }
          x.node.nodeValue = out;
        });
      }
      if(k < 1) requestAnimationFrame(frame);
      else { nodes.forEach(function(x){ x.node.nodeValue = x.text; }); el.style.minHeight = ''; }
    }
    requestAnimationFrame(frame);
  }
  function flipHeadlines(selector, opts){
    opts = opts || {};
    var els = $$(selector);
    els.filter(inView).forEach(function(el, i){ setTimeout(function(){ scramble(el, opts); }, (opts.delay || 200) + i * 120); });
    whenVisible(els.filter(function(el){ return !inView(el); }), function(el){ scramble(el, opts); }, 0.5);
  }

  /* ---------- Home: the logo's trail under a headline word, jet riding its tip ---------- */
  var TRAIL = [[0,23],[18,17],[26,20],[42,12],[50,16],[66,9],[74,13],[92,6],[100,10],[120,4],[128,8],[150,3],[158,6],[182,2],[190,5],[214,1],[240,0]];
  function trailUnder(el, animate){
    if(!el) return;
    var old = el.querySelector('.sp-trail-wrap'); if(old) old.remove();
    el.classList.add('sp-trail-host');
    var fs = parseFloat(getComputedStyle(el).fontSize) || 60, h = Math.max(10, Math.round(fs * 0.3));
    var w = el.offsetWidth + fs * 0.14;   // run the line a little past the full stop so the plane clears it
    var pts = TRAIL.map(function(p){ return [p[0] / 240 * w, 1.5 + p[1] / 23 * (h - 3)]; });
    var segs = [], total = 0;
    for(var i = 1; i < pts.length; i++){ var L = Math.hypot(pts[i][0] - pts[i-1][0], pts[i][1] - pts[i-1][1]); segs.push(L); total += L; }
    var wrap = document.createElement('span');
    wrap.className = 'sp-trail-wrap'; wrap.setAttribute('aria-hidden', 'true');
    wrap.style.height = h + 'px'; wrap.style.bottom = (-h * 0.62) + 'px';
    wrap.innerHTML =
      '<svg class="sp-trail" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs><linearGradient id="spTrailG" gradientUnits="userSpaceOnUse" x1="0" x2="' + w + '" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#e8262b"/><stop offset=".5" stop-color="#9a7c3a"/><stop offset="1" stop-color="#22c55e"/>' +
      '</linearGradient></defs>' +
      '<polyline points="' + pts.map(function(p){ return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '" fill="none" stroke="url(#spTrailG)" stroke-width="' + Math.max(2, fs * 0.04).toFixed(1) + '" stroke-linejoin="miter" stroke-linecap="square"/>' +
      '</svg><img class="sp-jet" src="/logo-jet.png" alt=""/>';
    el.appendChild(wrap);
    var line = wrap.querySelector('polyline'), jet = wrap.querySelector('.sp-jet');
    var jw = fs * (innerWidth <= 640 ? 1 : 0.82);
    /* keep the plane inside the screen when the line ends near the edge */
    var room = document.documentElement.clientWidth - 8 - (el.getBoundingClientRect().left + w);
    if(jw * 0.95 > room) jw = Math.max(fs * 0.55, room / 0.95);
    var jh = jw * 132 / 240;
    jet.style.width = jw + 'px';
    function place(p){
      line.style.strokeDasharray = total; line.style.strokeDashoffset = total * (1 - p);
      var d = total * p, k = 0;
      while(k < segs.length - 1 && d > segs[k]){ d -= segs[k]; k++; }
      var f = segs[k] ? Math.min(1, d / segs[k]) : 1;
      var x = pts[k][0] + (pts[k+1][0] - pts[k][0]) * f, y = pts[k][1] + (pts[k+1][1] - pts[k][1]) * f;
      jet.style.transform = 'translate(' + (x - jw * 0.05).toFixed(1) + 'px,' + (y - jh * 0.93).toFixed(1) + 'px)';
      jet.style.opacity = p < 0.04 ? p / 0.04 : 1;
    }
    if(!animate){ place(1); return; }
    place(0);
    var ease = function(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var t0 = null, dur = 1500, delay = 550;
    function frame(ts){
      if(!t0) t0 = ts;
      var k = Math.max(0, Math.min(1, (ts - t0 - delay) / dur));
      place(ease(k));
      if(k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    var rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ trailUnder(el, false); }, 150); });
  }

  /* ---------- Standings reshuffle into their real order ---------- */
  function leaderboardFlip(container, rowSel){
    var rows = $$(rowSel, container);
    if(rows.length < 3) return;
    var tops = rows.map(function(r){ return r.offsetTop; });
    var bg = 'transparent', p = container;
    while(p && p !== root){ var c = getComputedStyle(p).backgroundColor; if(c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)){ bg = c; break; } p = p.parentElement; }
    if(bg === 'transparent') bg = getComputedStyle(document.body).backgroundColor;
    var order = rows.map(function(_, i){ return i; });
    for(var i = order.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
    if(order.every(function(v, i){ return v === i; })) order.reverse();
    rows.forEach(function(r, i){
      r.style.transition = 'none';
      r.style.transform = 'translateY(' + (tops[order[i]] - tops[i]) + 'px)';
      r.style.position = 'relative'; r.style.zIndex = String(rows.length - i); r.style.background = bg;
    });
    container.offsetHeight;
    rows.forEach(function(r, i){
      setTimeout(function(){
        r.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1)';
        r.style.transform = 'translateY(0)';
        r.addEventListener('transitionend', function done(){ r.style.transition = r.style.transform = r.style.zIndex = r.style.background = ''; r.removeEventListener('transitionend', done); });
      }, 250 + i * 90);
    });
    $$('.lb-return, .lb-ret', container).forEach(function(el, i){ riseIn(el, 450 + i * 90); });
  }

  /* ---------- Draft picks come in one by one (Bullpen roster preview) ---------- */
  function draftReveal(preview){
    $$('.slot', preview).forEach(function(slot, i){
      slot.classList.add('sp-pick');
      setTimeout(function(){
        slot.classList.add('sp-pick-in');
        riseIn(slot.querySelector('.slot-ticker'), 0);
        riseIn(slot.querySelector('.slot-return'), 120);
      }, 120 + i * 110);
    });
  }

  /* ---------- Real S&P 500 line (Bullpen hero), from the site's own history feed ---------- */
  function spLine(host){
    getJSON(API + '/api/history?symbol=SPY&range=3mo&interval=1d').then(function(data){
      var q = data && data.chart && data.chart.result && data.chart.result[0];
      var closes = q && q.indicators && q.indicators.quote && q.indicators.quote[0] && q.indicators.quote[0].close;
      closes = (closes || []).filter(function(v){ return typeof v === 'number' && isFinite(v); });
      if(closes.length < 10) return;
      var W = 600, H = 220, pad = 16, min = Math.min.apply(null, closes), max = Math.max.apply(null, closes), span = (max - min) || 1;
      var pts = closes.map(function(v, i){ return [i / (closes.length - 1) * W, pad + (1 - (v - min) / span) * (H - pad * 2)]; });
      var box = document.createElement('div');
      box.className = 'sp-live'; box.setAttribute('aria-hidden', 'true');
      box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
        [0.25, 0.5, 0.75].map(function(f){ return '<line x1="0" x2="' + W + '" y1="' + H * f + '" y2="' + H * f + '"/>'; }).join('') +
        '<polyline class="sp-live-line" fill="none" vector-effect="non-scaling-stroke" points="' + pts.map(function(p){ return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>' +
        '</svg><span class="sp-live-dot"></span>';
      host.appendChild(box);
      var line = box.querySelector('polyline'), dot = box.querySelector('.sp-live-dot');
      dot.style.top = (pts[pts.length - 1][1] / H * 100) + '%';
      var len = line.getTotalLength ? line.getTotalLength() : 2000;
      line.style.strokeDasharray = len; line.style.strokeDashoffset = len;
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ box.classList.add('in'); line.style.strokeDashoffset = '0'; }); });
    }).catch(function(){ /* no data, no chart */ });
  }

  /* ---------- Bullpen ribbon board: real quotes from the site's quote feed ---------- */
  function ribbonBoard(afterEl){
    getJSON(API + '/api/quotes?symbols=' + TAPE.join(',')).then(function(data){
      var rows = (data && data.quoteResponse && data.quoteResponse.result) || [];
      var items = rows.filter(function(q){ return q && typeof q.regularMarketPrice === 'number'; }).map(function(q){
        var pct = typeof q.regularMarketChangePercent === 'number' ? q.regularMarketChangePercent : 0;
        var up = pct >= 0;
        return '<span class="sp-rb-item"><b>' + q.symbol + '</b>' + q.regularMarketPrice.toFixed(2) +
          '<i class="' + (up ? 'up' : 'dn') + '">' + (up ? '+' : '') + pct.toFixed(2) + '%</i></span>';
      }).join('');
      if(!items) return;
      var rb = document.createElement('div');
      rb.className = 'sp-ribbon'; rb.setAttribute('aria-hidden', 'true');
      rb.innerHTML = '<div class="sp-rb-track">' + items + items + '</div>';
      afterEl.parentNode.insertBefore(rb, afterEl.nextSibling);
      requestAnimationFrame(function(){ rb.classList.add('in'); });
    }).catch(function(){ /* feed unavailable: no ribbon */ });
  }

  /* ---------- Bullpen tunnel entrance ---------- */
  function tunnel(){
    if(!root.classList.contains('sp-tunnel')) return;
    var t = document.createElement('div');
    t.className = 'sp-tunnel-gate'; t.setAttribute('aria-hidden', 'true');
    t.innerHTML = '<div class="sp-tg-half sp-tg-top"></div><div class="sp-tg-half sp-tg-bottom"></div>' +
      '<div class="sp-tg-mid"><img src="/logo-mark-256.png" alt=""/><div class="sp-tg-word">BULLPEN</div><div class="sp-tg-bar"></div></div>';
    document.body.appendChild(t);
    var word = t.querySelector('.sp-tg-word');
    requestAnimationFrame(function(){ t.classList.add('lit'); scramble(word, {duration: 700}); });
    var done = false;
    function open(){
      if(done) return; done = true;
      t.classList.add('open'); root.classList.remove('sp-tunnel');
      setTimeout(function(){ t.remove(); }, 800);
    }
    setTimeout(open, 1350);
    t.addEventListener('click', open);
    document.addEventListener('keydown', open, {once: true});
  }

  /* ---------- Virtual Market: price changes flash when the feed updates ---------- */
  function flashOnChange(container, itemSel, keyOf, valueOf){
    if(!container) return;
    var last = {};
    function scan(initial){
      $$(itemSel, container).forEach(function(el){
        var k = keyOf(el), v = valueOf(el);
        if(k == null || v == null || isNaN(v)) return;
        if(!initial && last[k] != null && v !== last[k] && Date.now() - marketSwitchAt > 2500){
          var cls = v > last[k] ? 'sp-flash-up' : 'sp-flash-dn';
          el.classList.remove('sp-flash-up', 'sp-flash-dn'); void el.offsetWidth; el.classList.add(cls);
        }
        last[k] = v;
      });
    }
    scan(true);
    new MutationObserver(function(){ scan(false); }).observe(container, {childList: true, subtree: true, characterData: true});
  }
  function num(s){ s = (s || '').replace(/[^0-9.\-]/g, ''); return s ? parseFloat(s) : null; }
  var marketSwitchAt = 0;
  function marketMotion(){
    var sw = document.getElementById('marketSwitcher');
    if(sw){ var edge = function(){ sw.classList.toggle('sp-at-end', sw.scrollLeft + sw.clientWidth >= sw.scrollWidth - 4); }; sw.addEventListener('scroll', edge, {passive: true}); window.addEventListener('resize', edge); edge(); }
    // A market switch loads a different portfolio: never flash that as a gain or loss
    if(typeof window.switchMarket === 'function' && !window.switchMarket.__sp){
      var orig = window.switchMarket;
      window.switchMarket = function(){ marketSwitchAt = Date.now(); return orig.apply(this, arguments); };
      window.switchMarket.__sp = true;
    }
    flashOnChange(document.getElementById('watchlistItems'), '.wl-item',
      function(el){ var s = el.querySelector('.wl-sym'); return s && s.textContent.trim(); },
      function(el){ var p = el.querySelector('.wl-price'); return p && num(p.textContent); });
    flashOnChange(document.getElementById('tickerInner'), '.ti',
      function(el){ var s = el.querySelector('strong'); return s && (s.textContent.trim() + ':' + Array.prototype.indexOf.call(el.parentNode.children, el)); },
      function(el){ var p = el.querySelector('span'); return p && num((p.textContent || '').split(' ')[0]); });
    var pv = document.getElementById('portValue');
    if(pv){
      var lastV = num(pv.textContent);
      new MutationObserver(function(){
        var v = num(pv.textContent), head = pv.closest('.port-head') || pv;
        if(v != null && lastV != null && v !== lastV && Date.now() - marketSwitchAt > 2500){ head.classList.remove('sp-flash-up', 'sp-flash-dn'); void head.offsetWidth; head.classList.add(v > lastV ? 'sp-flash-up' : 'sp-flash-dn'); }
        lastV = v;
      }).observe(pv, {childList: true, characterData: true, subtree: true});
    }
    // Switching markets: the new accent sweeps across the market bar
    var bar = document.getElementById('marketSwitcher'), lastCls = document.body.className;
    new MutationObserver(function(){
      if(document.body.className !== lastCls){ lastCls = document.body.className; marketSwitchAt = Date.now(); if(bar){ bar.classList.remove('sp-sweep'); void bar.offsetWidth; bar.classList.add('sp-sweep'); } }
    }).observe(document.body, {attributes: true, attributeFilter: ['class']});
    // A filled order pulses the portfolio panel
    var toast = document.getElementById('toast'), panel = document.querySelector('.portfolio-panel');
    if(toast && panel) new MutationObserver(function(){
      if(toast.classList.contains('show') && toast.classList.contains('ok') && Date.now() - marketSwitchAt > 2500){ panel.classList.remove('sp-filled'); void panel.offsetWidth; panel.classList.add('sp-filled'); }
    }).observe(toast, {attributes: true, attributeFilter: ['class']});
  }

  /* ---------- Narrow screens: a nav whose links don't fit folds them into a menu ----------
     Only for navs without their own mobile menu, and only when they actually overflow. */
  function navCollapse(){
    $$('body > nav, body > header > nav, body > header.topbar, body > .topbar').forEach(function(nav){
      if(nav.querySelector('#sp-hamburger, .sp-navburger') || nav.closest('.sp-site-header')) return;
      if(document.getElementById('bpMobileMenu') || document.getElementById('sp-mobile-menu')) return;
      var box = [].slice.call(nav.children).filter(function(c){
        return !c.querySelector('img.sp-mark') && !(c.matches && c.matches('img, .sp-mark')) && c.querySelectorAll('a, button').length >= 2;
      }).pop();
      if(!box) return;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'sp-navburger';
      btn.setAttribute('aria-label', 'Menu'); btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(btn);
      if(getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
      function bg(){ for(var e = nav; e; e = e.parentElement){ var c = getComputedStyle(e).backgroundColor; if(c && !/rgba\(.*,\s*0\)$/.test(c) && c !== 'transparent') return c.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 'rgb($1,$2,$3)'); } return '#fff'; }
      function measure(){
        nav.classList.remove('sp-nav-collapsed'); box.classList.remove('sp-navdrop', 'open'); btn.setAttribute('aria-expanded', 'false');
        var W = document.documentElement.clientWidth;
        if(nav.scrollWidth > nav.clientWidth + 1 || box.getBoundingClientRect().right > W + 1){
          [].slice.call(box.children).forEach(function(c){
            var m = getComputedStyle(c).backgroundColor.match(/rgba?\(([^)]+)\)/), a = m ? m[1].split(',')[3] : null;
            c.classList.toggle('sp-drop-cta', !!m && (a === undefined || +a > 0.5));
          });
          nav.classList.add('sp-nav-collapsed'); box.classList.add('sp-navdrop'); box.style.setProperty('--sp-drop-bg', bg());
        }
      }
      btn.addEventListener('click', function(e){ e.stopPropagation(); var o = box.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); });
      document.addEventListener('click', function(e){ if(!box.contains(e.target)){ box.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
      measure();
      var t; window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(measure, 120); });
      if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    });
  }

  /* ---------- Live product cards (Home, Investing): real quotes and history only ----------
     The card ships with symbols and dashes; prices, changes and charts appear only when the
     site's own feeds answer. If they don't, the card stays a quiet frame. */
  function liveCards(){
    $$('.sp-viz-live').forEach(function(card){
      var main = card.getAttribute('data-main'), range = card.getAttribute('data-range') || '1mo';
      var rows = $$('.sp-viz-row', card);
      var syms = rows.map(function(r){ return r.getAttribute('data-sym'); });
      var all = (main ? [main] : []).concat(syms);
      var series = {};
      function fmt(n){ return n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); }
      function setQ(pxEl, chEl, q, flash){
        var p = q && q.regularMarketPrice, c = q && q.regularMarketChangePercent;
        if(typeof p !== 'number' || !isFinite(p)) return false;
        var before = pxEl.textContent, txt = fmt(p);
        pxEl.textContent = txt;
        if(typeof c === 'number' && isFinite(c)){
          chEl.textContent = (c >= 0 ? '+' : '') + c.toFixed(2) + '%';
          chEl.classList.remove('up', 'dn'); chEl.classList.add(c >= 0 ? 'up' : 'dn');
        }
        if(flash && before !== txt && /\d/.test(before) && !reduce){
          var up = parseFloat(txt.replace(/,/g, '')) > parseFloat(before.replace(/,/g, ''));
          pxEl.classList.remove('sp-flash-up', 'sp-flash-dn'); void pxEl.offsetWidth; pxEl.classList.add(up ? 'sp-flash-up' : 'sp-flash-dn');
        }
        return true;
      }
      function closesOf(d){
        var r = d && d.chart && d.chart.result && d.chart.result[0];
        var c = r && r.indicators && r.indicators.quote && r.indicators.quote[0] && r.indicators.quote[0].close;
        return (c || []).filter(function(v){ return typeof v === 'number' && isFinite(v); });
      }
      function draw(svg, vals, opts){
        if(!svg || vals.length < 5) return;
        var W = Math.max(40, svg.clientWidth || 300), H = Math.max(16, svg.clientHeight || 40), pad = opts.pad || 2;
        var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals), span = (max - min) || 1;
        var pts = vals.map(function(v, i){ return [i / (vals.length - 1) * (W - (opts.right || 0)), pad + (1 - (v - min) / span) * (H - pad * 2)]; });
        var last = pts[pts.length - 1], up = vals[vals.length - 1] >= vals[0];
        var h = '';
        if(opts.grid) [0.25, 0.5, 0.75].forEach(function(f){ h += '<line class="grid" x1="0" x2="' + W + '" y1="' + (H * f).toFixed(1) + '" y2="' + (H * f).toFixed(1) + '"/>'; });
        if(opts.guide) h += '<line class="guide" x1="0" x2="' + W + '" y1="' + last[1].toFixed(1) + '" y2="' + last[1].toFixed(1) + '"/>';
        h += '<polyline class="ln" points="' + pts.map(function(p){ return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
        if(opts.mark) h += '<rect class="mk" x="' + (last[0] - 3.5).toFixed(1) + '" y="' + (last[1] - 3.5).toFixed(1) + '" width="7" height="7"/>';
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.innerHTML = h;
        svg.classList.remove('up', 'dn'); svg.classList.add(up ? 'up' : 'dn');
        var ln = svg.querySelector('.ln');
        if(ln && ln.getTotalLength) ln.style.setProperty('--len', Math.ceil(ln.getTotalLength()));
        return up;
      }
      function drawAll(){
        if(main && series[main]){
          draw(card.querySelector('.sp-viz-chart'), series[main], {grid: true, guide: true, mark: true, pad: 10, right: 6});
          var mv = series[main], mch = card.querySelector('.sp-viz-ch');
          if(card.hasAttribute('data-period') && mch){
            var mp = (mv[mv.length - 1] / mv[0] - 1) * 100;
            mch.textContent = (mp >= 0 ? '+' : '') + mp.toFixed(1) + '%'; mch.classList.remove('up', 'dn'); mch.classList.add(mp >= 0 ? 'up' : 'dn');
          }
        }
        rows.forEach(function(r){
          var sym = r.getAttribute('data-sym'), vals = series[sym];
          if(!vals) return;
          var up = draw(r.querySelector('.sp-viz-spark'), vals, {pad: 2});
          var ch = r.querySelector('.ch');
          if(card.hasAttribute('data-period') && ch && vals.length > 1){
            var pct = (vals[vals.length - 1] / vals[0] - 1) * 100;
            ch.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%'; ch.classList.remove('up', 'dn'); ch.classList.add(pct >= 0 ? 'up' : 'dn');
          }
        });
      }
      function quotes(flash){
        return getJSON(API + '/api/quotes?symbols=' + all.join(',')).then(function(d){
          var list = (d && d.quoteResponse && d.quoteResponse.result) || [], by = {}, ok = 0;
          list.forEach(function(q){ if(q && q.symbol) by[q.symbol] = q; });
          if(main && setQ(card.querySelector('.sp-viz-px'), card.querySelector('.sp-viz-ch'), by[main], flash)) ok++;
          rows.forEach(function(r){
            if(card.hasAttribute('data-period')){ var q = by[r.getAttribute('data-sym')]; if(q && typeof q.regularMarketPrice === 'number'){ r.querySelector('.px').textContent = fmt(q.regularMarketPrice); ok++; } }
            else if(setQ(r.querySelector('.px'), r.querySelector('.ch'), by[r.getAttribute('data-sym')], flash)) ok++;
          });
          return ok;
        });
      }
      function fail(){ card.classList.add('sp-viz-fail'); }
      quotes(false).then(function(ok){
        if(!ok){ fail(); return; }
        return Promise.all(all.map(function(sym){
          return getJSON(API + '/api/history?symbol=' + encodeURIComponent(sym) + '&range=' + (sym === main ? '3mo' : range) + '&interval=1d')
            .then(function(d){ var c = closesOf(d); if(c.length >= 5) series[sym] = c; }).catch(function(){});
        })).then(function(){
          card.classList.add('is-live');
          drawAll();
          var t; window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(function(){ card.classList.add('no-draw'); drawAll(); }, 200); });
          setInterval(function(){ if(!document.hidden) quotes(true).catch(function(){}); }, 60000);
        });
      }).catch(fail);   // feed unavailable: the card steps aside and the hero goes back to text only
    });
  }

  /* ---------- Hero illustrations settle in once when visible ---------- */
  function vizReveal(){
    var els = $$('.vz-anim');
    if(!els.length) return;
    if(reduce){ els.forEach(function(el){ el.classList.add('in'); }); return; }
    whenVisible(els, function(el){ setTimeout(function(){ el.classList.add('in'); }, 150); }, 0.3);
  }

  /* ---------- Closing bands carry the logo's trail, drawn large ---------- */
  function bandTrail(host){
    if(host.querySelector('.sp-band-trail')) return;
    var W = 240, H = 24, pts = TRAIL.map(function(p){ return p[0] + ',' + (p[1] + 0.5); }).join(' ');
    var wrap = document.createElement('div');
    wrap.className = 'sp-band-trail'; wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<svg viewBox="0 -1 ' + W + ' ' + (H + 2) + '"><defs><linearGradient id="spBandG" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#e8262b"/><stop offset=".5" stop-color="#9a7c3a"/><stop offset="1" stop-color="#22c55e"/></linearGradient></defs>' +
      '<polyline class="ln" points="' + pts + '" stroke="url(#spBandG)" vector-effect="non-scaling-stroke"/></svg><img src="/logo-jet.png" alt=""/>';
    host.appendChild(wrap);
    var ln = wrap.querySelector('.ln');
    if(ln.getTotalLength) wrap.style.setProperty('--len', Math.ceil(ln.getTotalLength() * (wrap.clientWidth / W) + 10));
    if(reduce) wrap.classList.add('in'); else whenVisible([wrap], function(el){ el.classList.add('in'); }, 0.5);
  }

  /* ---------- Run ---------- */
  onReady(navCollapse);
  onReady(function(){
    wrapArrows();
    liveCards();
    vizReveal();
    $$('.cta-banner').forEach(bandTrail);
    var steps = $$('.steps');
    if(reduce) steps.forEach(function(el){ el.classList.add('in'); }); else whenVisible(steps, function(el){ el.classList.add('in'); }, 0.4);
    if(isMarket) marketMotion();
    if(reduce) return;

    if(isBullpen) tunnel();
    var afterTunnel = root.classList.contains('sp-tunnel') ? 1450 : 0;

    if(isHome){
      var heroEm = document.querySelector('.hero h1 em');
      if(heroEm) (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function(){ trailUnder(heroEm, true); });
      riseGroup('.facts .proof-num', 500);
      flipHeadlines('.bullpen .bp-title', {duration: 900});
      riseGroup('.bp-stats .bp-stat-num');
      whenVisible($$('.browser'), function(b){ $$('.stat-val', b).forEach(function(el, i){ riseIn(el, i * 120); }); }, 0.4);
      var lb = document.getElementById('landingLbRows');
      if(lb){
        var ran = false;
        var tryFlip = function(){ if(ran || lb.querySelectorAll('.lb-row').length < 3) return; ran = true; whenVisible([lb], function(){ leaderboardFlip(lb, '.lb-row'); }, 0.5); };
        new MutationObserver(tryFlip).observe(lb, {childList: true}); tryFlip();
      }
    }

    if(isBullpenHome){
      flipHeadlines('.hero h1', {duration: 1000, delay: afterTunnel + 300});
      flipHeadlines('.section-title, .mode-head, .cta-section h2', {duration: 800});
      riseGroup('.stats-strip .stat-num', afterTunnel + 500);
      var hero = document.querySelector('.hero');
      if(hero){ var pitch = document.createElement('div'); pitch.className = 'sp-arena-pitch'; pitch.setAttribute('aria-hidden', 'true'); hero.insertBefore(pitch, hero.firstChild); }
      if(hero && window.innerWidth > 1100) spLine(hero);
      var nav = document.querySelector('.bp-nav');
      if(nav) ribbonBoard(nav);
      whenVisible($$('.draft-preview'), draftReveal, 0.3);
      whenVisible($$('.lb-preview'), function(el){ leaderboardFlip(el, '.lb-row'); }, 0.4);
    }
    else if(isBullpen){
      flipHeadlines('.hero h1, .wrap > h1, main .hero h1, .page > h1', {duration: 850, delay: afterTunnel + 300});
    }

    if(isMarket){
      var lbr = document.getElementById('lbRows');
      if(lbr) new MutationObserver(function(){
        if(lbr.children.length >= 3 && inView(lbr)) leaderboardFlip(lbr, ':scope > div');
      }).observe(lbr, {childList: true});
    }

    if(/^\/(budget|investing|learn)$/.test(path)) riseGroup('.stats-strip .stat-num', 450);
    if(path === '/budget-challenge') riseGroup('.stats-row .stat-num', 400);
    if(path === '/classroom-pricing') riseGroup('.plan-price', 300);
  });
})();

/* App setup card: closing it (x, the dim backdrop or Esc) counts as done, so it
   does not open again on every page. "Show Setup" in Settings still reopens it. */
(function(){
  var KEY = 'stockPilot.onboardingComplete';
  function done(){ try { localStorage.setItem(KEY, 'true'); } catch(e) {} }
  function overlay(){ var o = document.getElementById('onboardingOverlay'); return o && !o.hidden ? o : null; }
  document.addEventListener('click', function(e){
    var o = overlay(); if(!o) return;
    if(e.target === o || (e.target.closest && e.target.closest('#skipOnboardingButton'))) done();
  }, true);
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    var o = overlay(), edu = document.getElementById('educationalOverlay');
    if(!o || (edu && !edu.hidden && getComputedStyle(edu).display !== 'none')) return;
    o.hidden = true; done();
  });
})();
