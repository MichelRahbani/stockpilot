(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var isDark = path.startsWith('/trade');
  var isApp  = path.startsWith('/app');
  var tc = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  var ac = isDark ? 'white' : 'rgba(0,0,0,0.9)';
  var ab = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  var links = [
    {href:'/trade',        label:'Virtual Market'},
    {href:'/app',          label:'Portfolio'},
    {href:'/budget',       label:'Budget'},
    {href:'/learn',        label:'Learn'},
    {href:'/bullpen.html', label:'🏟️ Bullpen'},
    {href:'/classroom.html', label:'🏫 Classroom'}
  ];

  function injectMobileCSS(){
    if(document.getElementById('sp-nav-mobile-css')) return;
    var style = document.createElement('style');
    style.id = 'sp-nav-mobile-css';
    style.textContent = [
      '#sp-nav-center { display:flex; align-items:center; gap:2px; position:absolute; left:50%; transform:translateX(-50%); top:50%; margin-top:-16px; z-index:1; pointer-events:all; }',
      '#sp-hamburger { display:none !important; background:none; border:none; cursor:pointer; padding:6px; z-index:10; flex-shrink:0; }',
      '#sp-mobile-menu { display:none; position:fixed; top:56px; left:0; right:0; background:' + (isDark?'#0d1117':'#fff') + '; padding:12px 16px; z-index:999; flex-direction:column; gap:4px; box-shadow:0 4px 20px rgba(0,0,0,0.3); border-bottom:1px solid rgba(255,255,255,0.08); }',
      '#sp-mobile-menu a { font-size:15px; font-weight:500; color:' + ac + '; text-decoration:none; padding:12px 14px; border-radius:8px; display:block; }',
      '#sp-mobile-menu a:hover { background:' + ab + '; }',
      '@media (max-width: 768px) {',
      '  #sp-nav-center { display:none !important; }',
      '  #sp-hamburger { display:flex !important; align-items:center; justify-content:center; }',
      /* On trade page — hide right side buttons on mobile, hamburger handles them */
      '  .sp-trade-nav-right { display:none !important; }',
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

  function makeHamburger(headerEl, extraItems){
    if(document.getElementById('sp-hamburger')) return;
    var btn = document.createElement('button');
    btn.id = 'sp-hamburger';
    btn.setAttribute('aria-label','Menu');
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect y="4" width="22" height="2" rx="1" fill="'+ac+'"/><rect y="10" width="22" height="2" rx="1" fill="'+ac+'"/><rect y="16" width="22" height="2" rx="1" fill="'+ac+'"/></svg>';
    headerEl.appendChild(btn);

    var menu = document.createElement('div');
    menu.id = 'sp-mobile-menu';
    // Nav links
    var linksHtml = links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'"'+(active?' style="font-weight:700"':'')+'>'+l.label+'</a>';
    }).join('');
    // Extra items (trade page buttons)
    menu.innerHTML = linksHtml + (extraItems||'');
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
    injectMobileCSS();
    header.appendChild(makeCenterDiv());
    makeHamburger(header);
  }

  function fixTrade(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';

    // Mark the right-side div so CSS can hide it on mobile
    var rightDiv = nav.children[1];
    if(rightDiv) rightDiv.classList.add('sp-trade-nav-right');

    if(window.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    injectMobileCSS();
    nav.appendChild(makeCenterDiv());

    // Build extra items for mobile menu — include sign in state
    var extraItems = '<div style="height:1px;background:rgba(255,255,255,0.08);margin:8px 0"></div>';

    // Check sign in state
    var token = localStorage.getItem('supabase_token');
    var name = localStorage.getItem('supabase_name');
    if(token && name){
      extraItems += '<div style="padding:10px 14px;font-size:13px;color:rgba(0,230,118,0.9);font-weight:600">👤 '+name+'</div>';
      extraItems += '<a href="#" onclick="if(typeof signOutTrade===\'function\')signOutTrade();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="color:rgba(255,255,255,0.5)!important">Sign Out</a>';
    } else {
      extraItems += '<a href="#" onclick="if(typeof openSignin===\'function\')openSignin();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="color:white!important;font-weight:600!important;background:rgba(255,23,68,0.15)!important">Sign In</a>';
    }
    extraItems += '<a href="#" onclick="if(typeof resetBtn!==\'undefined\'&&document.getElementById(\'resetBtn\'))document.getElementById(\'resetBtn\').click();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="color:rgba(255,255,255,0.4)!important;font-size:13px!important">Reset Portfolio</a>';

    makeHamburger(nav, extraItems);
  }

  function fixStandard(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';
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
