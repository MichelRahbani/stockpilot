(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var links = [
    {href:'/trade', label:'Virtual Market'},
    {href:'/app',   label:'Portfolio'},
    {href:'/budget',label:'Budget'},
    {href:'/learn', label:'Learn'}
  ];

  var isLight = path.includes('budget') || path.includes('learn');
  var textColor    = isLight ? 'rgba(0,0,0,0.5)'   : 'rgba(255,255,255,0.55)';
  var activeColor  = isLight ? 'rgba(0,0,0,0.9)'   : 'white';
  var activeBg     = isLight ? 'rgba(0,0,0,0.08)'  : 'rgba(255,255,255,0.1)';

  function buildNav(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';

    // Hide ALL existing anchor tags inside nav (except logo)
    var logo = nav.querySelector('a');
    Array.from(nav.querySelectorAll('a')).forEach(function(a){
      if(a !== logo) a.style.display = 'none';
    });
    // Hide existing buttons that are nav items (not the CTA)
    Array.from(nav.querySelectorAll('button')).forEach(function(btn){
      var txt = (btn.textContent||'').trim().toLowerCase();
      // keep only primary CTA buttons (sign in, reset, start free etc)
      var isCTA = txt.includes('sign') || txt.includes('reset') || txt.includes('start') || txt.includes('learning');
      if(!isCTA) btn.style.display = 'none';
    });

    // Build centered links
    var div = document.createElement('div');
    div.id = 'sp-nav-links';
    div.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:4px',
      'position:absolute',
      'left:50%',
      'transform:translateX(-50%)',
      'top:50%',
      'margin-top:-16px'
    ].join(';');

    div.innerHTML = links.map(function(l){
      var active = path === l.href || path === l.href+'/' || path.startsWith(l.href+'?');
      return '<a href="'+l.href+'" style="'
        +'font-size:13px;'
        +'font-weight:'+(active?'700':'500')+';'
        +'color:'+(active?activeColor:textColor)+';'
        +'text-decoration:none;'
        +'padding:6px 14px;'
        +'border-radius:8px;'
        +'background:'+(active?activeBg:'transparent')+';'
        +'transition:all 0.15s;'
        +'white-space:nowrap'
        +'"'+(active?' data-active="1"':'')+'>'+l.label+'</a>';
    }).join('');

    nav.style.position = 'relative';
    // Insert after first element (logo)
    var firstChild = nav.firstElementChild;
    if(firstChild && firstChild.nextSibling){
      nav.insertBefore(div, firstChild.nextSibling);
    } else {
      nav.appendChild(div);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    setTimeout(buildNav, 50);
  }
})();
