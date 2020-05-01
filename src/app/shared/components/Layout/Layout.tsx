import Head from "next/head";
import * as React from "react";
import Footer from "./Footer";
import Headers from "./Header";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/types";
import SplashScreen from "./SplashScreen";

type Props = {
  readonly title?: string
};

const layoutClassName = "min-h-screen flex flex-col justify-between";

export const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => {

  const initialLoading = useSelector((state: AppState) => state.global.initialLoading);

  return !initialLoading ? (
    <div className={layoutClassName}>
      <Head>
        <title>{title}</title>
      </Head>
      <Headers />
      {children}
      <Footer />
    </div>
  ) : <SplashScreen />;
};
