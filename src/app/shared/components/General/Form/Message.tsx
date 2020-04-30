import * as React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  readonly message: string
};

const ErrorMessage: React.FunctionComponent<Props> = ({ className, message, ...props }) => {

  const spanClass = className || "text-error";

  return (
    <span className={spanClass} {...props}>
      {message}
    </span>
  );
};

export default ErrorMessage;
