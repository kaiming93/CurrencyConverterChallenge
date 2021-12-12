import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import CurrencyConverter from "../CurrencyConverter";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays currency converter", () => {
  const server = setupServer(
    rest.get(
      "https://openexchangerates.org/api/currencies.json",
      (req, res, ctx) => {
        return res(
          ctx.json({
            AED: "United Arab Emirates Dirham",
            CHF: "Swiss Franc",
            CNY: "Chinese Yuan",
            EUR: "Euro",
            GBP: "British Pound Sterling",
            INR: "Indian Rupee",
            JPY: "Japanese Yen",
            RUB: "Russian Ruble",
            USD: "United States Dollar",
          })
        );
      }
    ),
    rest.get(
      "https://v6.exchangerate-api.com/v6/b8057399df1f9720bdc1a419/latest/GBP",
      (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            result: "success",
            documentation: "https://www.exchangerate-api.com/docs",
            terms_of_use: "https://www.exchangerate-api.com/terms",
            time_last_update_unix: 1639267201,
            time_last_update_utc: "Sun, 12 Dec 2021 00:00:01 +0000",
            time_next_update_unix: 1639353601,
            time_next_update_utc: "Mon, 13 Dec 2021 00:00:01 +0000",
            base_code: "GBP",
            conversion_rates: {
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
    rest.get("*", (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(
        ctx.status(500),
        ctx.json({ error: "You must add request handler." })
      );
    })
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('handlers 500 server error for rates', async () => {
    server.use(
      rest.get('https://v6.exchangerate-api.com/v6/b8057399df1f9720bdc1a419/latest/GBP', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    );
    render(<CurrencyConverter />);
    expect(await waitFor(() => screen.queryByTestId("rates"))).not.toBeInTheDocument();
  })
  test('handlers 404 server error for rates', async () => {
    server.use(
      rest.get('https://v6.exchangerate-api.com/v6/b8057399df1f9720bdc1a419/latest/GBP', (req, res, ctx) => {
        return res(ctx.status(404))
      }),
    );
    render(<CurrencyConverter />);
    expect(await waitFor(() => screen.queryByTestId("rates"))).not.toBeInTheDocument();
  })
  test('handlers 500 server error for list of currencies', async () => {
    server.use(
      rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    );
    render(<CurrencyConverter />);
    expect(await waitFor(() => screen.queryAllByTestId("list-item-tag"))).toHaveLength(0);
  })
  test('handlers 404 server error for list of currencies', async () => {
    server.use(
      rest.get('https://openexchangerates.org/api/currencies.json', (req, res, ctx) => {
        return res(ctx.status(404))
      }),
    );
    render(<CurrencyConverter />);
    expect(await waitFor(() => screen.queryAllByTestId("list-item-tag"))).toHaveLength(0);
  })
});
