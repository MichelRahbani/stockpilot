(function(){
  // Same page whether it is opened as /dashboard or /dashboard.html
  var path = window.location.pathname.replace(/\.html$/, '') || '/';
  var isDark = path.startsWith('/trade') || path.startsWith('/cockpit');
  var isApp  = path.startsWith('/app') || /-workspace$/.test(path) || path === '/dashboard' || /^\/(marketing|marketing-lab|risk|risk-lab|ops|ops-lab|startups|startup-lab)$/.test(path);
  // A workspace counts as its section (/budget-workspace highlights Budget)
  var section = path.replace(/-workspace$/, '');
  if (/^\/(accounting|supply-chain)/.test(path)) section = '/budget';
  if (/^\/(marketing|marketing-lab|risk|risk-lab|ops|ops-lab|startups|startup-lab)/.test(path)) section = '/business';
  var onSupply = function(){ return /^\/(supply-chain)/.test(path) || (path === '/budget-workspace' && location.hash === '#supply'); };
  function same(href){
    if (href.indexOf('#supply') > -1) return onSupply();
    var h = href.replace(/\.html$/, '');
    if (h === '/budget' && onSupply()) return false;
    return path === h || section === h || path.startsWith(h + '/');
  }
  var tc = isDark ? 'rgba(255,255,255,0.62)' : '#5a6478';
  var ac = isDark ? '#ffffff' : '#12161f';
  var ab = isDark ? 'rgba(255,255,255,0.06)' : '#f7f8fa';
  var line = isDark ? 'rgba(255,255,255,0.08)' : '#e4e7ed';
  var accent = isDark ? '#2ecc9a' : '#1a9e6e';

  var links = [
    {href:'/trade',        label:'Virtual Market'},
    {href:'/investing',    label:'Investing'},
    {href:'/budget',       label:'Budget & Accounting'},
    {href:'/budget-workspace.html#supply', label:'Supply Chain'},
    {href:'/learn',        label:'Learn'},
    {href:'/business',     label:'Business'},
    {href:'/bullpen.html', label:'Bullpen'},
    {href:'/cockpit.html', label:'Cockpit'},
    {href:'/classroom.html', label:'Classroom'}
  ];

  function injectMobileCSS(){
    if(document.getElementById('sp-nav-mobile-css')) return;
    var style = document.createElement('style');
    style.id = 'sp-nav-mobile-css';
    style.textContent = [
      '#sp-nav-center { display:flex; align-items:center; gap:0; position:absolute; left:50%; transform:translateX(-50%); top:50%; margin-top:-17px; z-index:1; pointer-events:all; }',
      '#sp-nav-center a { display:block; line-height:34px; text-decoration-thickness:2px !important; text-underline-offset:9px; }',
      '#sp-nav-center a:hover { color:' + ac + ' !important; }',
      '#sp-more-panel a:hover { background:' + (isDark?'rgba(255,255,255,0.06)':'#f2f4f7') + '; }',
      '#sp-hamburger { display:none !important; background:none; border:none; cursor:pointer; padding:8px; margin-right:-8px; z-index:10; flex-shrink:0; }',
      '#sp-mobile-menu { display:none; position:fixed; top:56px; left:0; right:0; background:' + (isDark?'#0d1117':'#fff') + '; padding:4px 20px 16px; z-index:999; flex-direction:column; gap:0; box-shadow:0 12px 24px rgba(0,0,0,' + (isDark?'0.35':'0.06') + '); border-bottom:1px solid ' + line + '; border-top:1px solid ' + line + '; }',
      '#sp-mobile-menu a { font-size:16px; font-weight:500; color:' + ac + '; text-decoration:none; padding:14px 2px; border-radius:0; border-bottom:1px solid ' + line + '; display:block; }',
      '#sp-mobile-menu a:last-child { border-bottom:none; }',
      '#sp-mobile-menu a:hover { color:' + accent + '; }',
      '#sp-hamburger { margin-left:12px; }',
      'nav > .sp-nav-cta, nav > *:has(> .sp-nav-cta) { margin-left:auto; }',
      '@media (max-width: 640px) { .sp-nav-cta { display:none !important; } }',
      '@media (max-width: 1180px) {',
      '  #sp-nav-center { display:none !important; }',
      '  #sp-hamburger { display:flex !important; align-items:center; justify-content:center; }',
      /* On trade page — hide right side buttons on mobile, hamburger handles them */
      '  .sp-trade-nav-right { display:none !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // Core links stay in the bar; the rest live under "More"
  var MORE = ['/budget','/budget-workspace.html#supply','/business'];
  function linkHtml(l){
    var active = same(l.href);
    return '<a href="'+l.href+'"'+(active?' aria-current="page"':'')+' style="font-size:14px;font-weight:'+(active?'600':'500')+';color:'+(active?ac:tc)+';text-decoration:'+(active?'underline':'none')+';text-decoration-color:'+accent+';padding:0 12px;transition:color 0.15s;white-space:nowrap">'+l.label+'</a>';
  }
  function makeCenterDiv(){
    var main = links.filter(function(l){ return MORE.indexOf(l.href) < 0; });
    var more = links.filter(function(l){ return MORE.indexOf(l.href) >= 0; });
    var moreActive = more.some(function(l){ return same(l.href); });
    var panelBg = isDark ? '#0d1117' : '#ffffff';
    var html = main.map(linkHtml).join('');
    // Put "More" just before Classroom so Cockpit and Classroom stay on the right
    var moreBtn = '<span id="sp-more" style="position:relative;display:block">'
      + '<button id="sp-more-btn" type="button" aria-haspopup="true" aria-expanded="false" style="background:none;border:0;cursor:pointer;font-family:inherit;font-size:14px;font-weight:'+(moreActive?'600':'500')+';color:'+(moreActive?ac:tc)+';padding:0 12px;line-height:34px;white-space:nowrap;text-decoration:'+(moreActive?'underline':'none')+';text-decoration-color:'+accent+';text-underline-offset:9px;text-decoration-thickness:2px">More &#9662;</button>'
      + '<div id="sp-more-panel" style="display:none;position:absolute;top:38px;left:0;min-width:210px;background:'+panelBg+';border:1px solid '+line+';border-radius:8px;padding:6px;box-shadow:0 12px 32px rgba(0,0,0,.35);z-index:1000">'
      + more.map(function(l){
          var act = same(l.href);
          return '<a href="'+l.href+'" style="display:block;line-height:20px;padding:10px 12px;border-radius:6px;font-size:14px;font-weight:'+(act?'600':'500')+';color:'+(act?ac:tc)+';text-decoration:none;white-space:nowrap">'+l.label+'</a>';
        }).join('')
      + '</div></span>';
    var idx = html.lastIndexOf('<a href="/classroom');
    html = idx >= 0 ? html.slice(0, idx) + moreBtn + html.slice(idx) : html + moreBtn;
    var div = document.createElement('div');
    div.id = 'sp-nav-center';
    div.innerHTML = html;
    if(!div.dataset.moreBound){
      div.dataset.moreBound = '1';
      div.addEventListener('click', function(e){
        var btn = e.target.closest('#sp-more-btn');
        if(!btn) return;
        e.stopPropagation();
        var p = document.getElementById('sp-more-panel'), open = p.style.display === 'block';
        p.style.display = open ? 'none' : 'block'; btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      document.addEventListener('click', function(){
        var p = document.getElementById('sp-more-panel'); if(p) p.style.display = 'none';
        var b = document.getElementById('sp-more-btn'); if(b) b.setAttribute('aria-expanded','false');
      });
    }
    return div;
  }

  function makeHamburger(headerEl, extraItems){
    if(document.getElementById('sp-hamburger')) return;
    var btn = document.createElement('button');
    btn.id = 'sp-hamburger';
    btn.setAttribute('aria-label','Menu');
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="1" y="6" width="20" height="1.8" fill="'+ac+'"/><rect x="1" y="10.1" width="20" height="1.8" fill="'+ac+'"/><rect x="1" y="14.2" width="20" height="1.8" fill="'+ac+'"/></svg>';
    headerEl.appendChild(btn);

    var menu = document.createElement('div');
    menu.id = 'sp-mobile-menu';
    // Nav links
    var linksHtml = links.map(function(l){
      var active = same(l.href);
      return '<a href="'+l.href+'"'+(active?' style="font-weight:700"':'')+'>'+l.label+'</a>';
    }).join('');
    // Extra items (trade page buttons)
    menu.innerHTML = linksHtml + (extraItems||'');
    document.body.appendChild(menu);

    var open = false;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      open = !open;
      if(open){ var r = headerEl.getBoundingClientRect(); menu.style.top = Math.max(0, Math.round(r.bottom)) + 'px'; }
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
    if(siteNav) siteNav.style.setProperty('display', 'none', 'important');
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
    var extraItems = '<div style="height:1px;background:rgba(255,255,255,0.14);margin:4px 0"></div>';

    // Check sign in state
    var token = localStorage.getItem('supabase_token');
    var name = localStorage.getItem('supabase_name');
    if(token && name){
      extraItems += '<div style="padding:14px 2px;font-size:14px;color:#2ecc9a;font-weight:600">'+name+'</div>';
      extraItems += '<a href="#" onclick="if(typeof signOutTrade===\'function\')signOutTrade();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="color:rgba(255,255,255,0.5)!important">Sign Out</a>';
    } else {
      extraItems += '<a href="#" onclick="if(typeof openSignin===\'function\')openSignin();document.getElementById(\'sp-mobile-menu\').style.display=\'none\'" style="color:white!important;font-weight:600!important">Sign In</a>';
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
    allLinks.forEach(function(a){
      if(a === logo) return;
      // Keep the page's own call-to-action button visible on the right
      if(/(^|\s)(btn|nav-cta)(\s|$)/.test(a.className)){ a.classList.add('sp-nav-cta'); return; }
      a.style.display = 'none';
    });
    if(window.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    injectMobileCSS();
    nav.appendChild(makeCenterDiv());
    makeHamburger(nav);
  }

  window.addEventListener('hashchange', function(){
    var c = document.getElementById('sp-nav-center');
    if (c) c.innerHTML = makeCenterDiv().innerHTML;
  });

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
