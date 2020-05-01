/* eslint-disable @typescript-eslint/no-misused-promises */
import * as functions from "firebase-functions";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

export const nextApp = functions.https
  .onRequest((req: functions.Request, res: functions.Response): Promise<void> => {
    console.log(`File: ${req.originalUrl}`);

    return app.prepare().then(() => handle(req, res));
  });
