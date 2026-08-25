// Research tab visual cleanup.
// Company Intel, Macro Dashboard, Watchlist, Compare Assets, and Market
// News are five independent tools stacked on top of each other under one
// "Research" tab. This adds a sub-tab bar and shows one at a time.
//
// app.js controls top-level panel visibility by toggling an "active"
// class. When the user clicks the main "Research" tab, app.js adds
// "active" to all five sections at once — so right after that click,
// we remove "active" from the four we don't want showing. This listens
// for that click directly instead of watching for class mutations,
// which is simpler and avoids any risk of an observer/mutation loop.
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

    // Insert the bar INSIDE the first section (as its first child),
    // not as a sibling before it — so the bar automatically hides along
    // with the section when app.js switches to a different top-level tab.
    // A sibling bar has no visibility tie to that state and would stay
    // permanently visible once built.
    first.insertBefore(bar, first.firstChild);

    var style = document.createElement('style');
    style.textContent = '.research-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.research-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  // Re-enforce whenever the main "Research" tab is clicked, since that's
  // the only time app.js re-shows all five sections at once.
  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="research"]');
    if(!mainTab || mainTab.dataset.subtabWired) return;
    mainTab.dataset.subtabWired = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    if(document.getElementById('researchSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
