// Calculators tab visual cleanup, matching the same pattern already
// proven on the Research tab. TVM, Intrinsic Value, Treasury Ladder,
// Retirement Simulator, and Geometric Average were five calculators
// stacked under one tab, with the last three buried behind a
// collapsed "Advanced" fold - a different navigation pattern than
// Research's visible pill bar. This replaces the fold with the same
// visible sub-tab bar, so every section is one click away and
// visible up front, consistent with how Research already works.
(function(){
  var sections = [
    { selector: '.tvm-calc-section', label: 'TVM Calculator' },
    { selector: '.intrinsic-value-section', label: 'Intrinsic Value' },
    { selector: '.treasury-ladder-section', label: 'Treasury Ladder' },
    { selector: '.retirement-sim-section', label: 'Retirement Simulator' },
    { selector: '.geometric-avg-section', label: 'Geometric Average' }
  ];
  var current = 0;

  function enforce(){
    sections.forEach(function(s, i){
      var el = document.querySelector(s.selector);
      if(!el) return;
      el.style.display = (i === current) ? '' : 'none';
    });
    var tabs = document.querySelectorAll('.calculators-subtab');
    tabs.forEach(function(t, i){ t.classList.toggle('active', i === current); });
    updateBarVisibility();
  }

  // Same reasoning as the Research version: the bar is a sibling of
  // the sections, not a child of any one of them, so its own
  // visibility has to be managed explicitly rather than inherited
  // from a section that itself toggles on and off as sub-tabs switch.
  function updateBarVisibility(){
    var bar = document.getElementById('calculatorsSubtabBar');
    if(!bar) return;
    var anySectionExists = sections.some(function(s){ return document.querySelector(s.selector); });
    var mainTab = document.querySelector('.invest-tab[data-view="calculators"]');
    var onCalculatorsTab = mainTab && mainTab.classList.contains('active');
    bar.style.display = (anySectionExists && onCalculatorsTab) ? 'flex' : 'none';
  }

  function showOnly(index){
    current = index;
    enforce();
  }

  function buildTabBar(){
    var first = document.querySelector(sections[0].selector);
    if(!first || document.getElementById('calculatorsSubtabBar')) return;

    var bar = document.createElement('div');
    bar.id = 'calculatorsSubtabBar';
    bar.style.cssText = 'display:flex;gap:6px;overflow-x:auto;margin-bottom:16px;padding-bottom:2px';

    sections.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calculators-subtab' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.style.cssText = 'flex:0 0 auto;border:1px solid var(--sp-g100,#e4e7ed);border-radius:100px;background:transparent;color:var(--sp-g600,#3a4150);font-size:13px;font-weight:600;padding:7px 16px;cursor:pointer;white-space:nowrap;transition:all .15s';
      btn.addEventListener('click', function(){ showOnly(i); });
      bar.appendChild(btn);
    });

    first.parentElement.insertBefore(bar, first);

    var style = document.createElement('style');
    style.textContent = '.calculators-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.calculators-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="calculators"]');
    if(!mainTab || mainTab.dataset.subtabWiredCalculators) return;
    mainTab.dataset.subtabWiredCalculators = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function wireOtherTabClicks(){
    document.querySelectorAll('.invest-tab').forEach(function(tab){
      if(tab.dataset.subtabWiredCalculators) return;
      tab.dataset.subtabWiredCalculators = '1';
      tab.addEventListener('click', function(){ setTimeout(updateBarVisibility, 50); });
    });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    wireOtherTabClicks();
    if(document.getElementById('calculatorsSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
