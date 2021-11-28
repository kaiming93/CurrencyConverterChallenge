import React from 'react';
import { IInputProps } from './IInput';

const Input: React.FC<IInputProps> = (props:any) => {
    return (
        <input type="text" onChange={(event) => props.setValue(event.target.value)} title={props.title}/>
    )
  }

  export default Input;