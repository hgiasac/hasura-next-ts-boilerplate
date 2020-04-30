import * as React from "react";
import { useDispatch } from "react-redux";
import { useI18n } from "../../hooks";
import { actionUnauthenticate } from "../../../store/global/actions";
import { authProvider } from "../../auth";

const defaultClass = "cursor-pointer";
export const LogoutLink = ({ className, ...props }: React.LinkHTMLAttributes<{}>): JSX.Element => {
  const i18n = useI18n();
  const dispatch = useDispatch();

  const onClick = (): void => {
    authProvider.logout()
      .then(() => dispatch(actionUnauthenticate));
  };

  return (
    <a className={`${defaultClass} ${className}`} onClick={onClick} {...props}>
      {i18n.t("general.logout")}
    </a>
  );
};
