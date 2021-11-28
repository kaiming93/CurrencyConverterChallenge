import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";

export const App = () => {
  const handleClick = (event:any) => { console.log(event, "click") };
  return (
    <div>
      <h1>Currency Converter</h1>
      <Input title="input" />
      <Button title="button" clickFunc={(event:any) => handleClick(event)} />
    </div>
  );
};
