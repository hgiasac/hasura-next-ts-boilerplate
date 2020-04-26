import * as functions from "firebase-functions";
import next from "next";
import nextI18NextMiddleware from "next-i18next/middleware";
import express, { Request, Response } from "express";
import nextI18n from "../app/shared/i18n";

const eApp = express();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest(async (req: Request, res: Response) => {
  console.log("File: " + req.originalUrl);
  app.prepare();
  await nextI18n.initPromise

  eApp.use(nextI18NextMiddleware(nextI18n))
  eApp.get("*", (_req, _res) => handle(_req, _res));

  return eApp(req, res);
});
