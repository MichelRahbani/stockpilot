/**
 * post-trade-signup.js - StockPilot Post-Trade Signup Prompt
 * Fires after first trade if user is not signed in.
 * Loss aversion: "Your portfolio will be lost when you close this tab."
 */
(function(){
  'use strict';
  if(!window.location.pathname.startsWith('/trade'))return;
  const SHOWN_KEY='sp_signup_prompt_shown';
  if(localStorage.getItem(SHOWN_KEY))return;

  function isLoggedIn(){
    const b=document.getElementById('navUserBadge');
    return b&&b.style.display!=='none';
  }

  function injectStyles(){
    if(document.getElementById('sp-pts-css'))return;
    const s=document.createElement('style');s.id='sp-pts-css';
    s.textContent=
      '#sp-pts-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;animation:sp-pts-fi .25s ease}'
     +'@keyframes sp-pts-fi{from{opacity:0}to{opacity:1}}'
     +'#sp-pts-card{background:#111;border:1px solid #2a2a2a;border-radius:18px;padding:32px 28px;max-width:380px;width:100%;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;text-align:center;position:relative;animation:sp-pts-si .3s cubic-bezier(.34,1.56,.64,1)}'
     +'@keyframes sp-pts-si{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}'
     +'#sp-pts-close{position:absolute;top:14px;right:18px;background:none;border:none;color:#444;font-size:20px;cursor:pointer;line-height:1;padding:4px;font-family:inherit}'
     +'#sp-pts-close:hover{color:#888}'
     +'#sp-pts-emoji{font-size:42px;margin-bottom:12px;display:block;line-height:1}'
     +'#sp-pts-title{font-size:22px;font-weight:800;color:#fff;margin:0 0 10px;line-height:1.2}'
     +'#sp-pts-body{font-size:14px;color:#888;line-height:1.6;margin:0 0 8px}'
     +'#sp-pts-warning{background:rgba(220,53,53,.1);border:1px solid rgba(220,53,53,.25);border-radius:8px;padding:10px 14px;font-size:13px;color:#ef4444;margin:14px 0 22px;display:flex;align-items:center;gap:8px;text-align:left}'
     +'#sp-pts-warning::before{content:"⚠️";font-size:16px;flex-shrink:0}'
     +'#sp-pts-cta{width:100%;background:#dc3535;color:#fff;border:none;border-radius:10px;padding:14px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .2s,transform .1s;margin-bottom:12px}'
     +'#sp-pts-cta:hover{background:#c42e2e}'
     +'#sp-pts-cta:active{transform:scale(.98)}'
     +'#sp-pts-skip{background:none;border:none;color:#444;font-size:13px;cursor:pointer;font-family:inherit;transition:color .2s}'
     +'#sp-pts-skip:hover{color:#888}'
     +'#sp-pts-value{font-size:13px;color:#555;margin-top:16px;padding-top:16px;border-top:1px solid #1e1e1e;display:flex;justify-content:center;gap:16px;flex-wrap:wrap}';
    document.head.appendChild(s);
  }

  function showPrompt(){
    if(isLoggedIn())return;
    if(document.getElementById('sp-pts-overlay'))return;
    injectStyles();
    const value=document.getElementById('portValue')?.textContent?.trim()||'';
    const valueStr=value?'Your portfolio ('+value+') will be lost.':'Your portfolio will be lost.';
    const overlay=document.createElement('div');overlay.id='sp-pts-overlay';
    overlay.innerHTML=
      '<div id="sp-pts-card">'
     +'<button id="sp-pts-close">✕</button>'
     +'<span id="sp-pts-emoji">💰</span>'
     +'<h2 id="sp-pts-title">Nice trade! Save your portfolio.</h2>'
     +'<p id="sp-pts-body">You're building something. Don't lose it when you close this tab.</p>'
     +'<div id="sp-pts-warning">'+valueStr+' Sign up to keep it forever — it's free.</div>'
     +'<button id="sp-pts-cta">Create Free Account →</button><br>'
     +'<button id="sp-pts-skip">I'll risk losing it</button>'
     +'<div id="sp-pts-value"><span>✅ Free forever</span><span>✅ No credit card</span><span>✅ 30 seconds</span></div>'
     +'</div>';
    document.body.appendChild(overlay);
    localStorage.setItem(SHOWN_KEY,'1');

    document.getElementById('sp-pts-cta').addEventListener('click',()=>{
      overlay.remove();
      const btn=document.getElementById('signInNavBtn')||document.querySelector('[onclick*="signin"],[onclick*="signIn"]');
      if(btn){btn.click();}
      else{
        const modal=document.getElementById('signinModal');
        if(modal){modal.style.display='flex';const msg=document.getElementById('signinMsg');if(msg)msg.textContent='Create a free account to save your portfolio.';}
      }
    });
    const close=()=>overlay.remove();
    document.getElementById('sp-pts-close').addEventListener('click',close);
    document.getElementById('sp-pts-skip').addEventListener('click',close);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  }

  function watchForTrade(){
    const toast=document.getElementById('toast');
    if(toast){
      const obs=new MutationObserver(()=>{
        const text=toast.textContent.toLowerCase();
        const visible=toast.classList.contains('show')||toast.style.opacity==='1'||toast.style.display==='block';
        if(visible&&(text.includes('bought')||text.includes('trade')||text.includes('purchased')||text.includes('success'))){
          obs.disconnect();setTimeout(showPrompt,1200);
        }
      });
      obs.observe(toast,{attributes:true,childList:true,characterData:true,subtree:true});
    }
    const execBtn=document.getElementById('execBtn');
    if(execBtn){
      execBtn.addEventListener('click',()=>{
        if(execBtn.disabled||execBtn.textContent.toLowerCase().includes('enter'))return;
        setTimeout(showPrompt,1500);
      },{once:true});
    }
  }

  function init(){
    if(isLoggedIn())return;
    watchForTrade();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else setTimeout(init,500);
})();
