import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-solid'],
  manifest: {
      browser_specific_settings: {
          gecko: {
              id: "@mesalilac.steam-to-fitgirl"
          }
      }
  }
});
