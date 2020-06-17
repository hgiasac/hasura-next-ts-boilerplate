import * as React from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { LoginForm } from "../../shared/components/auth/LoginForm";
import { Layout } from "../../shared/components/layout/Layout";
import { ROUTES } from "../../shared/routes";
import { useI18n } from "../../shared/hooks";
import { AppState } from "../../store/types";

const LoginPage = (): JSX.Element | null => {

  const titleKey = "pageTitle.login";
  const i18n = useI18n();
  const isAuthenticated = useSelector((state: AppState) => state.global.isAuthenticated);

  if (isAuthenticated) {
    void Router.replace(ROUTES.home.path);

    return null;
  }

  return (
    <Layout title={i18n.t(titleKey)}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4">
          {i18n.t(titleKey)}
        </h1>
        <LoginForm onSubmit={() => Router.push(ROUTES.home.path)} />
      </div>
    </Layout>
  );
};

export default LoginPage;
