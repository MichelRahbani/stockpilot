/* Builds the Business page chrome so it matches Learn and Budget: site header, tab row, hero card. */
(function () {
  var cfg = window.BIZ_PAGE || {};
  var TABS = [['overview', 'Overview', '/business-workspace.html'], ['marketing', 'Marketing', '/marketing'], ['risk', 'Risk', '/risk'], ['funnel', 'Funnel Lab', '/marketing-lab'], ['risklab', 'Risk Lab', '/risk-lab'], ['games', 'Games', '/business-workspace.html#games']];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function build() {
    document.querySelectorAll('nav.top, .sub-tabs, .wrap > .hero, .wrap > h1, .wrap > .lede').forEach(function (n) { n.remove(); });
    var wrap = document.querySelector('.wrap');
    var h = document.createElement('header');
    h.className = 'sp-site-header';
    h.setAttribute('role', 'banner');
    h.innerHTML = '<a href="/" class="sp-site-logo" aria-label="StockPilot home"><img src="/logo-mark-256.png" alt="StockPilot" class="sp-mark sp-site-logo-mark"/><span class="sp-site-logo-text">StockPilot</span><span class="sp-site-logo-badge">BUSINESS</span></a><nav class="sp-site-nav" aria-label="Site navigation"></nav>';
    document.body.insertBefore(h, document.body.firstChild);
    var main = document.createElement('main');
    main.className = 'biz-main';
    var tabs = document.createElement('nav');
    tabs.className = 'biz-tabs';
    tabs.setAttribute('aria-label', 'Business sections');
    tabs.innerHTML = TABS.map(function (t) { return '<a class="biz-t' + (t[0] === cfg.tab ? ' on' : '') + '" data-tab="' + t[0] + '" href="' + t[2] + '">' + t[1] + '</a>'; }).join('');
    var hero = document.createElement('section');
    hero.className = 'biz-hero';
    hero.innerHTML = '<div><h1>' + esc(cfg.title || 'Business') + '</h1><p>' + esc(cfg.sub || '') + '</p></div>';
    main.appendChild(tabs); main.appendChild(hero);
    if (wrap) { wrap.parentNode.insertBefore(main, wrap); main.appendChild(wrap); } else document.body.appendChild(main);
    window.bizSetTab = function (name, title, sub) {
      tabs.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', a.dataset.tab === name); });
      if (title) { hero.querySelector('h1').textContent = title; hero.querySelector('p').textContent = sub || ''; }
    };
    if (cfg.onReady) cfg.onReady();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
