import React from 'react';
import { IInputProps } from './IInput';

const Input: React.FC<IInputProps> = (props:any) => {
    return (
        <input title={props.title}/>
    )
  }

  export default Input;