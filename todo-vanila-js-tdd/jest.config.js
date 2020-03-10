const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  setupFiles: ['./config/jest/localstorage.js']
}