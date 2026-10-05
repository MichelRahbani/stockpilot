// Portfolio page visual hierarchy fix.
// The existing CSS has many layered, conflicting rules for these
// elements (.topbar alone is defined 4+ times across two files),
// so a plain stylesheet addition can't reliably win the cascade.
// Setting styles directly with !important priority via JS guarantees
// these actually apply regardless of what else is fighting for it.
(function(){
  function important(el, props){
    if(!el) return;
    Object.keys(props).forEach(function(k){
      el.style.setProperty(k, props[k], 'important');
    });
  }

  function apply(){
    // Section header (topbar, live status, account) is styled in sp-app.css

    var banner = document.querySelector('.data-quality-banner');
    important(banner, {
      'background': '#f0f2f5', 'border': 'none', 'border-radius': '0',
      'box-shadow': 'none', 'padding': '8px 16px', 'display': 'flex',
      'align-items': 'baseline', 'gap': '8px'
    });
    var bannerStrong = document.querySelector('.data-quality-banner strong');
    important(bannerStrong, {'font-size': '11px', 'text-transform': 'uppercase', 'letter-spacing': '0.06em', 'color': '#5a6478', 'flex-shrink': '0'});
    var bannerSpan = document.querySelector('.data-quality-banner span');
    important(bannerSpan, {'font-size': '12px', 'color': '#5a6478', 'line-height': '1.5'});

    important(document.querySelector('.workspace-navigator'), {
      'border-radius': '6px 6px 0 0', 'border-bottom': 'none', 'box-shadow': 'none', 'margin-bottom': '0'
    });


    var activePanel = document.querySelector('.lookup-panel.active');
    important(activePanel, {'background': '#e8f7f2', 'border': '1px solid rgba(26,158,110,0.15)', 'border-radius': '6px', 'padding': '24px'});
  }

  apply();
  // Re-apply after mode/view switches, since app.js re-renders these areas
  document.addEventListener('click', function(){ setTimeout(apply, 60); });
})();
