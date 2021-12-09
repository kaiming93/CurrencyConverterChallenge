import React from "react";
import { IButtonProps } from "./IButton";
import Image from "../Image/Image";

const Button: React.FC<IButtonProps> = (props: any) => {
  return <button data-testid="button" className={`button ${props.className}`} onClick={props.clickFunc}>{props.logo && <Image src={props.logo} width="30px"/>}{props.title}</button>;
};

export default Button;
