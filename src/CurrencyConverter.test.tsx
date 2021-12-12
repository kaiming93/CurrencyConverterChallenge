import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByRole,
  getAllByRole,
} from "@testing-library/react";
import CurrencyConverter from "./CurrencyConverter";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays currency converter", () => {
    const getCountries = rest.get(
      "https://openexchangerates.org/api/currencies.json",
      (req, res, ctx) => {
        return res(
          ctx.json([
            ["AED", "United Arab Emirates Dirham"],
            ["CHF", "Swiss Franc"],
            ["CNY", "Chinese Yuan"],
            ["EUR", "Euro"],
            ["GBP", "British Pound Sterling"],
            ["INR", "Indian Rupee"],
            ["JPY", "Japanese Yen"],
            ["RUB", "Russian Ruble"],
            ["USD", "United States Dollar"],
          ])
        );
      }
    )
    const getRates = rest.get(
      "https://api.exchangerate-api.com/v4/latest/GB",
      (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
              GBP: 1,
              CAD: 1.68,
              CHF: 1.22,
              CNY: 8.43,
              EUR: 1.17,
              INR: 100.09,
              JPY: 150.15,
              RUB: 97.16,
              USD: 1.32,
          })
        );
      }
    )
  const handlers = [getCountries, getRates];

const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("loads props", () => {
    const { container } = render(<CurrencyConverter />);
    expect(screen.getByTestId("currency-converter")).toBeInTheDocument();
    const amountInput = getByRole(container, "textbox", { name: "converter input" });
    expect(amountInput).toBeInTheDocument();
    const allBtn = getAllByRole(container, "button");
    expect(allBtn).toHaveLength(4);
    const swapBtn = getByRole(container, "button", { name: "Swap Currency" });
    expect(swapBtn).toHaveClass("button swap");
    const calcBtn = getByRole(container, "button", { name: "Convert currency" });
    expect(calcBtn).toHaveClass("button calculate");
  });
  test("swap select", () => {
    const { container } = render(<CurrencyConverter />);
    const swapBtn = getByRole(container, "button", { name: "Swap Currency" });
    fireEvent.click(swapBtn);
    //... check select class
  });
  test("Show list of countries on select", async () => {
    const { container } = render(<CurrencyConverter />);
    const selectBtn = getByRole(container, "button", {name:"GBP/British Pound Sterling"});
    fireEvent.click(selectBtn);
    // const listAfterSelect = await waitFor(() => screen.getAllByTestId('list-item-tag'))
    // expect(listAfterSelect).toHaveLength(9);
    
  });
  test("Show result", async () => {
    const { container } = render(<CurrencyConverter />);
    const amountInput = getByRole(container, "textbox", { name: "converter input" });
    expect(amountInput).toBeInTheDocument();
    fireEvent.click(amountInput);
    fireEvent.change(amountInput, {
      target: { value: "1000" },
    });
    // const rates = await waitFor(() => screen.getAllByTestId('rates'))
    // expect(rates).toHaveLength(1);
    // // fireEvent.click(firstList);
    // const calcBtn = getByRole(container, "button", { name: "Calculate" });
    // expect(calcBtn).toHaveClass("button calculate");
    // fireEvent.click(calcBtn);
  });
});
