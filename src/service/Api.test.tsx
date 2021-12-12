import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, getByRole, getAllByRole} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import CurrencyConverter from "../CurrencyConverter";

test("get data", () => { 
  expect(true).toEqual(true);
}); 

const server = setupServer(
  rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
    return res(ctx.json([
      ["AED", "United Arab Emirates Dirham"],
      ["CHF", "Swiss Franc"],
      ["CNY", "Chinese Yuan"],
      ["EUR", "Euro"],
      ["GBP", "British Pound Sterling"],
      ["INR", "Indian Rupee"],
      ["JPY", "Japanese Yen"],
      ["RUB", "Russian Ruble"],
      ["USD", "United States Dollar"],
    ]))
  }),
  rest.get(
    "https://api.exchangerate-api.com/v4/latest/GB",
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          provider: "https://www.exchangerate-api.com",
          WARNING_UPGRADE_TO_V6: "https://www.exchangerate-api.com/docs/free",
          terms: "https://www.exchangerate-api.com/terms",
          base: "GBP",
          date: "2021-12-11",
          time_last_updated: 1639180802,
          rates: {
            GBP: 1,
            CAD: 1.68,
            CHF: 1.22,
            CNY: 8.43,
            EUR: 1.17,
            INR: 100.09,
            JPY: 150.15,
            RUB: 97.16,
            USD: 1.32,
          },
        })
      );
    }
  ),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  const { container } = render(<CurrencyConverter />)
  const selectBtn = getByRole(container, "button", {name:"GBP/British Pound Sterling"});
    fireEvent.click(selectBtn);

  // let res = getAllByRole( container, 'listitems')
  // console.log(res, "<<<<<")
})

// test('handlers server error', async () => {
//   server.use(
//     // override the initial "GET /greeting" request handler
//     // to return a 500 Server Error
//     rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
//       return res(ctx.status(500))
//     }),
//   )
// })
