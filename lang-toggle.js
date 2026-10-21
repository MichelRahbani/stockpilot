/* StockPilot language picker (English, Spanish, French, Italian, German, Portuguese, Arabic).
   One small pill on every page opens a short menu. Other languages use
   Google's Website Translator, loaded only when one is chosen. English visitors load nothing extra.
   The choice is remembered. If anything fails, the page stays in English. */
(function(){
  'use strict';
  if (window.__spLang) return;
  window.__spLang = true;

  var KEY = 'sp_lang';
  var host = location.hostname;

  var LANGS = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Espa\u00f1ol' },
    { code: 'fr', label: 'Fran\u00e7ais' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Portugu\u00eas' },
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' }
  ];
  function valid(l){ return LANGS.some(function(x){ return x.code === l; }); }
  function getLang(){
    try { var l = localStorage.getItem(KEY); return valid(l) ? l : 'en'; } catch(e){ return 'en'; }
  }
  function setLang(l){
    try { localStorage.setItem(KEY, l); } catch(e){}
  }
  function setCookie(val){
    // Google Translate reads this cookie to know which language to show.
    var base = 'googtrans=' + val + '; path=/';
    if (val === '') base = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    try {
      document.cookie = base;
      document.cookie = base + '; domain=' + host;
      var parts = host.split('.');
      if (parts.length > 1) document.cookie = base + '; domain=.' + parts.slice(-2).join('.');
    } catch(e){}
  }

  // Keep tickers, symbols and code-like text exactly as they are.
  var NO_TRANSLATE = '.ti, .wl-sym, .q-sym, .sym, .ticker, [data-ticker], code, pre, kbd, .mono, #sp-lang-wrap';
  function protect(root){
    try {
      (root || document).querySelectorAll(NO_TRANSLATE).forEach(function(el){
        if (el.getAttribute('translate') !== 'no') el.setAttribute('translate', 'no');
      });
    } catch(e){}
  }

  // Brand names stay exactly as written in every language. Google only skips
  // text inside an element marked translate="no", so wrap each mention.
  var BRAND = /\b(Bullpen|StockPilot)\b/g;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|NOSCRIPT|CODE|PRE|OPTION)$/;
  function protectBrands(root){
    try {
      var base = root || document.body;
      if (!base) return;
      var walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, null);
      var hits = [], n;
      while ((n = walker.nextNode())) {
        BRAND.lastIndex = 0;
        if (!BRAND.test(n.nodeValue)) continue;
        var p = n.parentNode;
        if (!p || SKIP.test(p.nodeName) || (p.closest && p.closest('[translate="no"],.notranslate'))) continue;
        hits.push(n);
      }
      hits.forEach(function(t){
        // One wrapper per text node keeps the parent's layout the same (a flex or
        // grid parent still sees a single item). Custom tags avoid span/div CSS rules.
        var text = t.nodeValue, wrap = document.createElement('sp-t'), last = 0, m;
        BRAND.lastIndex = 0;
        while ((m = BRAND.exec(text))) {
          if (m.index > last) wrap.appendChild(document.createTextNode(text.slice(last, m.index)));
          var sp = document.createElement('sp-b');
          sp.setAttribute('translate', 'no');
          sp.className = 'notranslate';
          sp.textContent = m[0];
          wrap.appendChild(sp);
          last = m.index + m[0].length;
        }
        if (last < text.length) wrap.appendChild(document.createTextNode(text.slice(last)));
        t.parentNode.replaceChild(wrap, t);
      });
    } catch(e){}
  }

  function addStyles(){
    var css = ''
      + '#sp-lang-wrap{position:fixed;left:14px;bottom:14px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-start;gap:6px}'
      + '#sp-lang-menu{background:rgba(14,16,22,.97);border:1px solid rgba(255,255,255,.28);border-radius:10px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,.45);min-width:130px}'
      + '#sp-lang-menu[hidden]{display:none}'
      + '.sp-lang-item{display:block;width:100%;text-align:left;padding:8px 10px;border:0;border-radius:7px;background:none;color:#fff;font:500 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;cursor:pointer}'
      + '.sp-lang-item:hover,.sp-lang-item:focus-visible{background:rgba(255,255,255,.14);outline:none}'
      + '.sp-lang-item.on{font-weight:700;color:#7CFFB2}'
      + '#sp-lang-btn{display:inline-flex;align-items:center;gap:6px;'
      + 'padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(14,16,22,.92);color:#fff;'
      + 'font:600 12px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.04em;cursor:pointer;'
      + 'box-shadow:0 2px 10px rgba(0,0,0,.35)}'
      + '#sp-lang-btn:hover{border-color:rgba(255,255,255,.6)}'
      + '#sp-lang-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}'
      + 'sp-t,sp-b{display:inline}'
      + '#sp_gt_host{display:none!important}'
      // Hide Google's own banner and keep the page from shifting down.
      + '.goog-te-banner-frame,.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame{display:none!important}'
      + 'body{top:0!important}'
      + '.goog-text-highlight{background:none!important;box-shadow:none!important}';
    var s = document.createElement('style');
    s.id = 'sp-lang-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function chooseLang(l){
    setLang(l);
    setCookie(l === 'en' ? '' : '/en/' + l);
    location.reload();
  }

  function addButton(lang){
    var wrap = document.createElement('div');
    wrap.id = 'sp-lang-wrap';
    wrap.setAttribute('translate', 'no');
    var b = document.createElement('button');
    b.id = 'sp-lang-btn';
    b.type = 'button';
    b.textContent = lang.toUpperCase();
    b.setAttribute('aria-label', 'Language');
    b.setAttribute('aria-haspopup', 'true');
    b.setAttribute('aria-expanded', 'false');
    b.title = 'Language / Idioma / Langue / Lingua';
    var menu = document.createElement('div');
    menu.id = 'sp-lang-menu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;
    LANGS.forEach(function(x){
      var it = document.createElement('button');
      it.type = 'button';
      it.className = 'sp-lang-item' + (x.code === lang ? ' on' : '');
      it.setAttribute('role', 'menuitem');
      it.setAttribute('data-lang', x.code);
      it.textContent = x.label;
      it.addEventListener('click', function(){
        if (x.code === lang) { menu.hidden = true; b.setAttribute('aria-expanded', 'false'); return; }
        chooseLang(x.code);
      });
      menu.appendChild(it);
    });
    b.addEventListener('click', function(e){
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      b.setAttribute('aria-expanded', menu.hidden ? 'false' : 'true');
    });
    document.addEventListener('click', function(){ menu.hidden = true; b.setAttribute('aria-expanded', 'false'); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { menu.hidden = true; b.setAttribute('aria-expanded', 'false'); } });
    wrap.appendChild(menu);
    wrap.appendChild(b);
    document.body.appendChild(wrap);
  }

  function loadTranslator(){
    var host_ = document.createElement('div');
    host_.id = 'sp_gt_host';
    host_.setAttribute('translate', 'no');
    document.body.appendChild(host_);
    window.spTranslateInit = function(){
      try {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'es,fr,it,de,pt,ar,en',
          autoDisplay: false
        }, 'sp_gt_host');
      } catch(e){}
    };
    var sc = document.createElement('script');
    sc.src = 'https://translate.google.com/translate_a/element.js?cb=spTranslateInit';
    sc.async = true;
    sc.onerror = function(){ /* blocked or offline: page simply stays in English */ };
    document.head.appendChild(sc);
  }

  function start(){
    var lang = getLang();
    document.documentElement.setAttribute('data-sp-lang', lang);
    addStyles();
    protect(document);
    addButton(lang);
    if (lang !== 'en') {
      setCookie('/en/' + lang);
      protectBrands(document.body);
      loadTranslator();
      // Pages draw prices and tickers after load; keep them untouched.
      try {
        var t = null;
        new MutationObserver(function(){
          if (t) return;
          t = setTimeout(function(){ t = null; protect(document); protectBrands(document.body); }, 400);
        }).observe(document.body, { childList: true, subtree: true });
      } catch(e){}
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
