// Graphs tab visual cleanup — same idea as the Research redesign.
// Portfolio Graphs, Target Suggestions, Portfolio DNA, and the Stress
// Simulator are four independent tools stacked on top of each other
// under one "Graphs" tab.
//
// app.js controls top-level panel visibility by toggling an "active"
// class (.app-view{display:none!important} .app-view.active{display:block!important}).
// When the user switches to Graphs, app.js adds "active" to all four
// sections at once — so our job is just to remove "active" from the
// three we don't want showing, using the same class app.js already
// understands, rather than fighting it with inline styles.
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

  function watch(){
    sections.forEach(function(s){
      var el = document.querySelector(s.selector);
      if(!el || el.dataset.subtabWatched) return;
      el.dataset.subtabWatched = '1';
      new MutationObserver(function(muts){
        muts.forEach(function(m){
          if(m.attributeName === 'class' && el.classList.contains('active')){
            enforce();
          }
        });
      }).observe(el, { attributes: true, attributeFilter: ['class'] });
    });
  }

  function apply(){
    buildTabBar();
    watch();
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
