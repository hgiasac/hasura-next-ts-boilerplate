import { useContext, useEffect } from "react";
import { initializeYupForm } from "./vendor/yup";
import i18n, { I18nState, I18nContext } from "./vendor/i18n";
import { withAuthProvider, AuthUser } from "./auth";
import { createApolloHook } from "./vendor/withApollo";
import { useSelector } from "react-redux";
import { AppState } from "../store/types";
import Router from "next/router";
import { ROUTES } from "./routes";

export const useYupForm = initializeYupForm({ i18n });

export function useI18n(): I18nState {
  return useContext(I18nContext);
}

export const withApollo = createApolloHook(withAuthProvider());

export const useUser = (): AuthUser => {

  const user = useSelector((state: AppState) => state.global.authUser);
  const hasUser = !!user;

  useEffect(() => {
    if (hasUser) {
      Router.push(ROUTES.home.path);
    }

  }, [hasUser]);

  return <AuthUser>user;
};
