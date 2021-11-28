import React from "react";
import { IButtonProps } from "./IButton";

const Button: React.FC<IButtonProps> = (props: any) => {
  return <button className="button" onClick={props.clickFunc}>{props.title}</button>;
};

export default Button;
