import * as React from "react";
import { Layout } from "@shared/components/Layout/Layout";

const About = (): JSX.Element => (
  <Layout title="About">
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold my-8 p-3 text-lg md:text-2xl">
        About page
      </h2>
    </div>
  </Layout>
);

export default About;
