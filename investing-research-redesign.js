// Research tab visual cleanup — same idea as the Graphs redesign.
// Company Intel, Macro Dashboard, Watchlist, Compare Assets, and Market
// News are five independent tools stacked on top of each other under one
// "Research" tab. This adds a sub-tab bar and shows one at a time.
//
// app.js controls top-level panel visibility by toggling an "active"
// class (.app-view{display:none!important} .app-view.active{display:block!important}).
// When the user switches to Research, app.js adds "active" to all five
// sections at once — so our job is just to remove "active" from the
// four we don't want showing, using the same class app.js already
// understands, rather than fighting it with inline styles.
(function(){
  var sections = [
    { selector: '.intel-section', label: 'Company Intel' },
    { selector: '.macro-section', label: 'Macro' },
    { selector: '.watchlist-section', label: 'Watchlist' },
    { selector: '.comparison-section', label: 'Compare' },
    { selector: '.news-section', label: 'News' }
  ];
  var current = 0;

  function enforce(){
    sections.forEach(function(s, i){
      var el = document.querySelector(s.selector);
      if(!el) return;
      if(i === current) el.classList.add('active');
      else el.classList.remove('active');
    });
    var tabs = document.querySelectorAll('.research-subtab');
    tabs.forEach(function(t, i){ t.classList.toggle('active', i === current); });
  }

  function showOnly(index){
    current = index;
    enforce();
  }

  function buildTabBar(){
    var first = document.querySelector(sections[0].selector);
    if(!first || document.getElementById('researchSubtabBar')) return;

    var bar = document.createElement('div');
    bar.id = 'researchSubtabBar';
    bar.style.cssText = 'display:flex;gap:6px;overflow-x:auto;margin-bottom:16px;padding-bottom:2px';

    sections.forEach(function(s, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'research-subtab' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.style.cssText = 'flex:0 0 auto;border:1px solid var(--sp-g100,#e4e7ed);border-radius:100px;background:transparent;color:var(--sp-g600,#3a4150);font-size:13px;font-weight:600;padding:7px 16px;cursor:pointer;white-space:nowrap;transition:all .15s';
      btn.addEventListener('click', function(){ showOnly(i); });
      bar.appendChild(btn);
    });

    first.parentElement.insertBefore(bar, first);

    var style = document.createElement('style');
    style.textContent = '.research-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.research-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  // Whenever app.js re-adds "active" to all five sections (switching
  // back to Research from elsewhere), immediately re-enforce which one
  // should actually show.
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
    if(document.getElementById('researchSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
