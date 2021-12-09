import React from "react";
import { IButtonProps } from "./IButton";
import Image from "../Image/Image";

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  return <button data-testid="button" className={props.className} onClick={props.clickFunc} onKeyDown={props.keyDown}>{props.logo && <Image src={props.logo} width={props.logoWidth?props.logoWidth:"100%"}/>}{props.title}</button>;
};

export default Button;
