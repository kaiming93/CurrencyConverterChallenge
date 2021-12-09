import React from "react";
import { render, screen, fireEvent,getByRole, getAllByRole , waitFor} from "@testing-library/react";
import Select from "./Select";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays a select", () => {
  const mockFunc = jest.fn;
  const setup = () => {
    const utils = render(
      <Select
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
        setValue={mockFunc}
        selectState={[false, false]}
        setSelectState={mockFunc}
        options={[
          ["AED", "United Arab Emirates Dirham"],
          ["AFN", "Afghan Afghani"],
          ["ALL", "Albanian Lek"],
          ["AMD", "Armenian Dram"],
          ["ANG", "Netherlands Antillean Guilder"],
          ["AOA", "Angolan Kwanza"],
        ]}
        setOptions={mockFunc}
      />
    );
    const selectElement = utils.getByTestId("select");
    return {
      selectElement,
      ...utils,
    };
  };
  test("loads correct props", () => {
    setup();
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });
  test("should be able to click the select and select item", async () => {
    const { selectElement } = setup();
    const selectBtn = getByRole(selectElement, "button", {name:"GBP/British Pound Sterling"});
    fireEvent.click(selectBtn);
    //const listElement = await waitFor(() => getAllByRole(selectElement, "li"))
    //expect(listElement).toHaveLength(6)
    // const listElement = screen.getByTestId("list-tag");
    // expect(listElement).toBeInTheDocument();
    // const listItems = screen.getByTestId("list-item-tag");
    // expect(listItems).toBeInTheDocument();
    // fireEvent.click(listItems);
    //expect((selectElement as HTMLInputElement).textContent).toBe("Testing");
  });
  test("should be able to click the select and close on blur", () => {
    const { selectElement } = setup();
    const selectBtn = getByRole(selectElement, "button", {name:"GBP/British Pound Sterling"});
    fireEvent.click(selectBtn);
    fireEvent.focus(selectBtn);
    //const outsideElement = screen.getByTestId('currency-converter')
    //fireEvent.click(outsideElement);
  });
  test("should be able to trigger the select on keydown and select item", () => {
    const { selectElement } = setup();
    const selectBtn = getByRole(selectElement, "button", {name:"GBP/British Pound Sterling"});
    fireEvent.keyDown(selectBtn, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    //expect((selectElement as HTMLInputElement).value).toBe("Testing");
  });
});
