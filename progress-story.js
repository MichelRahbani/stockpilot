/**
 * progress-story.js - StockPilot Portfolio Story Card
 * Enhances #portStory on /trade with a rich visual card.
 * Reads live data from #portValue, #portPnl, #portCash, #portStoryText.
 */
(function(){
  'use strict';
  if(!window.location.pathname.startsWith('/trade'))return;
  function fmt(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);}
  function fmtFull(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n);}
  function pct(n){return(n>=0?'+':'')+n.toFixed(2)+'%';}
  function parseDollar(s){if(!s)return 0;return parseFloat(s.replace(/[$,s]/g,'').replace('(','-').replace(')',''))||0;}
  function parsePct(s){if(!s)return 0;const m=s.match(/-?[d.]+/);return m?parseFloat(m[0]):0;}

  function injectStyles(){
    if(document.getElementById('sp-ps-css'))return;
    const s=document.createElement('style');s.id='sp-ps-css';
    s.textContent='.port-story{padding:0!important;background:transparent!important}'
    +'#sp-ps-card{background:#111;border:1px solid #222;border-radius:14px;padding:20px 22px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;margin-bottom:16px}'
    +'#sp-ps-card .sp-ps-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}'
    +'#sp-ps-card .sp-ps-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555}'
    +'#sp-ps-card .sp-ps-badge{font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;transition:all .3s}'
    +'#sp-ps-card .sp-ps-badge.up{background:rgba(34,197,94,.12);color:#22c55e}'
    +'#sp-ps-card .sp-ps-badge.down{background:rgba(239,68,68,.12);color:#ef4444}'
    +'#sp-ps-card .sp-ps-badge.flat{background:rgba(120,120,120,.12);color:#888}'
    +'#sp-ps-card .sp-ps-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}'
    +'#sp-ps-card .sp-ps-metric{background:#1a1a1a;border:1px solid #242424;border-radius:10px;padding:12px 14px}'
    +'#sp-ps-card .sp-ps-mlabel{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#555;margin-bottom:5px}'
    +'#sp-ps-card .sp-ps-mvalue{font-size:18px;font-weight:700;color:#fff;line-height:1.1;transition:color .3s}'
    +'#sp-ps-card .sp-ps-mvalue.up{color:#22c55e}'
    +'#sp-ps-card .sp-ps-mvalue.down{color:#ef4444}'
    +'#sp-ps-card .sp-ps-msub{font-size:11px;color:#555;margin-top:3px}'
    +'#sp-ps-card .sp-ps-bar{margin-bottom:18px}'
    +'#sp-ps-card .sp-ps-bar-row{display:flex;justify-content:space-between;font-size:11px;color:#555;margin-bottom:6px}'
    +'#sp-ps-card .sp-ps-bar-track{height:4px;background:#222;border-radius:2px;overflow:hidden}'
    +'#sp-ps-card .sp-ps-bar-fill{height:100%;border-radius:2px;transition:width .6s ease,background .3s}'
    +'#sp-ps-card .sp-ps-bar-fill.up{background:#22c55e}'
    +'#sp-ps-card .sp-ps-bar-fill.down{background:#ef4444}'
    +'#sp-ps-card .sp-ps-bar-fill.flat{background:#555}'
    +'#sp-ps-card .sp-ps-narrative{font-size:13px;color:#888;line-height:1.65;border-top:1px solid #1e1e1e;padding-top:14px;margin-bottom:0}'
    +'#sp-ps-card .sp-ps-narrative strong{color:#ccc;font-weight:600}'
    +'#sp-ps-card .sp-ps-footer{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid #1a1a1a}'
    +'#sp-ps-card .sp-ps-ts{font-size:11px;color:#3a3a3a}'
    +'#sp-ps-card .sp-ps-share{font-size:11px;font-weight:600;color:#dc3535;cursor:pointer;background:none;border:1px solid rgba(220,53,53,.3);border-radius:6px;padding:5px 12px;font-family:inherit;transition:background .2s}'
    +'#sp-ps-card .sp-ps-share:hover{background:rgba(220,53,53,.08)}'
    +'@media(max-width:500px){#sp-ps-card .sp-ps-metrics{grid-template-columns:1fr 1fr}#sp-ps-card .sp-ps-mvalue{font-size:15px}}';
    document.head.appendChild(s);
  }

  function buildCard(){
    const c=document.createElement('div');c.id='sp-ps-card';
    c.innerHTML='<div class="sp-ps-top"><span class="sp-ps-label">Portfolio story</span><span class="sp-ps-badge flat" id="sp-ps-badge">—</span></div>'
    +'<div class="sp-ps-metrics"><div class="sp-ps-metric"><div class="sp-ps-mlabel">Value</div><div class="sp-ps-mvalue" id="sp-ps-value">—</div><div class="sp-ps-msub">Started $100,000</div></div>'
    +'<div class="sp-ps-metric"><div class="sp-ps-mlabel">P&L</div><div class="sp-ps-mvalue" id="sp-ps-pnl">—</div><div class="sp-ps-msub" id="sp-ps-pct">—</div></div>'
    +'<div class="sp-ps-metric"><div class="sp-ps-mlabel">Cash left</div><div class="sp-ps-mvalue" id="sp-ps-cash">—</div><div class="sp-ps-msub" id="sp-ps-invested">Invested: —</div></div></div>'
    +'<div class="sp-ps-bar"><div class="sp-ps-bar-row"><span>Portfolio return</span><span id="sp-ps-bar-pct">—</span></div><div class="sp-ps-bar-track"><div class="sp-ps-bar-fill flat" id="sp-ps-bar" style="width:3%"></div></div></div>'
    +'<p class="sp-ps-narrative" id="sp-ps-narrative">Loading...</p>'
    +'<div class="sp-ps-footer"><span class="sp-ps-ts" id="sp-ps-ts">Updating...</span><button class="sp-ps-share" id="sp-ps-share-btn">Share my story ↗</button></div>';
    return c;
  }

  function readData(){
    const valueEl=document.getElementById('portValue');
    const pnlEl=document.getElementById('portPnl');
    const cashEl=document.getElementById('portCash');
    const narEl=document.getElementById('portStoryText');
    const value=parseDollar(valueEl?valueEl.textContent:'100000');
    const pnlText=pnlEl?pnlEl.textContent:'0';
    const pnlMatch=pnlText.match(/-?[d,]+.?d*/);
    const pnlVal=pnlMatch?parseDollar(pnlMatch[0]):0;
    const pctMatch=pnlText.match(/(([^)]+))/);
    const pctVal=pctMatch?parsePct(pctMatch[1]):((value-100000)/1000);
    const cashText=cashEl?cashEl.textContent.replace('Cash:','').trim():'100000';
    const cash=parseDollar(cashText);
    const narrative=narEl?narEl.textContent.trim():'';
    return{value,pnlVal,pctVal,cash,narrative};
  }

  function updateCard(d){
    const{value,pnlVal,pctVal,cash,narrative}=d;
    const isUp=pctVal>0.005,isDown=pctVal<-0.005;
    const dir=isUp?'up':isDown?'down':'flat';
    const badge=document.getElementById('sp-ps-badge');
    if(badge){badge.textContent=pct(pctVal);badge.className='sp-ps-badge '+dir;}
    const vEl=document.getElementById('sp-ps-value');if(vEl)vEl.textContent=fmt(value);
    const pEl=document.getElementById('sp-ps-pnl');if(pEl){pEl.textContent=fmtFull(pnlVal);pEl.className='sp-ps-mvalue '+dir;}
    const ptEl=document.getElementById('sp-ps-pct');if(ptEl)ptEl.textContent=pct(pctVal);
    const cEl=document.getElementById('sp-ps-cash');if(cEl)cEl.textContent=fmt(cash);
    const iEl=document.getElementById('sp-ps-invested');if(iEl)iEl.textContent='Invested: '+fmt(Math.max(0,value-cash));
    const barEl=document.getElementById('sp-ps-bar');
    if(barEl){const w=Math.min(Math.abs(pctVal)/5*100,100);barEl.style.width=Math.max(w,3)+'%';barEl.className='sp-ps-bar-fill '+dir;}
    const bpEl=document.getElementById('sp-ps-bar-pct');if(bpEl)bpEl.textContent=pct(pctVal);
    const nEl=document.getElementById('sp-ps-narrative');
    if(nEl&&narrative)nEl.innerHTML=narrative.replace(/(\$[d,]+.?d*|[+-]?[d.]+%)/g,'<strong>$1</strong>');
    const tsEl=document.getElementById('sp-ps-ts');
    if(tsEl){const n=new Date();tsEl.textContent='Updated '+n.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}
  }

  function wireShare(d){
    const btn=document.getElementById('sp-ps-share-btn');if(!btn)return;
    btn.onclick=()=>{
      const{value,pnlVal,pctVal}=d;
      const dir=pctVal>=0?'up':'down';
      const text='My StockPilot virtual portfolio is '+dir+' '+pct(pctVal)+' ('+fmtFull(pnlVal)+') — total value '+fmt(value)+'. Practice trading free at mystockspilot.com';
      if(navigator.share){navigator.share({text,url:'https://mystockspilot.com/trade'}).catch(()=>{});}
      else{navigator.clipboard.writeText(text).then(()=>{btn.textContent='Copied!';setTimeout(()=>{btn.textContent='Share my story ↗';},2000);});}
    };
  }

  function observeUpdates(){
    const obs=new MutationObserver(()=>{const d=readData();updateCard(d);wireShare(d);});
    ['portStoryText','portValue','portPnl','portCash'].forEach(id=>{
      const el=document.getElementById(id);
      if(el)obs.observe(el,{childList:true,characterData:true,subtree:true});
    });
  }

  function init(){
    const storyEl=document.getElementById('portStory');if(!storyEl)return;
    injectStyles();
        storyEl.style.display='block';
    storyEl.innerHTML='';
    storyEl.appendChild(buildCard());
    const d=readData();updateCard(d);wireShare(d);
    observeUpdates();
    setInterval(()=>{const d=readData();updateCard(d);wireShare(d);},30000);
        setTimeout(()=>{const d=readData();updateCard(d);wireShare(d);},2000);
  }

  function waitForStory(){
    const el=document.getElementById('portStory');
    if(el&&el.style.display!=='none'){init();}
    else{const iv=setInterval(()=>{const e=document.getElementById('portStory');if(e){clearInterval(iv);init();}},500);}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',waitForStory);
  else setTimeout(waitForStory,600);
})();
