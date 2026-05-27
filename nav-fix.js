(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var isDark = path.startsWith('/trade');
  var isApp  = path.startsWith('/app');
  var tc = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  var ac = isDark ? 'white' : 'rgba(0,0,0,0.9)';
  var ab = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  var links = [
    {href:'/trade',   label:'Virtual Market'},
    {href:'/app',     label:'Portfolio'},
    {href:'/budget',  label:'Budget'},
    {href:'/learn',   label:'Learn'},
    {href:'/bullpen.html', label:'🏟️ Bullpen'}
  ];

  function injectMobileCSS(){
    if(document.getElementById('sp-nav-mobile-css')) return;
    var style = document.createElement('style');
    style.id = 'sp-nav-mobile-css';
    style.textContent = [
      /* Center nav — absolutely centered so it never fights flex siblings */
      '#sp-nav-center { display:flex; align-items:center; gap:2px; position:absolute; left:50%; transform:translateX(-50%); top:50%; margin-top:-16px; z-index:1; pointer-events:all; }',
      '#sp-hamburger { display:none; background:none; border:none; cursor:pointer; padding:6px; z-index:10; flex-shrink:0; }',
      '#sp-mobile-menu { display:none; position:fixed; top:56px; left:0; right:0; background:' + (isDark?'#111':'#fff') + '; padding:12px 16px; z-index:999; flex-direction:column; gap:4px; box-shadow:0 4px 12px rgba(0,0,0,0.15); }',
      '#sp-mobile-menu a { font-size:15px; font-weight:500; color:' + ac + '; text-decoration:none; padding:10px 14px; border-radius:8px; display:block; }',
      '#sp-mobile-menu a:hover { background:' + ab + '; }',
      '@media (max-width: 700px) {',
      '  #sp-nav-center { display:none !important; }',
      '  #sp-hamburger { display:block !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function makeCenterDiv(){
    var html = links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'" style="font-size:13px;font-weight:'+(active?'700':'500')+';color:'+(active?ac:tc)+';text-decoration:none;padding:6px 14px;border-radius:8px;background:'+(active?ab:'transparent')+';transition:all 0.15s;white-space:nowrap">'+l.label+'</a>';
    }).join('');
    var div = document.createElement('div');
    div.id = 'sp-nav-center';
    div.innerHTML = html;
    return div;
  }

  function makeHamburger(headerEl){
    if(document.getElementById('sp-hamburger')) return;
    var btn = document.createElement('button');
    btn.id = 'sp-hamburger';
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect y="4" width="22" height="2" rx="1" fill="'+ac+'"/><rect y="10" width="22" height="2" rx="1" fill="'+ac+'"/><rect y="16" width="22" height="2" rx="1" fill="'+ac+'"/></svg>';
    headerEl.appendChild(btn);

    var menu = document.createElement('div');
    menu.id = 'sp-mobile-menu';
    menu.innerHTML = links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'"'+(active?' style="font-weight:700"':'')+'>'+l.label+'</a>';
    }).join('');
    document.body.appendChild(menu);

    var open = false;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      open = !open;
      menu.style.display = open ? 'flex' : 'none';
    });
    document.addEventListener('click', function(){
      open = false;
      menu.style.display = 'none';
    });
  }

  function fixApp(){
    var header = document.querySelector('.sp-site-header');
    if(!header || header.dataset.fixed) return;
    header.dataset.fixed = '1';
    var siteNav = header.querySelector('.sp-site-nav');
    if(siteNav) siteNav.style.display = 'none';
    header.style.position = 'fixed';
    // Make sure header is position:relative for absolute centering
    header.style.position = 'fixed';
    injectMobileCSS();
    header.appendChild(makeCenterDiv());
    makeHamburger(header);
  }

  function fixTrade(){
    // Trade page has its own nav with logo (child[0]) and right buttons (child[1])
    // Insert sp-nav-center into the nav as absolutely positioned — doesn't disrupt flex layout
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';
    // Ensure nav is position:relative for absolute centering
    if(window.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    injectMobileCSS();
    nav.appendChild(makeCenterDiv());
    makeHamburger(nav);
  }

  function fixStandard(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';
    // Hide existing nav links (keep logo)
    var allLinks = Array.from(nav.querySelectorAll('a'));
    var logo = allLinks[0];
    allLinks.forEach(function(a){ if(a !== logo) a.style.display = 'none'; });
    if(window.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    injectMobileCSS();
    nav.appendChild(makeCenterDiv());
    makeHamburger(nav);
  }

  function run(){
    if(isApp) fixApp();
    else if(isDark) fixTrade();
    else fixStandard();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    setTimeout(run, 150);
  }
})();
