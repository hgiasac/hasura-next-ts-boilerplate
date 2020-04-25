import Head from "next/head";
import * as React from "react";
import Footer from "./Footer";
import Headers from "./Header";

type Props = {
  title?: string
};

const layoutClassName = "min-h-screen flex flex-col justify-between";

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
    <div className={layoutClassName}>
      <Head>
        <title>{title}</title>
      </Head>
      <Headers />
      {children}
      <Footer />
    </div>
  );

export default Layout;
