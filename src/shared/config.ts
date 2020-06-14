/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
function assertEnv(value: string | undefined, key: string): string {

  if (value) {
    return value;
  }

  throw new Error(`Environment ${key} doesn't exist`);
}

const DATA_SCHEME = process.env.NEXT_PUBLIC_DATA_SCHEME || "http";
const DATA_DOMAIN = assertEnv(process.env.NEXT_PUBLIC_DATA_DOMAIN, "NEXT_PUBLIC_DATA_DOMAIN");
const WS_SCHEME = DATA_SCHEME === "https" ? "wss" : "ws";

export const Config = {
  httpDataHost: `${DATA_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  wsDataHost: `${WS_SCHEME}://${DATA_DOMAIN}/v1/graphql`,
  version: process.env.NEXT_PUBLIC_VERSION,
  debug: process.env.NODE_ENV !== "production",
  hasuraClientName: process.env.NEXT_PUBLIC_HASURA_CLIENT_NAME,
  resetPasswordExpiry: process.env.NEXT_PUBLIC_RESET_PASSWORD_EXPIRY
    ? parseInt(process.env.NEXT_PUBLIC_RESET_PASSWORD_EXPIRY, 10) : 1,
  firebase: {
    apiKey: assertEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: assertEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: assertEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: assertEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: assertEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "NEXT_PUBLIC_FIREBASE_APP_ID")
  }
};
