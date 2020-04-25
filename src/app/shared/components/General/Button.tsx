import { ButtonHTMLAttributes, FunctionComponent } from "react";

export interface IIconButtonProps extends ButtonHTMLAttributes<{}> {
  icon: string;
}

export const IconButton: FunctionComponent<IIconButtonProps> = ({ icon, ...props }) => {
  return (
    <button {...props} >
      <i className={icon}></i>
    </button>
  );
};
