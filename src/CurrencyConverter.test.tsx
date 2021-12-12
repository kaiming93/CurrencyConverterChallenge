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
  test("loads props", async () => {
    const { container } = render(<CurrencyConverter />);
    expect(screen.getByTestId("currency-converter")).toBeInTheDocument();
    const amountInput = getByRole(container, "textbox", {
      name: "converter input",
    });
    expect(amountInput).toBeInTheDocument();
    const allBtn = getAllByRole(container, "button");
    expect(allBtn).toHaveLength(4);
    const swapBtn = getByRole(container, "button", { name: "Swap Currency" });
    expect(swapBtn).toHaveClass("button swap");
    const calcBtn = getByRole(container, "button", {
      name: "Convert currency",
    });
    expect(calcBtn).toHaveClass("button calculate");
    // const ratesDiv = await getByTestId(container, "rates");
    // expect(ratesDiv).toHaveClass("rates");
  });
  test("swap select", () => {
    const { container } = render(<CurrencyConverter />);
    const swapBtn = getByRole(container, "button", { name: "Swap Currency" });
    const firstSelectBeforeSwap = getAllByRole(container, "button")[1];
    expect(firstSelectBeforeSwap).toHaveTextContent(
      "GBP/British Pound Sterling"
    );
    const secondSelectBeforeSwap = getAllByRole(container, "button")[2];
    expect(secondSelectBeforeSwap).toHaveTextContent("EUR/Euro");
    fireEvent.click(swapBtn);
    const firstSelectAfterSwap = getAllByRole(container, "button")[1];
    expect(firstSelectAfterSwap).toHaveTextContent("EUR/Euro");
    const secondSelectAfterSwap = getAllByRole(container, "button")[2];
    expect(secondSelectAfterSwap).toHaveTextContent(
      "GBP/British Pound Sterling"
    );
  });
  test("Show list of countries on select", async () => {
    const { container } = render(<CurrencyConverter />);
    const selectBtn = getByRole(container, "button", {
      name: "GBP/British Pound Sterling",
    });
    fireEvent.click(selectBtn);
    await waitFor(() => screen.getAllByTestId("list-item-tag"));
    expect(screen.getAllByTestId("list-item-tag")).toHaveLength(8);
  });
  test("Show result", async () => {
    render(<CurrencyConverter />);
    const amountInput = screen.getByRole("textbox", {
      name: "converter input",
    });
    expect(amountInput).toBeInTheDocument();
    fireEvent.click(amountInput);
    fireEvent.change(amountInput, {
      target: { value: "1000" },
    });
    await waitFor(() => screen.getByTestId("rates"));
    expect(screen.getByTestId("rates")).toHaveTextContent(
      "1 GBP = 1.1700000000 EUR"
    );
    const calcBtn = screen.getByRole("button", { name: "Convert currency" });
    expect(calcBtn).toHaveClass("button calculate");
    fireEvent.click(calcBtn);
    expect(screen.getByTestId("result")).toHaveTextContent(
      "1000 GBP equals 1170.00 EUR" 
    );
  });
  test("prevent invalid amount on change", async () => {
    render(<CurrencyConverter />);
    const amountInput = screen.getByRole("textbox", {
      name: "converter input",
    });
    expect(amountInput).toBeInTheDocument();
    fireEvent.click(amountInput);
    fireEvent.change(amountInput, {
      target: { value: "" },
    });
    await waitFor(() => screen.getByTestId("rates"));
    expect(screen.getByTestId("rates")).toHaveTextContent(
      "1 GBP = 1.1700000000 EUR"
    );
    const calcBtn = screen.getByRole("button", { name: "Convert currency" });
    expect(calcBtn).toHaveClass("button calculate");
    fireEvent.click(calcBtn);
    expect(screen.queryByTestId("result")).not.toBeInTheDocument();
  });
});
