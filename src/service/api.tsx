import axios from 'axios';

export const getRates = (setPosts:any) => {
    axios
    .get("https://api.exchangerate-api.com/v4/latest/GBP", {
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      setPosts(response.data);
    }).catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      console.log(error);
    });;
}

export const getCountries = (setPosts:any) => {
    axios
    .get("https://openexchangerates.org/api/currencies.json", {
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      setPosts(response.data);
    }).catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      console.log(error);
    });;
}