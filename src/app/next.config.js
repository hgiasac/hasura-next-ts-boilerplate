// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const env = require("./env");

module.exports = {
  env,
  distDir: "../../dist/functions/next",
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
