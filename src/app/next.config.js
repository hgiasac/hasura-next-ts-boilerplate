// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const env = require("./env");
const withPWA = require('next-pwa')

const config = {
  env,
  distDir: "../../dist/functions/next",
  pwa: {
    dest: "public",
    register: true,
    // skipWaiting: false
  },
  webpack: (config, { dev }) => {
    const eslintRule = {
      test: /\.tsx?$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    config.module.rules = [].concat(eslintRule, config.module.rules);

    return config;
  }
}
module.exports = process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? withPWA(config) : config;
