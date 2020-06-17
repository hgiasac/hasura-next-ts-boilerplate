import * as React from "react";
import { useDispatch } from "react-redux";
import { useI18n } from "../../hooks";
import { actionUnauthenticate } from "../../../store/global/actions";
import { authProvider } from "../../auth";

const defaultClass = "cursor-pointer";
type Props = {

};
export const LogoutLink = ({ className, ...props }: React.LinkHTMLAttributes<Props>): JSX.Element => {
  const i18n = useI18n();
  const dispatch = useDispatch();

  const onClick = (): void => {
    void authProvider.logout()
      .then(() => dispatch(actionUnauthenticate));
  };

  return (
    <a className={`${defaultClass} ${className || ""}`} onClick={onClick} {...props}>
      {i18n.t("general.logout")}
    </a>
  );
};
