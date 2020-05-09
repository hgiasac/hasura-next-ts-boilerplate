import * as React from "react";
import Router from "next/router";
import Link from "next/link";
import { RegisterForm } from "../../shared/components/Auth/RegisterForm";
import { Layout } from "../../shared/components/Layout/Layout";
import { ROUTES } from "../../shared/routes";
import { useI18n, useUser } from "../../shared/hooks";

const RegisterPage = (): JSX.Element | null => {

  const titleKey = "pageTitle.register";
  const i18n = useI18n();
  const user = useUser();

  return !user ? (
    <Layout title={i18n.t(titleKey)}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
          <h1 className="mb-4">
            {i18n.t(titleKey)}
          </h1>
          <RegisterForm onSubmit={() => Router.push(ROUTES.home.path)} />
          <div className="w-full flex justify-between mt-4">
            <Link href={ROUTES.login.path}>
              <a>{i18n.t("message.loginBacklink")}</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  ) : null;
};

export default RegisterPage;
