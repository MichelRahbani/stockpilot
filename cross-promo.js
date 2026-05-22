(function(){
var page=window.location.pathname;

// ---- TRADE PAGE ----
if(page==='/trade'||page==='/trade.html'||page==='/trade/'){
  var style=document.createElement('style');
  style.textContent='#noStock{display:none!important}.quote-empty{display:flex!important;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;min-height:280px}';
  document.head.appendChild(style);

  function injectQuickStart(){
    var empty=document.querySelector('.quote-empty');
    if(!empty||empty.dataset.injected)return;
    empty.dataset.injected='1';
    var tickers=[{s:'AAPL',n:'Apple'},{s:'TSLA',n:'Tesla'},{s:'NVDA',n:'Nvidia'},{s:'SPY',n:'S&P 500'},{s:'MSFT',n:'Microsoft'},{s:'BTC-USD',n:'Bitcoin'}];
    var html='';
    html+='<div style="margin-bottom:20px">';
    html+='<div style="font-family:Fraunces,serif;font-size:20px;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:6px">Make your first trade</div>';
    html+='<div style="font-size:13px;color:rgba(255,255,255,0.35)">Tap a stock below or search any ticker above</div>';
    html+='</div>';
    html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;max-width:420px;margin-bottom:20px">';
    tickers.forEach(function(t){
      html+='<button onclick="document.getElementById(\'symInput\').value=\''+t.s+'\';document.getElementById(\'searchBtn\').click()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 8px;cursor:pointer;text-align:center;transition:all 0.15s" onmouseover="this.style.background=\'rgba(220,38,38,0.15)\';this.style.borderColor=\'rgba(220,38,38,0.4)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.06)\';this.style.borderColor=\'rgba(255,255,255,0.1)\'">';
      html+='<div style="font-family:DM Mono,monospace;font-size:13px;font-weight:600;color:white">'+t.s+'</div>';
      html+='<div style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:3px">'+t.n+'</div>';
      html+='</button>';
    });
    html+='</div>';
    html+='<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">';
    html+='<a href="/learn" style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 14px;text-decoration:none;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600">📖 New to investing?</a>';
    html+='<a href="/budget" style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 14px;text-decoration:none;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600">💰 Plan budget first</a>';
    html+='</div>';
    empty.innerHTML=html;
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectQuickStart);}else{setTimeout(injectQuickStart,300);}
}

// ---- LEARN PAGE ----
if(page==='/learn'||page==='/learn.html'||page==='/learn/'){
  function injectLearnCTA(){
    var footer=document.querySelector('footer');
    if(!footer||footer.dataset.injected)return;
    footer.dataset.injected='1';
    var banner=document.createElement('div');
    banner.style.cssText='background:linear-gradient(135deg,#0a0a0a 0%,#1a0505 100%);border-top:1px solid rgba(220,38,38,0.2);padding:48px 40px;text-align:center';
    banner.innerHTML='<div style="max-width:560px;margin:0 auto"><div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(220,38,38,0.7);margin-bottom:12px">Ready to apply what you learned?</div><h2 style="font-family:Fraunces,serif;font-size:clamp(22px,4vw,34px);font-weight:700;color:white;margin-bottom:12px;line-height:1.2">Now practice with real prices.<br><em style="font-style:italic;color:#f87171;font-weight:300">No real money required.</em></h2><p style="font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:24px">You just learned what a P/E ratio is. Go look one up on a real stock right now.</p><a href="/trade" style="display:inline-flex;align-items:center;gap:8px;background:#dc2626;color:white;padding:13px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Open Virtual Market →</a><div style="font-size:11px;color:rgba(255,255,255,0.2);margin-top:10px">Free forever · No real money · No account needed</div></div>';
    footer.parentNode.insertBefore(banner,footer);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectLearnCTA);}else{setTimeout(injectLearnCTA,100);}
}

// ---- BUDGET PAGE ----
if(page==='/budget'||page==='/budget.html'||page==='/budget/'){
  function injectBudgetCTA(){
    var footer=document.querySelector('footer');
    if(!footer||footer.dataset.injected)return;
    footer.dataset.injected='1';
    var banner=document.createElement('div');
    banner.style.cssText='background:#0a0e17;border-top:1px solid rgba(16,185,129,0.15);padding:48px 40px;text-align:center';
    banner.innerHTML='<div style="max-width:560px;margin:0 auto"><div style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(16,185,129,0.7);margin-bottom:12px">Budget looks good?</div><h2 style="font-family:Fraunces,serif;font-size:clamp(22px,4vw,34px);font-weight:700;color:white;margin-bottom:12px;line-height:1.2">Now see how investing<br><em style="font-style:italic;color:#34d399;font-weight:300">would change it.</em></h2><p style="font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:24px">Practice allocating money to real stocks with $100,000 of virtual cash. Zero risk.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a href="/trade" style="display:inline-flex;align-items:center;gap:6px;background:#059669;color:white;padding:13px 24px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Try Virtual Market →</a><a href="/learn" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);padding:13px 24px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none">Learn investing basics →</a></div><div style="font-size:11px;color:rgba(255,255,255,0.2);margin-top:12px">Free forever · No real money · No account needed</div></div>';
    footer.parentNode.insertBefore(banner,footer);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectBudgetCTA);}else{setTimeout(injectBudgetCTA,100);}
}

})();
