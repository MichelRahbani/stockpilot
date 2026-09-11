// Reports tab visual cleanup — same idea as Research/Graphs.
// Saved Portfolios and Portfolio Report are two stacked tools under one
// "Reports" tab. Re-enforces which one shows whenever the main "Reports"
// tab is clicked (the only time app.js re-shows both at once), same
// direct-listener pattern as Research/Graphs — no observer.
(function(){
  var sections = [
    { selector: '.saved-section', label: 'Saved Portfolios' },
    { selector: '.report-section', label: 'Portfolio Report' }
  ];
  var current = 0;

  function enforce(){
    sections.forEach(function(s, i){
      var el = document.querySelector(s.selector);
      if(!el) return;
      if(i === current) el.classList.add('active');
      else el.classList.remove('active');
    });
    var tabs = document.querySelectorAll('.reports-subtab');
    tabs.forEach(function(t, i){ t.classList.toggle('active', i === current); });
    updateBarVisibility();
  }

  // The bar's own visibility can't be tied to either single section
  // (each toggles active/inactive as sub-tabs switch, which would hide
  // the bar along with it - the original bug). Show the bar whenever
  // either section is active, hide it only when the user has left
  // Reports entirely for another top-level tab.
  function updateBarVisibility(){
    var bar = document.getElementById('reportsSubtabBar');
    if(!bar) return;
    var anyActive = sections.some(function(s){
      var el = document.querySelector(s.selector);
      return el && el.classList.contains('active');
    });
    bar.style.display = anyActive ? 'flex' : 'none';
  }

  function showOnly(index){
    current = index;
    enforce();
  }

  function buildTabBar(){
    var first = document.querySelector(sections[0].selector);
    if(!first || document.getElementById('reportsSubtabBar')) return;

    var bar = document.createElement('div');
    bar.id = 'reportsSubtabBar';
    bar.style.cssText = 'display:flex;gap:6px;overflow-x:auto;margin-bottom:16px;padding-bottom:2px';

    sections.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'reports-subtab' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.style.cssText = 'flex:0 0 auto;border:1px solid var(--sp-g100,#e4e7ed);border-radius:100px;background:transparent;color:var(--sp-g600,#3a4150);font-size:13px;font-weight:600;padding:7px 16px;cursor:pointer;white-space:nowrap;transition:all .15s';
      btn.addEventListener('click', function(){ showOnly(i); });
      bar.appendChild(btn);
    });

    // Insert as a SIBLING immediately before the first section, not as
    // its child - a child's visibility is tied to that one section's
    // own active/inactive state, which toggles independently as
    // sub-tabs switch (the bug this fixes). As a sibling, the bar's
    // visibility is instead controlled explicitly by updateBarVisibility().
    first.parentElement.insertBefore(bar, first);

    var style = document.createElement('style');
    style.textContent = '.reports-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.reports-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="records"]');
    if(!mainTab || mainTab.dataset.subtabWiredReports) return;
    mainTab.dataset.subtabWiredReports = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function wireOtherTabClicks(){
    document.querySelectorAll('.invest-tab').forEach(function(tab){
      if(tab.dataset.subtabWiredReports) return;
      tab.dataset.subtabWiredReports = '1';
      tab.addEventListener('click', function(){ setTimeout(updateBarVisibility, 50); });
    });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    wireOtherTabClicks();
    if(document.getElementById('reportsSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
