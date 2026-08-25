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

    // Insert the bar INSIDE the first section (as its first child),
    // not as a sibling before it — so the bar automatically hides along
    // with the section when app.js switches to a different top-level tab.
    // A sibling bar has no visibility tie to that state and would stay
    // permanently visible once built.
    first.insertBefore(bar, first.firstChild);

    var style = document.createElement('style');
    style.textContent = '.reports-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.reports-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="records"]');
    if(!mainTab || mainTab.dataset.subtabWired) return;
    mainTab.dataset.subtabWired = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    if(document.getElementById('reportsSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
