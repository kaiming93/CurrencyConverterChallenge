import React from "react";
import { ISelectProps } from "./ISelect";

const Input: React.FC<ISelectProps> = (props: any) => {
  return (
    <select title={props.title} onChange={(event) => props.setValue(event?.target.value)}>
      {props.options.map((element: any, index: number) => {
        return (
          <option tabIndex={0} key={index} value={element[0]}>
            {element[0]}/{element[1]}
          </option>
        );
      })}
    </select>
  );
};

export default Input;
