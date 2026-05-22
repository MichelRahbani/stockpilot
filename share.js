(function() {
  // StockPilot Share Widget
  // Add <script src="/share.js"></script> before </body> on any page

  var style = document.createElement('style');
  style.textContent = `
    #sp-share-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      background: #1a9e6e;
      color: white;
var css = [
  "#sp-share-btn{position:fixed;bottom:24px;right:24px;z-index:9999;background:#1a9e6e;color:white;border:none;border-radius:50px;padding:12px 20px;font-family:sans-serif;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(26,158,110,0.4);transition:all 0.2s}",
  "#sp-share-btn:hover{background:#147a55;transform:translateY(-2px)}",
  "#sp-share-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);opacity:0;transition:opacity 0.2s;pointer-events:none}",
  "#sp-share-modal.open{opacity:1;pointer-events:all}",
  "#sp-share-box{background:#12161f;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px;max-width:420px;width:90%;text-align:center;position:relative;transform:translateY(20px);transition:transform 0.2s}",
  "#sp-share-modal.open #sp-share-box{transform:translateY(0)}",
  "#sp-share-box h3{font-size:22px;color:white;margin-bottom:8px;font-weight:700}",
  "#sp-share-box p{font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:24px;line-height:1.6}",
  ".sp-share-options{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}",
  ".sp-share-option{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;color:white;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all 0.15s}",
  ".sp-share-option:hover{background:rgba(255,255,255,0.1)}",
  ".sp-share-icon{font-size:20px}",
  "#sp-copy-btn{background:none;border:none;color:rgba(255,255,255,0.3);font-size:13px;cursor:pointer;padding:8px;width:100%;font-family:sans-serif}",
  "#sp-copy-btn:hover{color:#2ecc9a}",
  "#sp-close{position:absolute;top:14px;right:18px;background:none;border:none;color:rgba(255,255,255,0.3);font-size:22px;cursor:pointer;line-height:1}",
  "#sp-close:hover{color:white}"
].join("");
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var url="https://mystockspilot.com";
var txt="I've been using StockPilot to practice investing risk-free. $100K virtual cash, real prices, zero risk. Completely free:";
var btn=document.createElement("button");btn.id="sp-share-btn";btn.innerHTML="🚀 Share StockPilot";document.body.appendChild(btn);
var modal=document.createElement("div");modal.id="sp-share-modal";
modal.innerHTML='<div id="sp-share-box"><button id="sp-close">×</button><h3>Know someone who should try this?</h3><p>StockPilot is free forever. Help a friend start investing without the fear.</p><div class="sp-share-options"><a class="sp-share-option" id="sp-wa" href="#" target="_blank"><span class="sp-share-icon">💬</span>Share on WhatsApp</a><a class="sp-share-option" id="sp-tw" href="#" target="_blank"><span class="sp-share-icon">ᵔF</span>Share on X</a><a class="sp-share-option" id="sp-li" href="#" target="_blank"><span class="sp-share-icon">💼</span>Share on LinkedIn</a></div><button id="sp-copy-btn">📋 Copy link</button></div>';
document.body.appendChild(modal);
document.getElementById("sp-wa").href="https://wa.me/?text="+encodeURIComponent(txt+" "+url);
document.getElementById("sp-tw").href="https://twitter.com/intent/tweet?text="+encodeURIComponent(txt)+"&url="+encodeURIComponent(url);
document.getElementById("sp-li").href="https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url);
btn.onclick=function(){modal.classList.add("open");};
document.getElementById("sp-close").onclick=function(){modal.classList.remove("open");};
modal.onclick=function(e){if(e.target===modal)modal.classList.remove("open");};
document.getElementById("sp-copy-btn").onclick=function(){
  var cb=document.getElementById("sp-copy-btn");
  navigator.clipboard.writeText(url).then(function(){cb.textContent="✅ Copied!";setTimeout(function(){cb.innerHTML="📋 Copy link";},2000);});
};
})();
