
/* IMPORT */

import fs from 'node:fs/promises';
import {defineConfig} from 'vite';
import voby from 'voby-vite';
import manifest from './manifest.json';

/* MAIN */

const config = defineConfig ({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        background: manifest.background.page,
        contentAll: manifest.content_scripts[0].ts[0],
        devtools: manifest.devtools_page,
        options: manifest.options_page,
        newtab: manifest.chrome_url_overrides.newtab,
        panel: manifest.panel_page,
        popup: manifest.action.default_popup,
        sidepanel: manifest.side_panel.default_path
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [
    voby (),
    {
      name: 'copy:assets',
      buildEnd: async () => {
        await fs.mkdir ( 'dist/resources/icon', { recursive: true } );
        await fs.cp ( 'resources/icon', 'dist/resources/icon', { recursive: true } );
        await fs.cp ( 'manifest.json', 'dist/manifest.json' );
      }
    }
  ]
});

/* EXPORT */

export default config;
