(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var isDark = path.startsWith('/trade');
  var isApp  = path.startsWith('/app');
  var tc = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  var ac = isDark ? 'white' : 'rgba(0,0,0,0.9)';
  var ab = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  var links = [
    {href:'/trade',  label:'Virtual Market'},
    {href:'/app',    label:'Portfolio'},
    {href:'/budget', label:'Budget'},
    {href:'/learn',  label:'Learn'}
  ];

  function makeLinkHtml(){
    return links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'" class="sp-nav-item" style="font-size:13px;font-weight:'+(active?'700':'500')+';color:'+(active?ac:tc)+';text-decoration:none;padding:6px 14px;border-radius:8px;background:'+(active?ab:'transparent')+';transition:all 0.15s;white-space:nowrap">'+l.label+'</a>';
    }).join('');
  }

  // ---- /app: header uses sp-site-header + sp-site-nav ----
  function fixApp(){
    var header = document.querySelector('.sp-site-header');
    if(!header || header.dataset.fixed) return;
    header.dataset.fixed = '1';

    var siteNav = header.querySelector('.sp-site-nav');
    if(!siteNav) return;

    // Replace links in the existing nav
    siteNav.innerHTML = makeLinkHtml();
    // Center the nav by using absolute positioning on the header (already position:fixed)
    // and giving the nav auto margins
    siteNav.style.cssText = 'display:flex!important;align-items:center!important;gap:2px!important;position:absolute!important;left:50%!important;transform:translateX(-50%)!important';
  }

  // ---- trade/budget/learn: standard <nav> ----
  function fixStandard(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';

    var logoEl = nav.querySelector('a');
    var logoHtml = logoEl ? logoEl.outerHTML : '';
    var rightHtml = Array.from(nav.querySelectorAll('button')).map(function(b){ return b.outerHTML; }).join('');

    nav.innerHTML =
      '<div style="display:flex;align-items:center;flex-shrink:0">'+logoHtml+'</div>'+
      '<div style="display:flex;align-items:center;gap:2px;position:absolute;left:50%;transform:translateX(-50%)">'+makeLinkHtml()+'</div>'+
      '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0">'+rightHtml+'</div>';

    nav.style.position = 'relative';
    nav.style.display = 'flex';
    nav.style.alignItems = 'center';
    nav.style.justifyContent = 'space-between';
  }

  function run(){ isApp ? fixApp() : fixStandard(); }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    setTimeout(run, 150);
  }
})();
