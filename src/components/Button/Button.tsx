import React from "react";
import { IButtonProps } from "./IButton";
import Image from "../Image/Image";

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  return <button data-testid="button" className={props.className} onClick={props.clickFunc} onKeyDown={props.keyDown} title={props.title}>{props.logo && <Image src={props.logo} alt={props.logoAlt}/>}{props.text}</button>;
};

export default Button;
