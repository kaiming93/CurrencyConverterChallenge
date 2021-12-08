import React from "react";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Button from "./components/Button/Button";
import { getRates, getCountries } from "./service/Api";

const CurrencyConverter = () => {
  const [rates, setRates] = React.useState<any>([]);
  const [countries, setCountries] = React.useState<any>([]);
  const [amount, setAmount] = React.useState<number|undefined|"">("");
  const [previousAmount, setPreviousAmount] = React.useState<any>(undefined);
  const [previousResult, setPreviousResult] = React.useState<any>(undefined);
  const [firstCountry, setFirstCountry] = React.useState<any>('GBP');
  const [secondCountry, setSecondCountry] = React.useState<any>('EUR');
  const [selectState, setSelectState] = React.useState<Array<boolean>>([false, false]);
  const [result, setResult] = React.useState<any>(undefined);
  const calculateResult = (event:any) => {
    let result = Number(amount) * Number(rates.rates[secondCountry])/Number(rates.rates[firstCountry])
    if (amount === ""){
      setAmount(undefined)
    } if (!amount) {
      event?.preventDefault()
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
    <div data-testid="currency-converter" className="currency-converter">
      <h1>Currency Converter</h1>
      <Input title="input" error={true} type="text" value={amount} maxLength={20} setValue={setAmount} label="Your currency amount" triggerFunc={calculateResult}/>
      <Select index={0} title="select" value={firstCountry} defaultText={'GBP/British Pound Sterling'} setValue={setFirstCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
      <Select index={1} title="select" value={secondCountry} defaultText={'EUR/Euro'} setValue={setSecondCountry} selectState={selectState} setSelectState={setSelectState} options={countries} setOptions={setCountries}/>
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

export default CurrencyConverter;
