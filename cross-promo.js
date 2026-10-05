(function(){
var page=window.location.pathname;
(function(){var st=document.createElement('style');st.textContent='@media(max-width:600px){.sp-xp-band{padding:56px 20px!important}}';document.head.appendChild(st);})();

// ---- TRADE PAGE ----
if(page==='/trade'||page==='/trade.html'||page==='/trade/'){
  var style=document.createElement('style');
  style.textContent='#noStock{display:none!important}.quote-empty{display:flex!important;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:48px 32px}';
  document.head.appendChild(style);

  function injectQuickStart(){
    var empty=document.querySelector('.quote-empty');
    if(!empty||empty.dataset.injected)return;
    empty.dataset.injected='1';
    var mktId = (typeof activeMarket !== 'undefined' ? activeMarket : null) || localStorage.getItem('sp_active_market') || 'us';
    var tickerMap = {
      us: [{s:'AAPL',n:'Apple'},{s:'TSLA',n:'Tesla'},{s:'NVDA',n:'Nvidia'},{s:'SPY',n:'S&P 500'},{s:'MSFT',n:'Microsoft'},{s:'BTC-USD',n:'Bitcoin'}],
      sa: [{s:'2222.SR',n:'Aramco'},{s:'1180.SR',n:'Al Rajhi'},{s:'2010.SR',n:'SABIC'},{s:'2380.SR',n:'Petro Rabigh'},{s:'1120.SR',n:'Al Jazira'},{s:'2350.SR',n:'Saudi Kayan'}],
      uk: [{s:'SHEL.L',n:'Shell'},{s:'HSBA.L',n:'HSBC'},{s:'AZN.L',n:'AstraZeneca'},{s:'ULVR.L',n:'Unilever'},{s:'BP.L',n:'BP'},{s:'GSK.L',n:'GSK'}],
      de: [{s:'SAP.DE',n:'SAP'},{s:'SIE.DE',n:'Siemens'},{s:'BMW.DE',n:'BMW'},{s:'ALV.DE',n:'Allianz'},{s:'MBG.DE',n:'Mercedes'},{s:'BAYN.DE',n:'Bayer'}],
      jp: [{s:'7203.T',n:'Toyota'},{s:'6758.T',n:'Sony'},{s:'9984.T',n:'SoftBank'},{s:'8306.T',n:'MUFG'},{s:'6861.T',n:'Keyence'},{s:'9432.T',n:'NTT'}]
    };
    var tickers = tickerMap[mktId] || tickerMap.us;
    var html='';
    html+='<div style="margin-bottom:24px">';
    html+='<div style="font-family:var(--sp-font-display);font-size:22px;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:8px">Make your first trade</div>';
    html+='<div style="font-size:13px;color:rgba(255,255,255,0.58)">Tap a stock below, or search any ticker above</div>';
    html+='</div>';
    html+='<div class="sp-quick" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;width:100%;margin-bottom:24px">';
    tickers.forEach(function(t){
      html+='<button onclick="document.getElementById(\'symInput\').value=\''+t.s+'\';document.getElementById(\'searchBtn\').click()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:14px 10px;cursor:pointer;text-align:center;transition:all 0.15s" onmouseover="this.style.background=\'rgba(220,38,38,0.15)\';this.style.borderColor=\'rgba(220,38,38,0.4)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.06)\';this.style.borderColor=\'rgba(255,255,255,0.1)\'">';
      html+='<div style="font-family:var(--sp-font-mono);font-size:13px;font-weight:600;color:white">'+t.s+'</div>';
      html+='<div style="font-size:10px;color:rgba(255,255,255,0.58);margin-top:4px">'+t.n+'</div>';
      html+='</button>';
    });
    html+='</div>';
    html+='<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">';
    html+='<a href="/learn" style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px 16px;text-decoration:none;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600">New to investing?</a>';
    html+='<a href="/budget" style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px 16px;text-decoration:none;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600">Plan budget first</a>';
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
    banner.className='sp-xp-band';banner.style.cssText='background:#12161f;border-top:1px solid rgba(255,255,255,0.08);padding:72px 40px;text-align:left';
    banner.innerHTML='<div style="max-width:1120px;margin:0 auto"><div style="font-family:var(--sp-font-mono);font-size:13px;color:#f87171;margin-bottom:16px">Ready to apply what you learned?</div><h2 style="font-family:var(--sp-font-display);font-size:clamp(28px,4vw,46px);font-weight:700;letter-spacing:-0.035em;color:white;margin-bottom:16px;line-height:1.04">Now practice with real prices.<br><em style="font-style:normal;color:#f87171;font-weight:700">No real money required.</em></h2><p style="font-size:16px;color:rgba(255,255,255,0.6);margin-bottom:28px;max-width:520px">You just learned what a P/E ratio is. Go look one up on a real stock right now.</p><a href="/trade" style="display:inline-flex;align-items:center;gap:8px;background:#dc2626;color:white;height:48px;padding:0 24px;border-radius:4px;font-size:15px;font-weight:600;text-decoration:none">Open Virtual Market →</a><div style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:14px">Free forever · No real money · No account needed</div></div>';
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
    banner.className='sp-xp-band';banner.style.cssText='background:#12161f;border-top:1px solid rgba(255,255,255,0.08);padding:72px 40px;text-align:left';
    banner.innerHTML='<div style="max-width:1120px;margin:0 auto"><div style="font-family:var(--sp-font-mono);font-size:13px;color:#34d399;margin-bottom:16px">Budget looks good?</div><h2 style="font-family:var(--sp-font-display);font-size:clamp(28px,4vw,46px);font-weight:700;letter-spacing:-0.035em;color:white;margin-bottom:16px;line-height:1.04">Now see how investing<br><em style="font-style:normal;color:#34d399;font-weight:700">would change it.</em></h2><p style="font-size:16px;color:rgba(255,255,255,0.6);margin-bottom:28px;max-width:520px">Practice allocating money to real stocks with $100,000 of virtual cash. Zero risk.</p><div style="display:flex;gap:10px;justify-content:flex-start;flex-wrap:wrap"><a href="/trade" style="display:inline-flex;align-items:center;gap:6px;background:#059669;color:white;height:48px;padding:0 22px;border-radius:4px;font-size:15px;font-weight:600;text-decoration:none">Try Virtual Market →</a><a href="/learn" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);height:48px;padding:0 22px;border-radius:4px;font-size:15px;font-weight:600;text-decoration:none">Learn investing basics →</a></div><div style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:14px">Free forever · No real money · No account needed</div></div>';
    footer.parentNode.insertBefore(banner,footer);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectBudgetCTA);}else{setTimeout(injectBudgetCTA,100);}
}

})();
