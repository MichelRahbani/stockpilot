/**
 * onboarding.js - StockPilot First-Time User Flow
 * 3 steps: Pick a stock -> Make a trade -> Check a lesson
 * Triggers once on /trade for new users
 */
(function(){
  'use strict';
  const STORAGE_KEY='stockPilot.onboardingComplete';
  const STEP_KEY='stockPilot.onboardingStep';
  if(!window.location.pathname.startsWith('/trade'))return;
  if(localStorage.getItem(STORAGE_KEY)==='true')return;
  const STEPS=[
    {number:1,emoji:'🔍',title:'Pick a stock',body:'Search any ticker above — try <strong>AAPL</strong>, <strong>TSLA</strong>, or <strong>SPY</strong>. Or click a stock card below.',target:'symInput',cta:"Got it, I'll search",completionEvent:'sp:stockLoaded',autoAdvance:true},
    {number:2,emoji:'📈',title:'Make your first trade',body:'Enter how many shares and hit <strong>Buy</strong>. You have $100,000 virtual cash — zero real money.',target:'execBtn',cta:"Got it, I'll trade",completionEvent:'sp:tradeExecuted',autoAdvance:true},
    {number:3,emoji:'🎓',title:'Check a lesson',body:'Head to <strong>Portfolio → Learning</strong> to understand what you just did. 42 free lessons.',target:null,cta:'Take me there →',ctaAction:()=>{window.location.href='/app#learning';},completionEvent:null,autoAdvance:false}
  ];
  let currentStep=parseInt(localStorage.getItem(STEP_KEY)||'0',10);
  let overlay,card,spotlight;
  function injectStyles(){
    if(document.getElementById('sp-onb-css'))return;
    const s=document.createElement('style');
    s.id='sp-onb-css';
    s.textContent='#sp-onb-overlay{position:fixed;inset:0;z-index:99998;pointer-events:none;transition:opacity .3s}'
    +'#sp-onb-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(1px);pointer-events:all}'
    +'#sp-onb-spotlight{position:absolute;border-radius:10px;box-shadow:0 0 0 9999px rgba(0,0,0,.72);border:2px solid rgba(220,53,53,.6);transition:all .35s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:1}'
    +'#sp-onb-spotlight.hidden{opacity:0}'
    +'#sp-onb-card{position:absolute;width:320px;background:#1a1a1a;border:1px solid #2e2e2e;border-radius:14px;padding:24px;box-shadow:0 24px 60px rgba(0,0,0,.8);pointer-events:all;z-index:2;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}'
    +'.sp-onb-dots{display:flex;gap:6px;margin-bottom:16px}'
    +'.sp-onb-dot{width:8px;height:8px;border-radius:50%;background:#3a3a3a;transition:all .25s;flex-shrink:0}'
    +'.sp-onb-dot.active{background:#dc3535;width:22px;border-radius:4px}'
    +'.sp-onb-dot.done{background:#555}'
    +'.sp-onb-emoji{font-size:28px;margin-bottom:10px;display:block}'
    +'.sp-onb-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#dc3535;margin-bottom:6px}'
    +'.sp-onb-title{font-size:20px;font-weight:700;color:#fff;margin:0 0 10px;line-height:1.25}'
    +'.sp-onb-body{font-size:14px;color:#aaa;line-height:1.6;margin:0 0 20px}'
    +'.sp-onb-body strong{color:#fff;font-weight:600}'
    +'.sp-onb-hint{font-size:11px;color:#555;margin-bottom:14px;display:flex;align-items:center;gap:5px}'
    +'.sp-onb-hint::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#dc3535;animation:sp-pulse 1.5s infinite;flex-shrink:0}'
    +'@keyframes sp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}'
    +'.sp-onb-actions{display:flex;gap:10px;align-items:center}'
    +'.sp-onb-btn-p{flex:1;background:#dc3535;color:#fff;border:none;border-radius:8px;padding:11px 18px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .2s,transform .1s}'
    +'.sp-onb-btn-p:hover{background:#c42e2e}'
    +'.sp-onb-btn-p:active{transform:scale(.97)}'
    +'.sp-onb-btn-s{background:none;color:#555;border:none;font-size:13px;cursor:pointer;padding:4px 8px;font-family:inherit;transition:color .2s}'
    +'.sp-onb-btn-s:hover{color:#888}'
    +'@keyframes sp-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}'
    +'#sp-onb-card.anim{animation:sp-in .3s ease forwards}';
    document.head.appendChild(s);
  }
  function build(){
    if(document.getElementById('sp-onb-overlay'))return;
    overlay=document.createElement('div');overlay.id='sp-onb-overlay';
    const bd=document.createElement('div');bd.id='sp-onb-backdrop';
    bd.addEventListener('click',e=>{if(e.target===bd)skip();});
    spotlight=document.createElement('div');spotlight.id='sp-onb-spotlight';spotlight.classList.add('hidden');
    card=document.createElement('div');card.id='sp-onb-card';
    overlay.appendChild(bd);overlay.appendChild(spotlight);overlay.appendChild(card);
    document.body.appendChild(overlay);
  }
  function setSpot(id){
    if(!id){spotlight.classList.add('hidden');return;}
    const el=document.getElementById(id);
    if(!el){spotlight.classList.add('hidden');return;}
    const r=el.getBoundingClientRect(),p=8;
    spotlight.style.cssText='top:'+(r.top-p+scrollY)+'px;left:'+(r.left-p+scrollX)+'px;width:'+(r.width+p*2)+'px;height:'+(r.height+p*2)+'px';
    spotlight.classList.remove('hidden');
  }
  function posCard(id){
    if(!id){card.style.cssText='top:50%;left:50%;transform:translate(-50%,-50%)';return;}
    card.style.transform='';
    const el=document.getElementById(id);
    if(!el){card.style.cssText='top:50%;left:50%;transform:translate(-50%,-50%)';return;}
    const r=el.getBoundingClientRect(),vw=innerWidth,vh=innerHeight,cw=352,ch=260;
    let top,left;
    if(r.bottom+ch+20<vh){top=r.bottom+scrollY+16;left=Math.max(Math.min(r.left+scrollX,vw-cw),16);}
    else if(r.top-ch-20>0){top=r.top+scrollY-ch-16;left=Math.max(Math.min(r.left+scrollX,vw-cw),16);}
    else{top=vh/2+scrollY-ch/2;left=Math.min(r.right+scrollX+16,vw-cw);}
    card.style.top=top+'px';card.style.left=left+'px';
  }
  function render(i){
    const s=STEPS[i];if(!s)return;
    localStorage.setItem(STEP_KEY,i);
    const dots=STEPS.map((_,j)=>'<div class="sp-onb-dot'+(j===i?' active':j<i?' done':'')+'"></div>').join('');
    const hint=s.autoAdvance?'<div class="sp-onb-hint">Auto-advances when you complete this step</div>':'';
    card.innerHTML='<div class="sp-onb-dots">'+dots+'</div><span class="sp-onb-emoji">'+s.emoji+'</span><div class="sp-onb-label">Step '+s.number+' of '+STEPS.length+'</div><h3 class="sp-onb-title">'+s.title+'</h3><p class="sp-onb-body">'+s.body+'</p>'+hint+'<div class="sp-onb-actions"><button class="sp-onb-btn-p" id="sp-onb-cta">'+s.cta+'</button><button class="sp-onb-btn-s" id="sp-onb-skip">Skip tour</button></div>';
    card.classList.remove('anim');void card.offsetWidth;card.classList.add('anim');
    setSpot(s.target);posCard(s.target);
    if(s.target){const el=document.getElementById(s.target);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});}
    document.getElementById('sp-onb-cta').addEventListener('click',()=>{if(s.ctaAction){complete();s.ctaAction();}else advance();});
    document.getElementById('sp-onb-skip').addEventListener('click',skip);
    if(s.autoAdvance&&s.completionEvent)window.addEventListener(s.completionEvent,autoAdv,{once:true});
  }
  function autoAdv(){setTimeout(advance,600);}
  function advance(){currentStep++;if(currentStep>=STEPS.length)complete();else render(currentStep);}
  function skip(){complete();window.dispatchEvent(new CustomEvent('sp:onboardingSkipped',{detail:{step:currentStep}}));}
  function complete(){
    localStorage.setItem(STORAGE_KEY,'true');localStorage.removeItem(STEP_KEY);
    overlay.style.opacity='0';overlay.style.pointerEvents='none';
    setTimeout(()=>overlay.remove(),350);
    window.dispatchEvent(new CustomEvent('sp:onboardingComplete',{detail:{completedSteps:currentStep}}));
  }
  function wireStock(){
    const qa=document.getElementById('quoteArea');if(!qa)return;
    const obs=new MutationObserver(()=>{if(qa.children.length>0||qa.style.display!=='none'){window.dispatchEvent(new CustomEvent('sp:stockLoaded'));obs.disconnect();}});
    obs.observe(qa,{childList:true,attributes:true,attributeFilter:['style','class']});
    const sb=document.getElementById('searchBtn');
    if(sb)sb.addEventListener('click',()=>setTimeout(()=>{if(qa.children.length>0)window.dispatchEvent(new CustomEvent('sp:stockLoaded'));},800),{once:true});
    document.querySelectorAll('.stock-card,[data-symbol]').forEach(c=>c.addEventListener('click',()=>setTimeout(()=>window.dispatchEvent(new CustomEvent('sp:stockLoaded')),800),{once:true}));
  }
  function wireTrade(){
    const toast=document.getElementById('toast');
    if(toast){
      const obs=new MutationObserver(()=>{
        if(toast.classList.contains('show')||toast.textContent.toLowerCase().includes('bought')||toast.textContent.toLowerCase().includes('trade')){window.dispatchEvent(new CustomEvent('sp:tradeExecuted'));obs.disconnect();}
      });
      obs.observe(toast,{attributes:true,childList:true,characterData:true,subtree:true});
    }
    const eb=document.getElementById('execBtn');
    if(eb)eb.addEventListener('click',()=>setTimeout(()=>window.dispatchEvent(new CustomEvent('sp:tradeExecuted')),1200),{once:true});
  }
  function init(){injectStyles();build();wireStock();wireTrade();setTimeout(()=>render(currentStep),800);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
