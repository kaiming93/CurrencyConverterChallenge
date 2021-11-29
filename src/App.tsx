import React from "react";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Button from "./components/Button/Button";
import { getRates, getCountries } from "./service/api";

const App = () => {
  const [rates, setRates] = React.useState<any>([]);
  const [countries, setCountries] = React.useState<any>([]);
  const [amount, setAmount] = React.useState<number|undefined|"">("");
  const [previousAmount, setPreviousAmount] = React.useState<any>(undefined);
  const [previousResult, setPreviousResult] = React.useState<any>(undefined);
  const [firstCountry, setFirstCountry] = React.useState<any>('GBP');
  const [secondCountry, setSecondCountry] = React.useState<any>('EUR');
  const [result, setResult] = React.useState<any>(undefined);
  const calculateResult = () => {
    let result = Number(amount) * Number(rates.rates[secondCountry])/Number(rates.rates[firstCountry])
    if (amount === ""){
      setAmount(undefined)
    } else {
      setPreviousAmount(amount);
      setPreviousResult(result.toFixed(2));
      setResult(result.toFixed(2));
    }
  };
  React.useEffect(() => {
    getRates(setRates);
    getCountries(setCountries);
  }, []);
  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <Input title="input" type="number" value={amount} maxLength={10} setValue={setAmount} label="Your currency amount"/>
      <Select title="select" defaultValue={firstCountry} setValue={setFirstCountry} options={countries} />
      <Select title="select" defaultValue={secondCountry} setValue={setSecondCountry} options={countries} />
      <Button
        title="Calculate"
        clickFunc={calculateResult}
      />
      {result && (
        <div>
          <h2>{Number(previousAmount)} {firstCountry} equals {previousResult} {secondCountry}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
