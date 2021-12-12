import axios from "axios";
import { act } from "react-dom/test-utils";

export const getRates = (setRates: any) => {
  axios
    .get("https://v6.exchangerate-api.com/v6/b8057399df1f9720bdc1a419/latest/GBP", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      act(() => {
        setRates(res.data.conversion_rates);
      });
      return res.data.conversion_rates
    })
    .catch((err) => {
      return err;
    });
};

export const getCountries = (setCountries: any) => {
  axios
    .get("https://openexchangerates.org/api/currencies.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      act(() => {
        setCountries(Object.entries(res.data));
      });
    })
    .catch((err) => {
      return err;
    });
};
