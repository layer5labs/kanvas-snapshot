const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'nn4zww',
  env: {
    token: '',
    releasetag: '',
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://sturdy-eureka-w4x6qv49rr4h96r4-9081.app.github.dev',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  }
})