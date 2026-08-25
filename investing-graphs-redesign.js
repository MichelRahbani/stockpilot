// Graphs tab visual cleanup — same idea as the Research redesign.
// Portfolio Graphs, Target Suggestions, Portfolio DNA, and the Stress
// Simulator are four independent tools stacked on top of each other
// under one "Graphs" tab.
//
// Re-enforces which one shows whenever the main "Graphs" tab is clicked
// (the only time app.js re-shows all four at once), rather than using a
// MutationObserver, to avoid any risk of an observer/mutation loop.
(function(){
  var sections = [
    { selector: '.graphs-section', label: 'Charts' },
    { selector: '.suggestions-section', label: 'Suggestions' },
    { selector: '.dna-section', label: 'Portfolio DNA' },
    { selector: '.simulator-section', label: 'Stress Test' }
  ];
  var current = 0;

  function enforce(){
    sections.forEach(function(s, i){
      var el = document.querySelector(s.selector);
      if(!el) return;
      if(i === current) el.classList.add('active');
      else el.classList.remove('active');
    });
    var tabs = document.querySelectorAll('.graphs-subtab');
    tabs.forEach(function(t, i){ t.classList.toggle('active', i === current); });
  }

  function showOnly(index){
    current = index;
    enforce();
  }

  function buildTabBar(){
    var first = document.querySelector(sections[0].selector);
    if(!first || document.getElementById('graphsSubtabBar')) return;

    var bar = document.createElement('div');
    bar.id = 'graphsSubtabBar';
    bar.style.cssText = 'display:flex;gap:6px;overflow-x:auto;margin-bottom:16px;padding-bottom:2px';

    sections.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'graphs-subtab' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.style.cssText = 'flex:0 0 auto;border:1px solid var(--sp-g100,#e4e7ed);border-radius:100px;background:transparent;color:var(--sp-g600,#3a4150);font-size:13px;font-weight:600;padding:7px 16px;cursor:pointer;white-space:nowrap;transition:all .15s';
      btn.addEventListener('click', function(){ showOnly(i); });
      bar.appendChild(btn);
    });

    first.parentElement.insertBefore(bar, first);

    var style = document.createElement('style');
    style.textContent = '.graphs-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.graphs-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="insights"]');
    if(!mainTab || mainTab.dataset.subtabWired) return;
    mainTab.dataset.subtabWired = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    if(document.getElementById('graphsSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();

// Also fix the "Virtual Market has moved" banner inside Simulate — it's
// a dark maroon/red promo card hardcoded with inline styles, sitting in
// the middle of an otherwise light, clean page. Match it to the actual
// site theme instead.
(function(){
  function fixBanner(){
    var link = document.querySelector('.market-section a[href="/trade"]');
    if(!link) return;
    var card = link.parentElement;
    if(!card || card.dataset.bannerFixed) return;
    card.dataset.bannerFixed = '1';
    card.style.setProperty('background', '#e8f7f2', 'important');
    card.style.setProperty('border', '1px solid rgba(26,158,110,0.15)', 'important');
    var heading = card.querySelector('div[style*="Georgia"]');
    if(heading) heading.style.setProperty('color', '#12161f', 'important');
    var body = card.querySelector('p[style*="rgba(255,255,255,0.55)"]');
    if(body) body.style.setProperty('color', '#3a4150', 'important');
    var fineprint = card.querySelector('p[style*="rgba(255,255,255,0.25)"]');
    if(fineprint) fineprint.style.setProperty('color', '#8a93a3', 'important');
    link.style.setProperty('background', '#1a9e6e', 'important');
    link.style.setProperty('box-shadow', '0 4px 16px rgba(26,158,110,0.3)', 'important');
  }
  fixBanner();
  setTimeout(fixBanner, 800);
})();
