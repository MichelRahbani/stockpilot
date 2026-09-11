// Research tab visual cleanup.
// Company Intel, Macro Dashboard, Watchlist, Compare Assets, and Market
// News are five independent tools stacked on top of each other under one
// "Research" tab. This adds a sub-tab bar and shows one at a time.
//
// app.js controls top-level panel visibility by toggling an "active"
// class. When the user clicks the main "Research" tab, app.js adds
// "active" to all five sections at once - so right after that click,
// we remove "active" from the four we don't want showing.
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
    updateBarVisibility();
  }

  // The bar's own visibility can't be tied to any single research section
  // (that section toggles active/inactive as sub-tabs are switched, which
  // would hide the bar along with it - the original bug). Instead, show
  // the bar whenever ANY research section is currently active, and hide
  // it only when the user has left Research entirely for another
  // top-level tab (Portfolio, Graphs, etc.).
  function updateBarVisibility(){
    var bar = document.getElementById('researchSubtabBar');
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

    // Insert as a SIBLING immediately before the first research section,
    // not as its child - a child's visibility is tied to that one
    // section's own active/inactive state, which toggles independently
    // as sub-tabs switch. That was the bug: switching to Macro correctly
    // hid the Company Intel section, and the bar (living inside it)
    // disappeared along with it. As a sibling, the bar's visibility is
    // instead controlled explicitly by updateBarVisibility() above.
    first.parentElement.insertBefore(bar, first);

    var style = document.createElement('style');
    style.textContent = '.research-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.research-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  // Re-enforce whenever the main "Research" tab is clicked, since that's
  // the only time app.js re-shows all five sections at once.
  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="research"]');
    if(!mainTab || mainTab.dataset.subtabWiredResearch) return;
    mainTab.dataset.subtabWiredResearch = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  // Also re-check visibility whenever ANY other top-level investing tab
  // is clicked, since navigating away from Research should hide the bar
  // too (it's a sibling now, not automatically tied to any section).
  function wireOtherTabClicks(){
    document.querySelectorAll('.invest-tab').forEach(function(tab){
      if(tab.dataset.subtabWiredResearch) return;
      tab.dataset.subtabWiredResearch = '1';
      tab.addEventListener('click', function(){ setTimeout(updateBarVisibility, 50); });
    });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    wireOtherTabClicks();
    if(document.getElementById('researchSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
