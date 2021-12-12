import React from "react";
import { IInputProps } from "./IInput";
import Error from "../Error/Error";

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  const preventInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let reg = new RegExp("[0-9.]");
    !reg.test(e.key) &&
      !(
        e.key === "Backspace" ||
        e.key === "Tab" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
      ) &&
      e.preventDefault();
  };
  const searchFunc = (event: any) => {
    let newArr = props.options && props.options.filter((array: any) => {
      if (
        String(array[0])
          .toLowerCase()
          .includes(String(event.target.value).toLowerCase()) ||
        String(array[1])
          .toLowerCase()
          .includes(String(event.target.value).toLowerCase())
      ) {
        return true;
      }
    });
    props.setFilteredOptions && props.setFilteredOptions(newArr);
  };
  return (
    <div className={`input ${props.className}`} data-testid="input">
      {props.label && <label htmlFor={props.title}>{props.label}</label>}
      <input
        data-testid="input-tag"
        type={props.type === "number"?"text":props.type}
        onChange={
          props.type !== "search"
            ? (event) => props.setValue && props.setValue(event.target.value)
            : (event) => searchFunc(event)
        }
        name={props.title}
        title={props.title}
        onKeyDown={(event) => {
          props.type === "number" && preventInvalidChar(event);
          event.key === "Enter" && props.triggerFunc && props.triggerFunc(event);
        }}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
      />
      {props.value === undefined && props.error? (
        <Error errorMsg="Please enter a value" />
      ): isNaN(props.value) && props.error?(
        <Error errorMsg={`${props.value} isn't a valid number`} />
      ):""}
    </div>
  );
};

export default Input;
