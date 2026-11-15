/* Budget & Accounting umbrella.
   The Budget workspace's own blue section row (Plan, Goals, Protection, Afford, Playbook) gets
   three more entries: Accounting, Statements Lab and Calculators. The budget screens are the
   existing app, untouched. The accounting entries, and the Supply Chain page reached from the
   site menu, show the accounting pages in a frame that sizes itself to its content. */
(function () {
  'use strict';
  var main = document.querySelector('main.app-shell');
  var realNav = document.querySelector('.savings-section-nav');
  if (!main || document.getElementById('acctPanel')) return;

  var TABS = [
    { id: 'budget' },
    { id: 'accounting', path: '/accounting', label: 'Accounting', sub: 'Lessons, beginner to intermediate', bg: '#ede9fe', icon: '<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>' },
    { id: 'lab', path: '/accounting-lab', label: 'Statements Lab', sub: 'Change a number, watch all three statements', bg: '#e0f2fe', icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    { id: 'tools', path: '/accounting-tools', label: 'Calculators', sub: 'Depreciation, loans, ratios, EOQ', bg: '#fff8e1', icon: '<rect x="5" y="3" width="14" height="18"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>' },
    { id: 'supply', path: '/supply-chain' }
  ];
  function byId(id) { for (var i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i]; return null; }
  function byPath(p) { p = p.replace(/\.html$/, ''); if (p === '/budget') return TABS[0]; for (var i = 1; i < TABS.length; i++) if (TABS[i].path === p) return TABS[i]; return null; }

  var css = document.createElement('style');
  css.textContent =
    '#acctPanel{position:relative;max-width:1400px;margin:0 auto;padding:83px 16px 40px}' +
    '#acctPanel[hidden]{display:none}' +
    '#acctPanel iframe{display:block;width:100%;border:0;min-height:600px;background:transparent}' +
    '#acctPanel .acct-nav{margin:0 0 14px}' +
    '@media(max-width:700px){#acctPanel{padding:72px 10px 30px}}';
  document.head.appendChild(css);

  function makeBtn(t) {
    var b = document.createElement('button');
    b.className = 'duo-subject-card savings-tab';
    b.type = 'button';
    b.setAttribute('data-acct-tab', t.id);
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<div class="duo-subject-icon" style="background:' + t.bg + '"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square">' + t.icon + '</svg></div>' +
      '<div class="duo-subject-info"><strong>' + t.label + '</strong><span>' + t.sub + '</span></div>';
    return b;
  }
  // Put the blue row first on the page, right under the site menu, like the accounting pages
  var ws = document.querySelector('main.app-shell > .workspace');
  if (realNav && ws) ws.insertBefore(realNav, ws.firstChild);

  // Add the accounting entries to the existing blue row
  if (realNav) {
    TABS.forEach(function (t) {
      if (!t.label) return;
      var b = makeBtn(t);
      b.addEventListener('click', function () { show(t.id); });
      realNav.appendChild(b);
    });
  }

  var panel = document.createElement('div');
  panel.id = 'acctPanel'; panel.hidden = true;
  var cloneNav = null;
  if (realNav) {
    cloneNav = realNav.cloneNode(true);
    cloneNav.classList.add('acct-nav');
    [].forEach.call(cloneNav.querySelectorAll('[data-savings-tab]'), function (b) {
      b.setAttribute('data-clone-savings', b.getAttribute('data-savings-tab'));
      b.removeAttribute('data-savings-tab');
      b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-clone-savings');
        show('budget', '', '', true);
        var real = realNav.querySelector('[data-savings-tab="' + key + '"]');
        if (real) real.click();
      });
    });
    [].forEach.call(cloneNav.querySelectorAll('[data-acct-tab]'), function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-acct-tab')); });
    });
    panel.appendChild(cloneNav);
  }
  var frame = document.createElement('iframe');
  frame.title = 'Accounting'; frame.setAttribute('loading', 'lazy');
  panel.appendChild(frame);
  main.parentNode.insertBefore(panel, main);

  var current = 'budget';
  function srcFor(tab, query, frag) {
    return tab.path + '?' + (query ? query + '&' : '') + 'embed=1' + (frag ? '#' + frag : '');
  }
  function show(id, query, frag, keepScroll) {
    var tab = byId(id) || TABS[0];
    current = tab.id;
    if (tab.id === 'budget') {
      main.style.display = ''; panel.hidden = true;
    } else {
      main.style.display = 'none'; panel.hidden = false;
      if (cloneNav) {
        if (tab.id === 'supply') cloneNav.style.setProperty('display', 'none', 'important'); else cloneNav.style.removeProperty('display');
        [].forEach.call(cloneNav.querySelectorAll('[data-acct-tab]'), function (b) {
          var on = b.getAttribute('data-acct-tab') === tab.id;
          b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      }
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
    if (d.spAcctTop) { var r = frame.getBoundingClientRect(); window.scrollTo({ top: Math.max(0, window.pageYOffset + r.top - 70) }); }
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
