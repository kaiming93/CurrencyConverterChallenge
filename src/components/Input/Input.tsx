import React from "react";
import { IInputProps } from "./IInput";
import Error from "../Error/Error";

const Input: React.FC<IInputProps> = (props: any) => {
  const preventInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let reg = new RegExp("[0-9]");
    console.log(e.key);
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
  const searchFunc = (event:any) => {
    let newArr = props.options.filter((array:any) => {
        if (String(array[0]).toLowerCase().includes(String(event.target.value).toLowerCase()) || String(array[1]).toLowerCase().includes(String(event.target.value).toLowerCase())){
          return true;
        }
    })
    props.setFilteredOptions(newArr)
  };
  return (
    <div className="input">
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type}
        onClick={(event) => props.clickFunc && props.clickFunc(event)}
        onChange={
          props.type !== "search"
            ? (event) => props.setValue(event.target.value)
            : (event) => searchFunc(event)
        }
        onKeyDown={(event) => {
          props.type !== "search" &&
            props.type === "number" &&
            preventInvalidChar(event);
          event.key === "Enter" && props.triggerFunc();
        }}
        title={props.title}
        maxLength={props.maxLength}
      />
      {props.value === undefined && props.error && (
        <Error errorMsg="Please enter a value" />
      )}
    </div>
  );
};

export default Input;
