const path = require("path");
const wp = require("@cypress/webpack-preprocessor");

const webpackOptions = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@app": path.resolve(__dirname, "../../../src/app")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};

module.exports = webpackOptions;
