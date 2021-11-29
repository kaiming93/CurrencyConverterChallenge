import React from "react";
import { IInputProps } from "./IInput";
import Error from '../Error/Error'

const Input: React.FC<IInputProps> = (props: any) => {
  const preventInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let reg = new RegExp('[0-9]');
    console.log(e.key)
    !reg.test(e.key) && !(e.key === "Backspace" || e.key === "Tab" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault();
    //(e.currentTarget.value.indexOf('.') === 0) && (e.key === '.') && e.preventDefault();
  }
  return (
    <div className="input">
      {props.label && <label>{props.label}</label>}
      <input
        type="text"
        onChange={(event) => props.setValue(event.target.value)}
        onKeyDown={(event) => {
          props.type === "number" && preventInvalidChar(event);
          event.key === "Enter" && props.triggerFunc()
        }}
        title={props.title}
        maxLength={props.maxLength}
      />
      {props.value === undefined && <Error errorMsg="Please enter a value"/>}
    </div>
  );
};

export default Input;
