import React from "react";
import { IErrorProps } from "./IError";

const Error: React.FC<IErrorProps> = (props: IErrorProps) => {
  return <div data-testid="error" className="error"><p>{props.errorMsg}</p></div>;
};

export default Error;