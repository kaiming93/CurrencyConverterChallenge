import React from "react";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Button from "./components/Button/Button";
import Counter from "./components/Counter/Counter";
import { getRates, getCountries } from "./service/Api";
import logo from './img/swap.svg'

const CurrencyConverter = () => {
  const [counter, setCounter] = React.useState<number>(600);
  const [rates, setRates] = React.useState<any>(undefined);
  const [countries, setCountries] = React.useState<Array<JSX.Element | any>>([]);
  const [previousAmount, setPreviousAmount] = React.useState<number|undefined|"">(undefined);
  const [amount, setAmount] = React.useState<number|undefined|"">("");
  const [previousCountry, setPreviousCountry] = React.useState<Array<JSX.Element | any>>([{key:'GBP', name:'GBP/British Pound Sterling'},{key:'EUR',name:'EUR/Euro'}]);
  const [country, setCountry] = React.useState<Array<JSX.Element | any>>([{key:'GBP', name:'GBP/British Pound Sterling'},{key:'EUR',name:'EUR/Euro'}]);
  const [selectState, setSelectState] = React.useState<Array<boolean>>([false, false]);
  const [previousResult, setPreviousResult] = React.useState<string|undefined>(undefined);
  const [result, setResult] = React.useState<string|undefined>(undefined);
  const calculateResult = (event:any) => {
    if (amount === ""){
      setAmount(undefined)
    } if (!amount || isNaN(amount)) {
      event.preventDefault()
    } else {
      let result = Number(amount) * Number(rates[country[1].key])/Number(rates[country[0].key])
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
    let isMounted = true;
    getCountries(setCountries, isMounted);  
    getRates(setRates, isMounted);
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div data-testid="currency-converter" className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="currency-converter__input">
      <Input title="converter input" error={true} type="number" value={amount} maxLength={20} setValue={setAmount} label="Your currency amount" triggerFunc={calculateResult}/>
      <Button
        logo={logo}
        clickFunc={swapSelect}
        className="button swap"
        title="Swap Currency"
        logoAlt="Swap Currency logo"
      />   
      </div>
      <Select index={0} title="select" value={country} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} rates={rates}/>
      <Select index={1} title="select" value={country} setValue={setCountry} selectState={selectState} setSelectState={setSelectState} options={countries} rates={rates}/>
      <Button
        title="Convert currency"
        text="Calculate"
        clickFunc={calculateResult}
        className="button calculate"
      />
      {rates && <div className="rates" data-testid="rates"><p>{(Number(rates[country[0].key])/Number(rates[country[0].key]))} {country[0].key} = {(Number(rates[country[1].key])/Number(rates[country[0].key])).toFixed(10)} {country[1].key}</p></div>}
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
