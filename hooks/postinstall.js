
/* IMPORT */

import fs from 'node:fs/promises';
import path from 'node:path';

/* MAIN */

const postinstall = async variables => {

  let manifestJSON = await fs.readFile ( path.join ( process.cwd (), 'manifest.json' ), 'utf8' );
  let manifest = JSON.parse ( manifestJSON );
  let viteTS = await fs.readFile ( path.join ( process.cwd (), 'vite.ts' ), 'utf8' );

  if ( !variables.hasAction ) {

    manifest.action.default_title = undefined;
    manifest.action.default_icon = undefined;

  }

  if ( !variables.hasBackground ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'background' ), { recursive: true } );

    manifest.background = undefined;
    viteTS = viteTS.replace ( /^\s*background:.*\n/gm, '' );

  }

  if ( !variables.hasContent ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'content' ), { recursive: true } );

    manifest.content_scripts = undefined;
    viteTS = viteTS.replace ( /^\s*contentAll:.*\n/gm, '' );

  }

  if ( !variables.hasDevtools ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'devtools' ), { recursive: true } );
    await fs.rm ( path.join ( process.cwd (), 'src', 'panel' ), { recursive: true } );

    manifest.devtools_page = undefined;
    manifest.panel_page = undefined;
    viteTS = viteTS.replace ( /^\s*devtools:.*\n/gm, '' );
    viteTS = viteTS.replace ( /^\s*panel:.*\n/gm, '' );

  }

  if ( !variables.hasNewtab ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'newtab' ), { recursive: true } );

    manifest.chrome_url_overrides = undefined;
    viteTS = viteTS.replace ( /^\s*newtab:.*\n/gm, '' );

  }

  if ( !variables.hasOptions ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'options' ), { recursive: true } );

    manifest.options_page = undefined;
    viteTS = viteTS.replace ( /^\s*options:.*\n/gm, '' );

  }

  if ( !variables.hasPopup ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'popup' ), { recursive: true } );

    manifest.action.default_popup = undefined;
    viteTS = viteTS.replace ( /^\s*popup:.*\n/gm, '' );

  }

  if ( !variables.hasAction && !variables.hasPopup ) {

    manifest.action = undefined;

  }

  if ( !variables.hasSidepanel ) {

    await fs.rm ( path.join ( process.cwd (), 'src', 'sidepanel' ), { recursive: true } );

    manifest.side_panel = undefined;
    viteTS = viteTS.replace ( /^\s*sidepanel:.*\n/gm, '' );

  }

  await fs.writeFile ( path.join ( process.cwd (), 'manifest.json' ), JSON.stringify ( manifest, null, 2 ) );
  await fs.writeFile ( path.join ( process.cwd (), 'vite.ts' ), viteTS );

};

/* EXPORT */

export default postinstall;
