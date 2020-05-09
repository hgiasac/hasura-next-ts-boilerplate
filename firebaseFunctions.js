/* eslint-disable @typescript-eslint/no-misused-promises */
const { join } = require("path");
const { https } = require("firebase-functions");
const { default: next } = require("next");

const isDev = process.env.NODE_ENV !== "production";
const nextjsDistDir = join("src", require("./src/next.config.js").distDir);

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir
  }
});
const nextjsHandle = nextjsServer.getRequestHandler();

// eslint-disable-next-line functional/immutable-data
exports.nextjsFunc = https.onRequest((req, res) => nextjsServer.prepare().then(() => nextjsHandle(req, res)));
