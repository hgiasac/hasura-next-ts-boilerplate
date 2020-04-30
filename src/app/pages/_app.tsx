/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
/* eslint-disable import/named */
import * as React from "react";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "../styles/tailwind.css";
import App, { AppInitialProps, AppContext } from "next/app";
import { END } from "redux-saga";
import { reduxWrapper } from "../store";
import { I18n } from "../shared/vendor/i18n";
import ConnectedLayout from "../shared/components/Layout/ConntectedLayout";

class WrappedApp extends App<AppInitialProps> {
  public static readonly getInitialProps = async ({ Component, ctx }: AppContext): Promise<any> => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      const store = (ctx as any).store;
      await store.sagaTask.toPromise();
    }

    // 3. Return props
    return {
      pageProps
    };
  };

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
        <ConnectedLayout>
          <Component {...pageProps} />
        </ConnectedLayout>
      </I18n>
    );
  }
}

export default reduxWrapper.withRedux(WrappedApp);
