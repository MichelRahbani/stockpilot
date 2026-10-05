(function() {
  // StockPilot Share Widget
  // Add <script src="/share.js"></script> before </body> on any page

var css = [
  "#sp-share-btn{position:fixed;bottom:20px;right:20px;z-index:9999;background:#12161f;color:#fff;border:1px solid rgba(255,255,255,0.16);border-radius:4px;height:40px;padding:0 16px;font-family:var(--sp-font-sans,sans-serif);font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 2px 10px rgba(0,0,0,0.18);transition:background-color .15s}",
  "#sp-share-btn:hover{background:#2b3240}",
  "#sp-share-btn svg{width:15px;height:15px;flex-shrink:0}",
  "@media(max-width:640px),(max-height:500px){#sp-share-btn{width:44px;height:44px;padding:0;justify-content:center;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px))}#sp-share-btn svg{width:17px;height:17px}#sp-share-btn .sp-share-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}",
  "#sp-share-btn.sp-share-compact{width:44px;height:44px;padding:0;justify-content:center}#sp-share-btn.sp-share-compact svg{width:17px;height:17px}#sp-share-btn.sp-share-compact .sp-share-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "#sp-share-modal{position:fixed;inset:0;z-index:10000;background:rgba(18,22,31,0.55);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.15s;pointer-events:none}",
  "#sp-share-modal.open{opacity:1;pointer-events:all}",
  "#sp-share-box{background:#fff;border:1px solid #e4e7ed;border-radius:8px;padding:32px 28px 20px;max-width:420px;width:calc(100% - 40px);text-align:left;position:relative;box-shadow:0 24px 48px rgba(18,22,31,0.18)}",
  "#sp-share-box h3{font-size:22px;color:#12161f;margin:0 32px 8px 0;font-weight:700;letter-spacing:-0.02em;line-height:1.2}",
  "#sp-share-box p{font-size:15px;color:#5a6478;margin-bottom:22px;line-height:1.55}",
  ".sp-share-options{display:flex;flex-direction:column;gap:0;margin-bottom:8px;border-top:1px solid #e4e7ed}",
  ".sp-share-option{display:flex;align-items:center;gap:12px;background:none;border:none;border-bottom:1px solid #e4e7ed;border-radius:0;padding:15px 2px;color:#12161f;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;transition:color .15s}",
  ".sp-share-option:hover{color:#147a55}",
  ".sp-share-icon{display:inline-flex;width:18px;height:18px;color:#5a6478}",
  ".sp-share-icon svg{width:18px;height:18px}",
  "#sp-copy-btn{display:inline-flex;align-items:center;gap:8px;background:none;border:none;color:#5a6478;font-size:14px;font-weight:600;cursor:pointer;padding:12px 2px;width:100%;font-family:inherit}",
  "#sp-copy-btn:hover{color:#147a55}",
  "#sp-copy-btn svg{width:16px;height:16px}",
  "#sp-close{position:absolute;top:14px;right:14px;width:32px;height:32px;background:none;border:none;color:#9aa3b4;font-size:24px;cursor:pointer;line-height:1;border-radius:4px}",
  "#sp-close:hover{color:#12161f;background:#f7f8fa}"
].join("");
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var url="https://mystockspilot.com";
var txt="I've been using StockPilot to practice investing risk-free. $100K virtual cash, real prices, zero risk. Completely free:";
var btn=document.createElement("button");btn.id="sp-share-btn";btn.innerHTML="<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"square\" aria-hidden=\"true\"><path d=\"M12 15V3\"/><path d=\"M7 8l5-5 5 5\"/><path d=\"M5 12v8h14v-8\"/></svg><span class=\"sp-share-label\">Share StockPilot</span>";btn.setAttribute("aria-label","Share StockPilot");if(/^\/(app|dashboard|trade)(\.html)?$|-workspace(\.html)?$/.test(location.pathname))btn.classList.add("sp-share-compact");btn.title="Share StockPilot";document.body.appendChild(btn);
var modal=document.createElement("div");modal.id="sp-share-modal";
modal.innerHTML='<div id="sp-share-box"><button id="sp-close">×</button><h3>Know someone who should try this?</h3><p>StockPilot is free forever. Help a friend start investing without the fear.</p><div class="sp-share-options"><a class="sp-share-option" id="sp-wa" href="#" target="_blank"><span class="sp-share-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg></span>Share on WhatsApp</a><a class="sp-share-option" id="sp-tw" href="#" target="_blank"><span class="sp-share-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M5 4l14 16"/><path d="M19 4L5 20"/></svg></span>Share on X</a><a class="sp-share-option" id="sp-li" href="#" target="_blank"><span class="sp-share-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><rect x="3" y="7" width="18" height="13"/><path d="M9 7V4h6v3"/></svg></span>Share on LinkedIn</a></div><button id="sp-copy-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Copy link</button></div>';
document.body.appendChild(modal);
document.getElementById("sp-wa").href="https://wa.me/?text="+encodeURIComponent(txt+" "+url);
document.getElementById("sp-tw").href="https://twitter.com/intent/tweet?text="+encodeURIComponent(txt)+"&url="+encodeURIComponent(url);
document.getElementById("sp-li").href="https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url);
btn.onclick=function(){modal.classList.add("open");};
document.getElementById("sp-close").onclick=function(){modal.classList.remove("open");};
modal.onclick=function(e){if(e.target===modal)modal.classList.remove("open");};
document.getElementById("sp-copy-btn").onclick=function(){
  var cb=document.getElementById("sp-copy-btn");
  navigator.clipboard.writeText(url).then(function(){cb.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>Copied!';setTimeout(function(){cb.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Copy link';},2000);});
};
})();
