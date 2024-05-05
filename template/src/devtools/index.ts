
/* INIT */

try {

  chrome.devtools.panels.create ( '{{displayName}}', './resources/icon/icon-64.png', './src/panel/index.html' );

} catch ( error: unknown ) {

  console.error ( error );

}
