(function(){
  var path = window.location.pathname;
  var page = path.replace(/\//g,'') || 'home';

  var links = [
    {href:'/trade', label:'Virtual Market'},
    {href:'/app',   label:'Portfolio'},
    {href:'/budget',label:'Budget'},
    {href:'/learn', label:'Learn'}
  ];

  // Don't run on homepage (index.html has its own nav)
  if(path === '/' || path === '') return;

  function buildNav(){
    var existing = document.querySelector('nav');
    if(!existing) return;

    // Build nav links HTML
    var linksHtml = links.map(function(l){
      var active = path === l.href || path === l.href+'.html' || path === l.href+'/';
      return '<a href="'+l.href+'" style="'
        +'font-size:13px;font-weight:'+(active?'700':'500')+';'
        +'color:'+(active?'white':'rgba(255,255,255,0.55)')+';'
        +'text-decoration:none;'
        +'padding:6px 12px;'
        +'border-radius:8px;'
        +'background:'+(active?'rgba(255,255,255,0.1)':'transparent')+';'
        +'transition:all 0.15s;'
        +'white-space:nowrap'
        +'" onmouseover="if(!this.dataset.active){this.style.color=\'rgba(255,255,255,0.85)\';this.style.background=\'rgba(255,255,255,0.06)\'}" '
        +'onmouseout="if(!this.dataset.active){this.style.color=\'rgba(255,255,255,0.55)\';this.style.background=\'transparent\'}" '
        +(active ? 'data-active="1"' : '')
        +'>'+l.label+'</a>';
    }).join('');

    // Detect background color from existing nav
    var existingBg = window.getComputedStyle(existing).backgroundColor;
    var isDark = existing.style.background && existing.style.background.includes('0,0,0')
      || existing.style.backgroundColor && existing.style.backgroundColor.includes('rgba(10')
      || document.body.style.background === '#000'
      || document.body.classList.contains('dark')
      || existing.querySelector('a') && window.getComputedStyle(existing.querySelector('a')).color.includes('255,255,255');

    // Use the existing nav's computed style to detect theme
    var navBg = existing.style.background || existing.style.backgroundColor || '';
    var isLightPage = path.includes('budget') || path.includes('learn');

    var linkColor = isLightPage ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)';
    var activeBg = isLightPage ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';
    var activeColor = isLightPage ? 'rgba(0,0,0,0.9)' : 'white';

    var linksHtmlThemed = links.map(function(l){
      var active = path === l.href || path === l.href+'.html' || path === l.href+'/';
      var c = active ? activeColor : linkColor;
      var bg = active ? activeBg : 'transparent';
      var fw = active ? '700' : '500';
      return '<a href="'+l.href+'" style="'
        +'font-size:13px;font-weight:'+fw+';'
        +'color:'+c+';'
        +'text-decoration:none;'
        +'padding:6px 12px;'
        +'border-radius:8px;'
        +'background:'+bg+';'
        +'transition:all 0.15s;'
        +'white-space:nowrap'
        +'"'
        +(active ? ' data-active="1"' : '')
        +'>'+l.label+'</a>';
    }).join('');

    // Inject a unified nav center section
    // Strategy: find or create a center links container inside existing nav
    var existingCenterLinks = existing.querySelector('#sp-nav-links');
    if(existingCenterLinks){
      existingCenterLinks.innerHTML = linksHtmlThemed;
      return;
    }

    // Create center links div and insert into nav
    var div = document.createElement('div');
    div.id = 'sp-nav-links';
    div.style.cssText = 'display:flex;align-items:center;gap:4px;position:absolute;left:50%;transform:translateX(-50%)';
    div.innerHTML = linksHtmlThemed;

    // Make sure nav is position:relative so absolute centering works
    existing.style.position = 'relative';

    // Insert after first child (logo)
    existing.insertBefore(div, existing.children[1] || null);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    setTimeout(buildNav, 50);
  }
})();
