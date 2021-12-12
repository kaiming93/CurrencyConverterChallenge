import axios from "axios";
import { act } from "react-dom/test-utils";

export const getRates = (setRates: any, isMounted:boolean) => {
  axios
    .get("https://api.exchangerate-api.com/v4/latest/GBP", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      act(() => {
        isMounted? setRates(res.data.rates):null;
      });
      return res.data.rates
    })
    .catch((err) => {
      isMounted && console.log(err);
    });
};

export const getCountries = (setCountries: any, isMounted:boolean) => {
  axios
    .get("https://openexchangerates.org/api/currencies.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      act(() => {
        isMounted? setCountries(Object.entries(res.data)):null;
      });
    })
    .catch((err) => {
      isMounted && console.log(err);
    });
};
