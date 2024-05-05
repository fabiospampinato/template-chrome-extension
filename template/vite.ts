
/* IMPORT */

import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
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
    viteStaticCopy ({
      targets: [
        {
          src: './resources',
          dest: '.'
        },
        {
          src: './manifest.json',
          dest: '.'
        }
      ]
    })
  ]
});

/* EXPORT */

export default config;
