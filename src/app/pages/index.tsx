import * as React from "react";
import { Layout } from "../shared/components/Layout/Layout";

const IndexPage = (): JSX.Element => (
  <Layout title="Home page">
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold my-8 p-3 text-lg md:text-2xl">
        Hi! Welcome to your first Next.js site.
      </h2>
    </div>
  </Layout>
);

export default IndexPage;
