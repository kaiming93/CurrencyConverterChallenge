import React from "react";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Button from "./components/Button/Button";
import Counter from "./components/Counter/Counter";
import { getRates, getCountries } from "./service/Api";
import logo from './img/swap.svg'

const CurrencyConverter = () => {
  const [counter, setCounter] = React.useState<number>(600);
  const [rates, setRates] = React.useState<any>([]);
  const [countries, setCountries] = React.useState<any>([]);
  const [previousAmount, setPreviousAmount] = React.useState<number|undefined|"">(undefined);
  const [amount, setAmount] = React.useState<number|undefined|"">("");
  const [previousCountry, setPreviousCountry] = React.useState<any>([{key:'GBP', name:'GBP/British Pound Sterling'},{key:'EUR',name:'EUR/Euro'}]);
  const [country, setCountry] = React.useState<any>([{key:'GBP', name:'GBP/British Pound Sterling'},{key:'EUR',name:'EUR/Euro'}]);
  const [selectState, setSelectState] = React.useState<Array<boolean>>([false, false]);
  const [previousResult, setPreviousResult] = React.useState<string|undefined>(undefined);
  const [result, setResult] = React.useState<string|undefined>(undefined);
  const calculateResult = (event:any) => {
    let result = Number(amount) * Number(rates.rates[country[1].key])/Number(rates.rates[country[0].key])
    if (amount === ""){
      setAmount(undefined)
    } if (!amount || isNaN(amount)) {
      event?.preventDefault()
    } else {
      setCounter(600);
      setPreviousCountry(country)
      setPreviousAmount(amount);
      setPreviousResult(result.toFixed(2));
      setResult(result.toFixed(2));
    }
  };
  const swapSelect = () => {
    setCountry([country[1],country[0]])
  }
  React.useEffect(() => {
    getRates(setRates);
    getCountries(setCountries);
  }, []);
  return (
    <div data-testid="currency-converter" className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="currency-converter__input">
      <Input title="input" error={true} type="number" value={amount} maxLength={20} setValue={setAmount} label="Your currency amount" triggerFunc={calculateResult}/>
      <Button
        logo={logo}
        clickFunc={swapSelect}
        className="swap"
      />   
      </div>
      <Select index={0} title="select" value={country} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
      <Select index={1} title="select" value={country} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
      <Button
        title="Calculate"
        clickFunc={calculateResult}
        className="calculate"
      />
      {result && (
        <div>
          <h2>{Number(previousAmount)} {previousCountry[0].key} equals {previousResult} {previousCountry[1].key}</h2>
          <Counter title="counter" counter={counter} setCounter={setCounter} setResult={setResult}/>
        </div>
        
      )}
    </div>
  );
};

export default CurrencyConverter;
