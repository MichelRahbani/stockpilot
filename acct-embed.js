/* Lets the accounting pages run inside the Budget & Accounting workspace.
   With ?embed=1 inside a frame, the page drops its own header and tabs, tells the
   workspace how tall it is, and hands link clicks back to the workspace so the
   tabs stay in sync. On its own, the page behaves exactly as before. */
(function () {
  'use strict';
  var embed = /[?&]embed=1/.test(location.search) && window.parent !== window;
  window.spEmbed = embed;
  window.spGo = function (href) {
    if (embed) { try { parent.postMessage({ spAcctGo: href }, location.origin); return; } catch (e) {} }
    location.href = href;
  };
  window.spTop = function () {
    if (embed) { try { parent.postMessage({ spAcctTop: 1 }, location.origin); } catch (e) {} }
    else window.scrollTo({ top: 0 });
  };
  if (!embed) return;
  var st = document.createElement('style');
  st.textContent = '.top,.sub-tabs,#sp-lang-wrap{display:none!important}html,body{background:transparent!important}.wrap{padding-top:4px!important;padding-bottom:24px!important}.side,.toc{position:static!important;max-height:none!important}';
  document.head.appendChild(st);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || a.target === '_blank') return;
    var h = a.getAttribute('href') || '';
    if (/^\/(accounting(-lab|-tools)?|supply-chain|budget)(\.html)?([?#]|$)/.test(h)) { e.preventDefault(); window.spGo(h); }
  });
  var last = 0;
  function post() {
    var h = Math.ceil(document.body.getBoundingClientRect().height);
    if (Math.abs(h - last) < 2) return;
    last = h;
    try { parent.postMessage({ spAcctH: h }, location.origin); } catch (e) {}
  }
  function start() {
    post();
    try { new ResizeObserver(post).observe(document.body); } catch (e) { setInterval(post, 400); }
    window.addEventListener('load', post);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
