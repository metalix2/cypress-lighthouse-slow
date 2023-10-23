/* eslint-disable no-param-reassign */
const { fetchBrowser, lighthouse } = require('./lighthouse');

module.exports = (on, config) => {
    on('before:browser:launch', (browser, launchOptions) => {
      // define the chromeport to be used.
      fetchBrowser(launchOptions);
      launchOptions.args.push(`--auto-open-devtools-for-tabs`);
      return launchOptions;
    });

    on('task', {
      lighthouse(args = {}) {
        return lighthouse(args);
      },
    });

    return config;
  };
