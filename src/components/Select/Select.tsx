import React from "react";
import { ISelectProps } from "./ISelect";

const Input: React.FC<ISelectProps> = (props: any) => {
  return (
    <div className="custom-select">
      <select  title={props.title} value={props.defaultValue} onChange={(event) => props.setValue(event?.target.value)}>
      {props.options.map((element: any, index: number) => {
        return (
          <option tabIndex={0} key={index} value={element[0]}>
            {element[0]}/{element[1]}
          </option>
        );
      })}
    </select>
    </div>
  );
};

export default Input;
