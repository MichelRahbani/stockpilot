(function(){
  var path = window.location.pathname;
  if(path === '/' || path === '') return;

  var pages = {
    '/trade': {bg:'rgba(10,10,10,0.97)', border:'rgba(255,255,255,0.08)', logo:'white', dark:true},
    '/app':   {bg:'white', border:'#e5e7eb', logo:'#111', dark:false},
    '/budget':{bg:'white', border:'#e5e7eb', logo:'#111', dark:false},
    '/learn': {bg:'white', border:'#e5e7eb', logo:'#111', dark:false}
  };

  var page = null;
  for(var p in pages){ if(path.startsWith(p)) page = pages[p]; }
  if(!page) return;

  var links = [
    {href:'/trade', label:'Virtual Market'},
    {href:'/app',   label:'Portfolio'},
    {href:'/budget',label:'Budget'},
    {href:'/learn', label:'Learn'}
  ];

  function buildNav(){
    var nav = document.querySelector('nav');
    if(!nav || nav.dataset.fixed) return;
    nav.dataset.fixed = '1';

    // Find logo element (first anchor or img in nav)
    var logoEl = nav.querySelector('a');
    var logoHtml = logoEl ? logoEl.outerHTML : '';

    // Find the rightmost CTA button
    var ctaEl = null;
    var allBtns = Array.from(nav.querySelectorAll('button, a.btn, a[class*="btn"]'));
    // On trade: Sign In + Reset Portfolio buttons
    // On budget/learn: Start Free button
    // Keep all buttons on the right side
    var rightBtns = Array.from(nav.children).filter(function(el){
      if(el === logoEl) return false;
      // Check if it looks like a CTA (button or styled link)
      return el.tagName === 'BUTTON' || 
             (el.tagName === 'A' && (el.className.includes('btn') || el.style.background));
    });
    var rightHtml = rightBtns.map(function(el){ return el.outerHTML; }).join('');

    // If no right elements found, grab last child
    if(!rightHtml){
      var lastChild = nav.lastElementChild;
      if(lastChild && lastChild !== logoEl) rightHtml = lastChild.outerHTML;
    }

    // Build center links
    var tc = page.dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
    var ac = page.dark ? 'white' : 'rgba(0,0,0,0.9)';
    var ab = page.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    var centerLinks = links.map(function(l){
      var active = path === l.href || path.startsWith(l.href+'/') || path.startsWith(l.href+'?');
      return '<a href="'+l.href+'" style="font-size:13px;font-weight:'+(active?700:500)+';color:'+(active?ac:tc)+';text-decoration:none;padding:6px 14px;border-radius:8px;background:'+(active?ab:'transparent')+';transition:all 0.15s;white-space:nowrap">'+l.label+'</a>';
    }).join('');

    // Replace nav content entirely
    nav.innerHTML = 
      '<div style="display:flex;align-items:center;flex-shrink:0">' + logoHtml + '</div>' +
      '<div style="display:flex;align-items:center;gap:2px;position:absolute;left:50%;transform:translateX(-50%)">' + centerLinks + '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0">' + rightHtml + '</div>';
    
    nav.style.cssText += ';position:relative;display:flex;align-items:center;justify-content:space-between';
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    setTimeout(buildNav, 100);
  }
})();
