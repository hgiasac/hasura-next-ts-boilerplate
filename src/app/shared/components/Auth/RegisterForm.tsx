import * as React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { Input } from "../General/Form";
import { useI18n, useYupForm } from "../../hooks";
import { actionAuthenticate } from "../../../store/global/actions";
import { withAuthProvider } from "../../auth";
import { ErrorMessage } from "../General/Form/Message";

type RegisterFormValues = {
  readonly email: string
  readonly password: string
  readonly firstName: string
  readonly lastName: string
};

type RegisterFormProps = {
  readonly onSubmit: () => void
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6),
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

const RegisterFormInternal: React.FunctionComponent<RegisterFormProps> = ({
  onSubmit
}) => {

  const i18n = useI18n();
  const apolloClient = useApolloClient();

  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { register, handleSubmit, errors } = useYupForm<RegisterFormValues>({
    validationSchema: schema
  });

  const dispath = useDispatch();
  const onSuccess = (values: RegisterFormValues): void => {
    setSubmitting(true);
    withAuthProvider({ apolloClient }).register(values)
      .then((user) => {
        setSubmitting(false);
        dispath(actionAuthenticate(user));
        onSubmit();
      }).catch((err) => {
        console.error(err);

        setSubmitting(false);

        switch (err.code) {
          case "auth/email-already-in-use":
            setErrorMessage(i18n.t("messsage.existedEmail"));
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
          placeholder={i18n.t("general.email")}
          disabled={submitting}
        />
        <Input
          className="textbox"
          name="password"
          type="password"
          ref={register}
          errors={errors}
          placeholder={i18n.t("general.password")}
          disabled={submitting}
        />
        <Input
          className="textbox"
          name="firstName"
          ref={register}
          errors={errors}
          placeholder={i18n.t("general.firstName")}
          disabled={submitting}
        />
        <Input
          className="textbox"
          name="lastName"
          ref={register}
          errors={errors}
          placeholder={i18n.t("general.lastName")}
          disabled={submitting}
        />
        <input
          className="primary w-full"
          type="submit"
          value="Submit"
          disabled={submitting}
        />
      </form>
      {errorMessage ? (
        <div className="mt-2">
          <ErrorMessage message={errorMessage} />
        </div>
      ) : ""}
    </div>

  );

};

export const RegisterForm = RegisterFormInternal;
