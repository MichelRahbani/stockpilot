// Simulate tab visual cleanup — same idea as Research and Graphs.
// Trade Ticket, Watchlist, Performance Timeline, Paper Positions, and
// Trade History are five tools stacked inside one section, all sharing
// the same .market-panel class (unlike Research/Graphs, these aren't
// separate top-level panels app.js toggles, so this is simpler: just a
// plain display toggle by position, no class-based mechanism to work
// around).
(function(){
  var labels = ['Trade Ticket', 'Watchlist', 'Performance', 'Positions', 'History'];
  var current = 0;

  function important(el, props){
    if(!el) return;
    Object.keys(props).forEach(function(k){
      el.style.setProperty(k, props[k], 'important');
    });
  }

  function getPanels(){
    return Array.from(document.querySelectorAll('.market-section .market-panel'));
  }

  function enforce(){
    var panels = getPanels();
    panels.forEach(function(panel, i){
      important(panel, { 'display': i === current ? 'block' : 'none' });
    });
    var tabs = document.querySelectorAll('.simulate-subtab');
    tabs.forEach(function(t, i){ t.classList.toggle('active', i === current); });
  }

  function showOnly(index){
    current = index;
    enforce();
  }

  function buildTabBar(){
    var panels = getPanels();
    if(panels.length < labels.length || document.getElementById('simulateSubtabBar')) return;

    var bar = document.createElement('div');
    bar.id = 'simulateSubtabBar';
    bar.style.cssText = 'display:flex;gap:6px;overflow-x:auto;margin-bottom:16px;padding-bottom:2px';

    labels.forEach(function(label, i){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'simulate-subtab' + (i === 0 ? ' active' : '');
      btn.textContent = label;
      btn.style.cssText = 'flex:0 0 auto;border:1px solid var(--sp-g100,#e4e7ed);border-radius:100px;background:transparent;color:var(--sp-g600,#3a4150);font-size:13px;font-weight:600;padding:7px 16px;cursor:pointer;white-space:nowrap;transition:all .15s';
      btn.addEventListener('click', function(){ showOnly(i); });
      bar.appendChild(btn);
    });

    panels[0].parentElement.insertBefore(bar, panels[0]);

    var style = document.createElement('style');
    style.textContent = '.simulate-subtab.active{background:#1a9e6e!important;border-color:#1a9e6e!important;color:#fff!important}.simulate-subtab:hover:not(.active){border-color:#1a9e6e!important;color:#1a9e6e!important}';
    document.head.appendChild(style);
  }

  // Re-enforce whenever the main "Simulate" tab is clicked, matching the
  // pattern used for Research/Graphs — no observer, just a direct listener.
  function wireMainTabClick(){
    var mainTab = document.querySelector('.invest-tab[data-view="market"]');
    if(!mainTab || mainTab.dataset.subtabWired) return;
    mainTab.dataset.subtabWired = '1';
    mainTab.addEventListener('click', function(){ setTimeout(enforce, 50); });
  }

  function apply(){
    buildTabBar();
    wireMainTabClick();
    if(document.getElementById('simulateSubtabBar')) enforce();
  }

  apply();
  setTimeout(apply, 800);
})();
