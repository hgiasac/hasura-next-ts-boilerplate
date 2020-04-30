
/// <reference types="cypress" />
// const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const cypressReact = require('cypress-react-unit-test/plugins/load-webpack');

module.exports = (on, config) => {

  cypressReact(on, config);

  return config;
}
