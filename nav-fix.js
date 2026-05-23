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

  function makeCenterDiv(){
    var html = links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'" style="font-size:13px;font-weight:'+(active?'700':'500')+';color:'+(active?ac:tc)+';text-decoration:none;padding:6px 14px;border-radius:8px;background:'+(active?ab:'transparent')+';transition:all 0.15s;white-space:nowrap">'+l.label+'</a>';
    }).join('');
    var div = document.createElement('div');
    div.id = 'sp-nav-center';
    div.style.cssText = 'display:flex;align-items:center;gap:2px;position:absolute;left:50%;transform:translateX(-50%);top:50%;margin-top:-16px;z-index:1';
    div.innerHTML = html;
    return div;
  }

  // /app: uses sp-site-header + sp-site-nav
  function fixApp(){
    var header = document.querySelector('.sp-site-header');
    if(!header || header.dataset.fixed) return;
    header.dataset.fixed = '1';
    // Hide existing sp-site-nav links
    var siteNav = header.querySelector('.sp-site-nav');
    if(siteNav) siteNav.style.display = 'none';
    // Make header relative for absolute centering
    header.style.position = 'fixed';
    header.appendChild(makeCenterDiv());
  }

  // trade/budget/learn: uses <nav>
  function fixStandard(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';
    // Hide all anchor links inside nav (except logo = first anchor)
    var allLinks = Array.from(nav.querySelectorAll('a'));
    var logo = allLinks[0];
    allLinks.forEach(function(a){
      if(a !== logo) a.style.display = 'none';
    });
    // Make nav relative for absolute centering
    if(nav.style.position !== 'fixed') nav.style.position = 'relative';
    nav.appendChild(makeCenterDiv());
  }

  function run(){ isApp ? fixApp() : fixStandard(); }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    setTimeout(run, 150);
  }
})();
