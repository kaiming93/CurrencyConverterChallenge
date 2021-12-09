import axios from 'axios';

export const getRates = (setRates:any) => {
    axios
    .get("https://api.exchangerate-api.com/v4/latest/GBP", {
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      setRates(response.data);
    }).catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      console.log(error);
    });;
}

export const getCountries = (setCountries:any) => {
    axios
    .get("https://openexchangerates.org/api/currencies.json", {
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      setCountries(Object.keys(response.data).map((key) => [key, response.data[key]]));
    }).catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      console.log(error);
    });;
}
