import React from "react";
import { IInputProps } from "./IInput";
import Error from "../Error/Error";

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  let reg = /^[0-9.]*$/;
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
      <div className="input_outline">
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
          event.key === "Enter" && props.triggerFunc && props.triggerFunc(event);
        }}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
      />  
      </div>
      {props.value === undefined && props.error? (
        <Error errorMsg="Please enter a value" />
      ): props.value !== "" && (!reg.test(props.value) || isNaN(props.value)) && props.error?(
        <Error errorMsg={`${props.value} isn't a valid number`} />
      ):""}
    </div>
  );
};

export default Input;
