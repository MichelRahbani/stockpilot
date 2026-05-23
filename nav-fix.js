(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var isDark = path.startsWith('/trade');
  var tc = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  var ac = isDark ? 'white' : 'rgba(0,0,0,0.9)';
  var ab = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  var isApp = path.startsWith('/app');

  var links = [
    {href:'/trade',  label:'Virtual Market'},
    {href:'/app',    label:'Portfolio'},
    {href:'/budget', label:'Budget'},
    {href:'/learn',  label:'Learn'}
  ];

  function centerLinks(){
    return links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/');
      return '<a href="'+l.href+'" style="font-size:13px;font-weight:'+(active?'700':'500')+';color:'+(active?ac:tc)+';text-decoration:none;padding:6px 14px;border-radius:8px;background:'+(active?ab:'transparent')+';transition:all 0.15s;white-space:nowrap">'+l.label+'</a>';
    }).join('');
  }

  // ---- /app uses <header class="sp-site-header"> ----
  function fixAppNav(){
    var header = document.querySelector('.sp-site-header');
    if(!header || header.dataset.fixed) return;
    header.dataset.fixed = '1';

    var siteNav = header.querySelector('.sp-site-nav');
    if(!siteNav) return;

    // Replace inner nav links with our unified set
    siteNav.innerHTML = centerLinks();
    siteNav.style.cssText = 'display:flex;align-items:center;gap:2px;position:absolute;left:50%;transform:translateX(-50%)';
    header.style.position = 'relative';
  }

  // ---- trade/budget/learn use <nav> ----
  function fixStandardNav(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';

    var logoEl = nav.querySelector('a');
    var logoHtml = logoEl ? logoEl.outerHTML : '';
    var rightBtns = Array.from(nav.querySelectorAll('button'));
    var rightHtml = rightBtns.map(function(b){ return b.outerHTML; }).join('');

    nav.innerHTML =
      '<div style="display:flex;align-items:center;flex-shrink:0">'+logoHtml+'</div>'+
      '<div style="display:flex;align-items:center;gap:2px;position:absolute;left:50%;transform:translateX(-50%)">'+centerLinks()+'</div>'+
      '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0">'+rightHtml+'</div>';

    nav.style.position = 'relative';
    nav.style.display = 'flex';
    nav.style.alignItems = 'center';
    nav.style.justifyContent = 'space-between';
  }

  function run(){
    if(isApp){ fixAppNav(); } else { fixStandardNav(); }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    setTimeout(run, 100);
  }
})();
