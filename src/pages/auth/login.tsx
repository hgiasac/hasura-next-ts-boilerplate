import * as React from "react";
import Router from "next/router";
import Link from "next/link";
import { LoginForm } from "../../shared/components/auth/LoginForm";
import { Layout } from "../../shared/components/layout/Layout";
import { ROUTES } from "../../shared/routes";
import { useI18n, useUser } from "../../shared/hooks";

const LoginPage = (): JSX.Element | null => {

  const titleKey = "pageTitle.login";
  const i18n = useI18n();
  const user = useUser();

  return !user ? (
    <Layout title={i18n.t(titleKey)}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
          <h1 className="mb-4">
            {i18n.t(titleKey)}
          </h1>
          <LoginForm onSubmit={() => Router.push(ROUTES.home.path)} />
          <div className="w-full flex justify-between mt-4">
            <Link href={ROUTES.resetPassword.path}>
              <a>{i18n.t("pageTitle.resetPassword")}</a>
            </Link>
            <Link href={ROUTES.register.path}>
              <a>{i18n.t("pageTitle.register")}</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  ) : null;
};

export default LoginPage;
