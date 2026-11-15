/* Budget & Accounting umbrella.
   Adds a tab bar to the Budget workspace: Budget planner, Accounting lessons, Statements Lab,
   Calculators and Supply chain. The budget tab is the existing app, untouched. The other tabs
   show the accounting pages in a frame that sizes itself to its content. */
(function () {
  'use strict';
  var main = document.querySelector('main.app-shell');
  if (!main || document.getElementById('acctTabs')) return;

  var TABS = [
    { id: 'budget', label: 'Budget planner' },
    { id: 'accounting', label: 'Accounting lessons', path: '/accounting' },
    { id: 'lab', label: 'Statements Lab', path: '/accounting-lab' },
    { id: 'tools', label: 'Calculators', path: '/accounting-tools' },
    { id: 'supply', label: 'Supply chain', path: '/supply-chain' }
  ];
  function byId(id) { for (var i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i]; return null; }
  function byPath(p) { p = p.replace(/\.html$/, ''); if (p === '/budget') return TABS[0]; for (var i = 1; i < TABS.length; i++) if (TABS[i].path === p) return TABS[i]; return null; }

  var css = document.createElement('style');
  css.textContent =
    '#acctTabs{position:relative;z-index:5;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:10px 16px;margin:64px auto 0;max-width:1400px}' +
    '#acctTabs::-webkit-scrollbar{display:none}' +
    '#acctTabs button{flex:0 0 auto;border:1px solid #d9d3f5;background:#fff;color:#475569;border-radius:999px;padding:8px 16px;font:600 13px/1.2 inherit;cursor:pointer;white-space:nowrap}' +
    '#acctTabs button:hover{border-color:#7c3aed;color:#6d28d9}' +
    '#acctTabs button[aria-selected="true"]{background:#7c3aed;border-color:#7c3aed;color:#fff}' +
    '#acctTabs button:focus-visible{outline:2px solid #7c3aed;outline-offset:2px}' +
    '#acctPanel{max-width:1400px;margin:0 auto;padding:0 16px 40px}' +
    '#acctPanel[hidden]{display:none}' +
    '#acctPanel iframe{display:block;width:100%;border:0;min-height:600px;background:transparent}' +
    '@media(max-width:700px){#acctTabs{padding:8px 12px}#acctPanel{padding:0 10px 30px}}';
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.id = 'acctTabs';
  bar.setAttribute('role', 'tablist');
  bar.setAttribute('aria-label', 'Budget and Accounting');
  TABS.forEach(function (t) {
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'tab-' + t.id; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', 'false');
    b.textContent = t.label;
    b.addEventListener('click', function () { show(t.id); });
    bar.appendChild(b);
  });
  var panel = document.createElement('div');
  panel.id = 'acctPanel'; panel.hidden = true;
  var frame = document.createElement('iframe');
  frame.title = 'Accounting'; frame.setAttribute('loading', 'lazy');
  panel.appendChild(frame);
  main.parentNode.insertBefore(bar, main);
  main.parentNode.insertBefore(panel, main);

  var current = 'budget';
  function srcFor(tab, query, frag) {
    return tab.path + '?' + (query ? query + '&' : '') + 'embed=1' + (frag ? '#' + frag : '');
  }
  function show(id, query, frag, keepScroll) {
    var tab = byId(id) || TABS[0];
    current = tab.id;
    TABS.forEach(function (t) { document.getElementById('tab-' + t.id).setAttribute('aria-selected', t.id === tab.id ? 'true' : 'false'); });
    if (tab.id === 'budget') {
      main.style.display = ''; panel.hidden = true;
    } else {
      main.style.display = 'none'; panel.hidden = false;
      var want = srcFor(tab, query, frag);
      if (frame.getAttribute('data-want') !== want) {
        var sameDoc = frame.getAttribute('data-base') === want.split('#')[0];
        frame.setAttribute('data-want', want);
        frame.setAttribute('data-base', want.split('#')[0]);
        frame.style.height = '600px';
        // A change of only the #part would not reload the frame, so force a reload
        if (sameDoc) { frame.src = 'about:blank'; setTimeout(function () { frame.src = want; }, 0); }
        else frame.src = want;
      }
    }
    try { history.replaceState(null, '', location.pathname + location.search + (tab.id === 'budget' ? '' : '#' + tab.id)); } catch (e) {}
    window.dispatchEvent(new Event('hashchange'));
    if (!keepScroll) window.scrollTo({ top: 0 });
  }
  window.spBudgetTab = show;

  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
    var d = e.data || {};
    if (typeof d.spAcctH === 'number') frame.style.height = Math.max(400, d.spAcctH + 4) + 'px';
    if (d.spAcctTop) { var r = bar.getBoundingClientRect(); window.scrollTo({ top: Math.max(0, window.pageYOffset + r.top - 60) }); }
    if (typeof d.spAcctGo === 'string') {
      var u; try { u = new URL(d.spAcctGo, location.origin); } catch (x) { return; }
      var t = byPath(u.pathname);
      if (!t) return;
      show(t.id, u.search.replace(/^\?/, '').replace(/(^|&)embed=1/, '').replace(/^&/, ''), u.hash.replace(/^#/, ''));
    }
  });

  // Open the right tab from the link: #lab, #supply, #lab?co=coffee&sc=1, #accounting!sc-eoq
  function openFromHash(keepScroll) {
    var h = (location.hash || '').replace(/^#/, '');
    var q = '', f = '', name = h;
    var qi = name.indexOf('?'); if (qi > -1) { q = name.slice(qi + 1); name = name.slice(0, qi); }
    var fi = name.indexOf('!'); if (fi > -1) { f = name.slice(fi + 1); name = name.slice(0, fi); }
    if (name && name !== 'budget' && byId(name)) show(name, q, f, keepScroll); else show('budget', '', '', keepScroll);
  }
  // Nav links like /budget-workspace.html#supply change only the hash
  window.addEventListener('hashchange', function () {
    var expected = current === 'budget' ? '' : '#' + current;
    if ((location.hash || '') !== expected) openFromHash(false);
  });
  openFromHash(true);
})();
