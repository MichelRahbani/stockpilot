// Investing / Portfolio Builder visual cleanup.
// The underlying data (holdingCount, portfolioScore, etc.) is driven by
// app.js and re-rendered whenever holdings change — we don't touch any
// of that. This only restyles how it's presented: the verdict panel and
// six separate stat cards get merged into one unified summary strip, and
// an empty portfolio shows a simple, friendly prompt instead of a wall
// of zeros and "N/A"s that repeats what "Build Portfolio" already said.
(function(){
  function important(el, props){
    if(!el) return;
    Object.keys(props).forEach(function(k){
      el.style.setProperty(k, props[k], 'important');
    });
  }

  function isEmpty(){
    var count = document.getElementById('holdingCount');
    return !count || count.textContent.trim() === '0';
  }

  function styleStatStrip(){
    var grid = document.querySelector('.portfolio-summary-grid');
    var verdict = document.getElementById('portfolioVerdictPanel');
    if(!grid || !verdict) return;

    important(verdict, {
      'border-radius': '14px 14px 0 0', 'margin-bottom': '0', 'border-bottom': 'none'
    });
    important(grid, {
      'display': 'grid', 'grid-template-columns': 'repeat(3, 1fr)', 'gap': '0',
      'border': '1px solid var(--sp-g100, #e4e7ed)', 'border-top': 'none',
      'border-radius': '0 0 14px 14px', 'overflow': 'hidden', 'margin-bottom': '20px',
      'box-shadow': 'none'
    });
    grid.querySelectorAll('.metric-card').forEach(function(card, i){
      important(card, {
        'border': 'none', 'border-radius': '0', 'box-shadow': 'none',
        'padding': '14px 16px',
        'border-right': (i % 3 !== 2) ? '1px solid var(--sp-g100, #e4e7ed)' : 'none',
        'border-top': (i >= 3) ? '1px solid var(--sp-g100, #e4e7ed)' : 'none',
        'background': 'transparent'
      });
    });
  }

  function applyEmptyState(){
    var grid = document.querySelector('.portfolio-summary-grid');
    var verdict = document.getElementById('portfolioVerdictPanel');
    var existing = document.getElementById('emptyPortfolioPrompt');
    if(!grid || !verdict) return;

    if(isEmpty()){
      important(grid, { 'display': 'none' });
      if(!existing){
        var prompt = document.createElement('div');
        prompt.id = 'emptyPortfolioPrompt';
        prompt.style.cssText = 'border:1px solid var(--sp-g100,#e4e7ed);border-top:none;border-radius:0 0 14px 14px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:var(--sp-g400,#8a93a3)';
        prompt.textContent = 'Add holdings below to see your score, risk, and correlation.';
        verdict.insertAdjacentElement('afterend', prompt);
      }
    } else {
      important(grid, { 'display': 'grid' });
      if(existing) existing.remove();
    }
  }

  function apply(){
    styleStatStrip();
    applyEmptyState();
  }

  apply();

  // Re-check whenever holdings actually change, rather than guessing
  // at which button clicks trigger a recalculation.
  var target = document.getElementById('holdingCount');
  if(target){
    new MutationObserver(apply).observe(target, { childList: true, characterData: true, subtree: true });
  }
})();
