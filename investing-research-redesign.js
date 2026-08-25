// Research tab visual cleanup.
// Company Intel, Macro Dashboard, Watchlist, Compare Assets, and Market
// News are five independent tools currently stacked on top of each other
// under one "Research" tab — to use News you have to scroll past four
// unrelated tools first. This adds a small sub-tab bar and shows one at
// a time, without touching any of the underlying app.js logic that
// renders into these sections (companyIntelGrid, macroGrid, etc.).
(function(){
  var sections = [
    { selector: '.intel-section', label: 'Company Intel' },
    { selector: '.macro-section', label: 'Macro' },
    { selector: '.watchlist-section', label: 'Watchlist' },
    { selector: '.comparison-section', label: 'Compare' },
    { selector: '.news-section', label: 'News' }
  ];

  function important(el, props){
    if(!el) return;
    Object.keys(props).forEach(function(k){
      el.style.setProperty(k, props[k], 'important');
    });
  }

  function showOnly(index){
    sections.forEach(function(s, i){
      var el = document.querySelector(s.selector);
      important(el, { 'display': i === index ? 'block' : 'none' });
    });
    var tabs = document.querySelectorAll('.research-subtab');
    tabs.forEach(function(t, i){
      t.classList.toggle('active', i === index);
    });
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

    // Style the active/inactive tab states, applied via a real
    // stylesheet since these buttons are created dynamically.
    var style = document.createElement('style');
    style.textContent = '.research-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.research-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  function apply(){
    buildTabBar();
    if(document.getElementById('researchSubtabBar')) showOnly(0);
  }

  apply();

  // Research's own content areas render async (macro data, news, etc.),
  // and the main Investing mode switcher can also hide/show this whole
  // tab — re-run once shortly after load to catch late-rendered content,
  // and whenever the tab bar might need rebuilding.
  setTimeout(apply, 800);
})();
