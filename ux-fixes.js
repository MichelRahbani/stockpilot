(function(){
    var path = window.location.pathname;

   // ── 1. BUDGET + LEARN: speed up fade-in so page doesn't look broken ──
   if(path.startsWith('/budget') || path.startsWith('/learn')) {
         var style = document.createElement('style');
         style.textContent = [
                 // Override all fadeUp animations to start visible and be instant
                 '@keyframes fadeUp {',
                 '  0%   { opacity: 0.6; transform: translateY(8px); }',
                 '  100% { opacity: 1;   transform: translateY(0); }',
                 '}',
                 // Kill the delay so content is visible immediately
                 '.hero-sub, .hero-actions, .hero h1, .hero h2, .hero-eyebrow {',
                 '  animation-duration: 0.25s !important;',
                 '  animation-delay: 0s !important;',
                 '}'
               ].join('\n');
         document.head.appendChild(style);
   }

   // ── 2. TRADE: move "About portfolio" info box below stock cards ──
   if(path.startsWith('/trade')) {
         function moveInfoBox() {
                 // Find the info box (contains "Survives refresh")
           var infoBox = Array.from(document.body.children).find(function(el) {
                     return el.textContent.includes('Survives refresh');
           });
                 // Find the stock cards layout container
           var layout = document.querySelector('.layout');
                 if(!infoBox || !layout) return;

           // Move it after the layout div
           infoBox.style.cssText += 'margin:16px auto;max-width:780px;padding:0 16px;';
                 layout.parentNode.insertBefore(infoBox, layout.nextSibling);
         }

      // ── 3. TRADE: make Reset Portfolio a ghost button, not red ──
      function fixResetBtn() {
              var resetBtn = document.getElementById('resetBtn');
              if(!resetBtn) return;
              resetBtn.style.cssText = [
                        'background: transparent',
                        'border: 1.5px solid rgba(255,255,255,0.3)',
                        'color: rgba(255,255,255,0.6)',
                        'font-size: 13px',
                        'padding: 6px 14px',
                        'border-radius: 8px',
                        'cursor: pointer',
                        'transition: all 0.15s'
                      ].join(';');
              resetBtn.addEventListener('mouseenter', function() {
                        resetBtn.style.borderColor = 'rgba(255,255,255,0.6)';
                        resetBtn.style.color = 'white';
              });
              resetBtn.addEventListener('mouseleave', function() {
                        resetBtn.style.borderColor = 'rgba(255,255,255,0.3)';
                        resetBtn.style.color = 'rgba(255,255,255,0.6)';
              });
      }

      if(document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                        moveInfoBox();
                        fixResetBtn();
              });
      } else {
              setTimeout(function() { moveInfoBox(); fixResetBtn(); }, 200);
      }
   }

})();
