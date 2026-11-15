/* Learn workspace: put the blue section row first on the page, right under the site menu, like Budget. */
(function () {
  var ws = document.querySelector('main.app-shell > .workspace');
  var row = document.querySelector('nav.learning-area-tabs');
  if (ws && row) ws.insertBefore(row, ws.firstChild);
})();
