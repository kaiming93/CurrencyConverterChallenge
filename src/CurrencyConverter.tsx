import React from "react";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Button from "./components/Button/Button";
import { getRates, getCountries } from "./service/Api";

const CurrencyConverter = () => {
  const [rates, setRates] = React.useState<any>([]);
  const [countries, setCountries] = React.useState<any>([]);
  const [previousAmount, setPreviousAmount] = React.useState<any>(undefined);
  const [amount, setAmount] = React.useState<number|undefined|"">("");
  const [previousCountry, setPreviousCountry] = React.useState<any>(['GBP','EUR']);
  const [country, setCountry] = React.useState<any>(['GBP','EUR']);
  const [selectState, setSelectState] = React.useState<Array<boolean>>([false, false]);
  const [previousResult, setPreviousResult] = React.useState<any>(undefined);
  const [result, setResult] = React.useState<any>(undefined);
  const calculateResult = (event:any) => {
    let result = Number(amount) * Number(rates.rates[country[1]])/Number(rates.rates[country[0]])
    if (amount === ""){
      setAmount(undefined)
    } if (!amount) {
      event?.preventDefault()
    } else {
      setPreviousCountry(country)
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
    <div data-testid="currency-converter" className="currency-converter">
      <h1>Currency Converter</h1>
      <Input title="input" error={true} type="number" value={amount} maxLength={20} setValue={setAmount} label="Your currency amount" triggerFunc={calculateResult}/>
      <Select index={0} title="select" value={country} defaultText={'GBP/British Pound Sterling'} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
      <Select index={1} title="select" value={country} defaultText={'EUR/Euro'} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
      <Button
        title="Calculate"
        clickFunc={calculateResult}
      />
      {result && (
        <div>
          <h2>{Number(previousAmount)} {previousCountry[0]} equals {previousResult} {previousCountry[1]}</h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
