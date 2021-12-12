import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByRole,
  getAllByRole,
  waitFor,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays a select", () => {
  test("loads correct props and events", () => {
    const mockValue = jest.fn();
  const mockSelect = jest.fn();
    const {container} = render(<Select
      index={0}
      title="select"
      value={[
        {
          key: "GBP",
          name: "GBP/British Pound Sterling",
        },
        {
          key: "EUR",
          name: "EUR/Euro",
        },
      ]}
      setValue={mockValue}
      selectState={[false, false]}
      setSelectState={mockSelect}
      options={[
        ["AED", "United Arab Emirates Dirham"],
        ["AFN", "Afghan Afghani"],
        ["ALL", "Albanian Lek"],
        ["AMD", "Armenian Dram"],
        ["ANG", "Netherlands Antillean Guilder"],
        ["AOA", "Angolan Kwanza"],
      ]}
      rates={{
        GBP: 1,
        CAD: 1.68,
        CHF: 1.22,
        CNY: 8.43,
        EUR: 1.17,
        INR: 100.09,
        JPY: 150.15,
        RUB: 97.16,
        USD: 1.32,
      }}
    />)
    expect(screen.getByTestId("select")).toBeInTheDocument();
    const selectBtn = getByRole(container, "button", {
      name: "GBP/British Pound Sterling",
    });
    fireEvent.click(selectBtn);
  });
  // test("should be able to click the select and select item", async () => {
  //   const selectBtn = getByRole(selectElement, "button", {
  //     name: "GBP/British Pound Sterling",
  //   });
  //   fireEvent.click(selectBtn);
  //   // const listAfterSelect = screen.getAllByTestId('list-item-tag')
  //   // expect(listAfterSelect).toHaveLength(9);
  //   //const countSpan = await waitFor(() => getByText(selectElement, "AED/United Arab Emirates Dirham"));
  //   //expect(countSpan).toHaveTextContent("AED/United Arab Emirates Dirham");
  //   // const listElement = getAllByRole(selectElement, "img")
  //   // expect(listElement).toHaveLength(6)
  //   // const listElement = screen.getByTestId("list-tag");
  //   // expect(listElement).toBeInTheDocument();
  //   // const listItems = screen.getByTestId("list-item-tag");
  //   // expect(listItems).toBeInTheDocument();
  //   // fireEvent.click(listItems);
  //   //expect((selectElement as HTMLInputElement).textContent).toBe("Testing");
  // });
  // test("should be able to click the select and close on blur", () => {
  //   const { selectElement } = setup();
  //   const selectBtn = getByRole(selectElement, "button", {
  //     name: "GBP/British Pound Sterling",
  //   });
  //   fireEvent.click(selectBtn);
  //   userEvent.click(document.body);
  //   //const outsideElement = screen.getByTestId('currency-converter')
  //   //fireEvent.click(outsideElement);
  // });
  // test("should be able to trigger the select on keydown and select item", () => {
  //   const { selectElement } = setup();
  //   const selectBtn = getByRole(selectElement, "button", {
  //     name: "GBP/British Pound Sterling",
  //   });
  //   fireEvent.keyDown(selectBtn, {
  //     key: "Enter",
  //     code: "Enter",
  //     charCode: 13,
  //   });
  //   //expect((selectElement as HTMLInputElement).value).toBe("Testing");
  // });
});
