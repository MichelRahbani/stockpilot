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
    important(document.querySelector('.topbar'), {
      'display': 'flex', 'align-items': 'flex-start', 'justify-content': 'space-between',
      'gap': '24px', 'flex-wrap': 'wrap', 'background': 'transparent',
      'border': 'none', 'box-shadow': 'none', 'padding': '8px 4px 20px 24px'
    });
    var topbarActions = document.querySelector('.topbar .topbar-actions');
    if(topbarActions) topbarActions.style.setProperty('display', 'none', 'important');

    important(document.querySelector('.live-data-pill'), {
      'background': 'transparent', 'border': 'none', 'box-shadow': 'none', 'padding': '0', 'gap': '4px',
      'flex-shrink': '0', 'max-width': '230px'
    });
    important(document.querySelector('.account-widget'), {
      'background': 'transparent', 'border': 'none', 'box-shadow': 'none', 'padding': '0', 'gap': '4px',
      'flex-shrink': '0', 'max-width': '180px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'flex-end'
    });
    var accountActions = document.querySelector('.account-widget-actions');
    important(accountActions, { 'display': 'flex', 'gap': '6px' });

    var banner = document.querySelector('.data-quality-banner');
    important(banner, {
      'background': '#f0f2f5', 'border': 'none', 'border-radius': '0',
      'box-shadow': 'none', 'padding': '8px 16px', 'display': 'flex',
      'align-items': 'baseline', 'gap': '8px'
    });
    var bannerStrong = document.querySelector('.data-quality-banner strong');
    important(bannerStrong, {'font-size': '11px', 'text-transform': 'uppercase', 'letter-spacing': '0.06em', 'color': '#9aa3b4', 'flex-shrink': '0'});
    var bannerSpan = document.querySelector('.data-quality-banner span');
    important(bannerSpan, {'font-size': '12px', 'color': '#9aa3b4', 'line-height': '1.5'});

    important(document.querySelector('.workspace-navigator'), {
      'border-radius': '12px 12px 0 0', 'border-bottom': 'none', 'box-shadow': 'none', 'margin-bottom': '0'
    });
    important(document.querySelector('.invest-nav'), {
      'border-radius': '0 0 12px 12px', 'border-top': 'none', 'margin-bottom': '20px'
    });

    var launcher = document.querySelector('.help-launcher');
    important(launcher, {'background': 'none', 'border': 'none', 'padding': '0 0 16px', 'display': 'flex', 'align-items': 'center', 'gap': '10px'});
    var launcherBtn = launcher ? launcher.querySelector('.primary-button') : null;
    important(launcherBtn, {'background': 'transparent', 'color': '#1a9e6e', 'border': '1px solid #e8f7f2', 'box-shadow': 'none', 'padding': '5px 12px', 'font-size': '12px'});
    var launcherSpan = launcher ? launcher.querySelector('span') : null;
    important(launcherSpan, {'font-size': '12px', 'color': '#9aa3b4'});

    var activePanel = document.querySelector('.lookup-panel.active');
    important(activePanel, {'background': '#e8f7f2', 'border': '1px solid rgba(26,158,110,0.15)', 'border-radius': '14px', 'padding': '24px'});
  }

  apply();
  // Re-apply after mode/view switches, since app.js re-renders these areas
  document.addEventListener('click', function(){ setTimeout(apply, 60); });
})();
