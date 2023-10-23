
const setupNodeEvents = require('./cypress/plugins/index');

module.exports = {
  e2e: {
    setupNodeEvents,
  },
  // chromeWebSecurity: false,
}
