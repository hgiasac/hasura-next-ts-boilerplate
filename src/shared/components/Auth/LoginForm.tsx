import * as React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { Input } from "../General/Form";
import { useI18n, useYupForm } from "../../hooks";
import { actionAuthenticate } from "../../../store/global/actions";
import { withAuthProvider } from "../../auth";
import { auth } from "firebase";
import { ErrorMessage } from "../General/Form/Message";

type LoginData = {
  readonly email: string
  readonly password: string
};

type LoginFormProps = {
  readonly onSubmit: () => void
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6)
});

const LoginFormInternal: React.FunctionComponent<LoginFormProps> = ({
  onSubmit
}) => {

  const i18n = useI18n();
  const apolloClient = useApolloClient();

  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { register, handleSubmit, errors } = useYupForm<LoginData>({
    validationSchema: schema
  });

  const dispath = useDispatch();
  const onSuccess = (values: LoginData): void => {
    setSubmitting(true);

    void withAuthProvider({ apolloClient }).login({
      email: values.email,
      password: values.password
    }).then((user) => {
      setSubmitting(false);
      dispath(actionAuthenticate(user));
      onSubmit();
    }).catch((err: auth.Error) => {

      setSubmitting(false);

      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage(i18n.t("messsage.wrongPassword"));
          break;
        default:
          setErrorMessage(err.message);
      }
    });

  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSuccess)}>
        <Input
          className="textbox"
          name="email"
          type="email"
          ref={register}
          errors={errors}
          disabled={submitting}
          placeholder={i18n.t("general.email")}
        />
        <Input
          className="textbox"
          name="password"
          type="password"
          ref={register}
          errors={errors}
          disabled={submitting}
          placeholder={i18n.t("general.password")}
        />
        <input className="primary w-full" type="submit" value="Submit" />
      </form>
      {errorMessage ? (
        <div className="mt-2">
          <ErrorMessage message={errorMessage} />
        </div>
      ) : ""}
    </div>
  );

};

export const LoginForm = LoginFormInternal;
