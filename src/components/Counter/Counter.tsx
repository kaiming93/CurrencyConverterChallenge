import React from "react";
import { ICounterProps } from "./ICounter";

const Counter: React.FC<ICounterProps> = (props: any) => {
  React.useEffect(() => {
    props.counter === 0 && props.setResult(undefined);  
    const timerId = setInterval(() => props.setCounter(props.counter - 1), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div data-testid="counter" className="counter">
      Expire in {Math.floor(props.counter / 60) + ":" + (props.counter % 60 ? props.counter % 60 : '00')}
    </div>
  );
};

export default Counter;
