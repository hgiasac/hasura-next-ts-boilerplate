import * as React from "react";
import { LoginForm } from "../../shared/components/Auth/LoginForm";
import { Layout } from "../../shared/components/Layout/Layout";

const LoginPage = (): JSX.Element => (
  <Layout title="Login page">
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4">Login</h1>
      <LoginForm />
    </div>
  </Layout>
);

export default LoginPage;
