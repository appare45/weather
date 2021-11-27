import React, { DOMAttributes } from "react";
interface Props extends DOMAttributes<HTMLButtonElement> {
  children: string;
  design?: "primary" | "secondary";
}
const Button = (props: Props): JSX.Element => (
  <button onClick={props.onClick} className={`bg-blue-100 px-2 py-1 rounded`}>
    {props.children}
  </button>
);

export default Button;
