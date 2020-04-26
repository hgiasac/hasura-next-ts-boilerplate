/* eslint-disable functional/no-class */
import * as React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

  readonly render = (): JSX.Element => (
    <Html className="antialiased">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html >
  );
}

export default MyDocument;
