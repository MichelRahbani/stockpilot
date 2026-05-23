(function(){
  var KEY = 'stockPilot.educationalNoticeSeen';

  // If already seen (localStorage), hide immediately before it even flashes
  if(localStorage.getItem(KEY) === 'true'){
    var style = document.createElement('style');
    style.textContent = '#educationalOverlay{display:none!important}';
    document.head.appendChild(style);
  }

  // Patch the accept button to use localStorage instead of sessionStorage
  function patchModal(){
    var btn = document.getElementById('acceptEducationalNoticeButton');
    var overlay = document.getElementById('educationalOverlay');
    if(!btn || !overlay) return;

    // If already seen, hide it now
    if(localStorage.getItem(KEY) === 'true'){
      overlay.hidden = true;
      return;
    }

    // Replace click handler to save to localStorage
    var newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', function(){
      localStorage.setItem(KEY, 'true');
      overlay.hidden = true;
    });

    // Also patch clicking outside the modal
    overlay.addEventListener('click', function(e){
      if(e.target === overlay){
        localStorage.setItem(KEY, 'true');
        overlay.hidden = true;
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', patchModal);
  } else {
    setTimeout(patchModal, 100);
  }
})();
