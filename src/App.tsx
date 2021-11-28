import React from 'react';
import axios from 'axios';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import { getRates, getCountries } from './service/api'

const App = () => {
  const defaultRates:any = [];
  const defaultCountries:any = [];
  const handleClick = (event:any) => { console.log(event, "click") };
  const [rates, setRates] = React.useState(defaultRates);
  const [countries, setCountries] = React.useState(defaultCountries);

React.useEffect(() => {
  getRates(setRates);
  getCountries(setCountries);
  }, []);
  return (
    <div>
      <h1>Currency Converter</h1>
      <Input title="input" />
      <Button title="button" clickFunc={(event:any) => handleClick(event)} />
    </div>
  );
};

export default App;
