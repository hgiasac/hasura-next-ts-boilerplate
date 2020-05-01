/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
function assertEnv(value: string | undefined, key: string): string {

  if (value) {
    return value;
  }

  throw new Error(`Environment ${key} doesn't exist`);
}

const DATA_SCHEME = process.env.DATA_SCHEME || "http";
const DATA_DOMAIN = assertEnv(process.env.DATA_DOMAIN, "DATA_DOMAIN");
const WS_SCHEME = DATA_SCHEME === "https" ? "wss" : "ws";

export const Config = {
  httpDataHost: `${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  wsDataHost: `${WS_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  hasuraClientName: process.env.HASURA_CLIENT_NAME,
  version: process.env.VERSION,
  debug: process.env.NODE_ENV !== "production",
  firebase: {
    apiKey: assertEnv(process.env.FIREBASE_API_KEY, "FIREBASE_API_KEY"),
    authDomain: assertEnv(process.env.FIREBASE_AUTH_DOMAIN, "FIREBASE_AUTH_DOMAIN"),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: assertEnv(process.env.FIREBASE_PROJECT_ID, "FIREBASE_PROJECT_ID"),
    storageBucket: assertEnv(process.env.FIREBASE_STORAGE_BUCKET, "FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: assertEnv(process.env.FIREBASE_APP_ID, "FIREBASE_APP_ID"),
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }
};
