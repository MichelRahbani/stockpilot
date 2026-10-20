/* StockPilot language toggle (English / Spanish).
   One small pill on every page. Spanish uses Google's Website Translator,
   loaded only when Spanish is chosen. English visitors load nothing extra.
   The choice is remembered. If anything fails, the page stays in English. */
(function(){
  'use strict';
  if (window.__spLang) return;
  window.__spLang = true;

  var KEY = 'sp_lang';
  var host = location.hostname;

  function getLang(){
    try { return localStorage.getItem(KEY) === 'es' ? 'es' : 'en'; } catch(e){ return 'en'; }
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
  var NO_TRANSLATE = '.ti, .wl-sym, .q-sym, .sym, .ticker, [data-ticker], code, pre, kbd, .mono, #sp-lang-btn';
  function protect(root){
    try {
      (root || document).querySelectorAll(NO_TRANSLATE).forEach(function(el){
        if (el.getAttribute('translate') !== 'no') el.setAttribute('translate', 'no');
      });
    } catch(e){}
  }

  function addStyles(){
    var css = ''
      + '#sp-lang-btn{position:fixed;left:14px;bottom:14px;z-index:2147483000;display:inline-flex;align-items:center;gap:6px;'
      + 'padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(14,16,22,.92);color:#fff;'
      + 'font:600 12px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.04em;cursor:pointer;'
      + 'box-shadow:0 2px 10px rgba(0,0,0,.35)}'
      + '#sp-lang-btn:hover{border-color:rgba(255,255,255,.6)}'
      + '#sp-lang-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}'
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

  function addButton(lang){
    var b = document.createElement('button');
    b.id = 'sp-lang-btn';
    b.type = 'button';
    b.setAttribute('translate', 'no');
    if (lang === 'es') {
      b.textContent = 'EN';
      b.setAttribute('aria-label', 'Switch to English');
      b.title = 'Switch to English';
    } else {
      b.textContent = 'ES';
      b.setAttribute('aria-label', 'Cambiar a español');
      b.title = 'Ver en español';
    }
    b.addEventListener('click', function(){
      if (lang === 'es') { setLang('en'); setCookie(''); }
      else { setLang('es'); setCookie('/en/es'); }
      location.reload();
    });
    document.body.appendChild(b);
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
          includedLanguages: 'es,en',
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
    if (lang === 'es') {
      setCookie('/en/es');
      loadTranslator();
      // Pages draw prices and tickers after load; keep them untouched.
      try {
        var t = null;
        new MutationObserver(function(){
          if (t) return;
          t = setTimeout(function(){ t = null; protect(document); }, 400);
        }).observe(document.body, { childList: true, subtree: true });
      } catch(e){}
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
