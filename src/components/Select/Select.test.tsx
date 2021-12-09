import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays a select", () => {
  const mockFunc = jest.fn;
  const setup = () => {
    const utils = render(
      <Select
        index={0}
        title="select"
        value={["GBP","EUR"]}
        setValue={mockFunc}
        selectState={[false, false]}
        setSelectState={mockFunc}
        options={[["key1", "value1"],["key2", "value2"],["key3", "value3"]]}
        setOptions={mockFunc}
      />
    );
    const selectElement = utils.getByTestId("select-tag");
    return {
      selectElement,
      ...utils,
    };
  };
  test("loads correct props", () => {
    setup();
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });
  test("should be able to click the select and select item", () => {
    const { selectElement } = setup();
    fireEvent.click(selectElement);
    // const listElement = screen.getByTestId("list-tag");
    // expect(listElement).toBeInTheDocument();
    // const listItems = screen.getByTestId("list-item-tag");
    // expect(listItems).toBeInTheDocument();
    // fireEvent.click(listItems);
    //expect((selectElement as HTMLInputElement).textContent).toBe("Testing");
  });
  test("should be able to trigger the select on keydown and select item", () => {
    const { selectElement } = setup();
    fireEvent.keyDown(selectElement, {key: 'Enter', code: 'Enter', charCode: 13})
    const listElement = screen.getByTestId("select-tag");
    expect(listElement).toBeInTheDocument();
    fireEvent.keyDown(listElement, {key: 'Enter', code: 'Enter', charCode: 13})
    //expect((selectElement as HTMLInputElement).value).toBe("Testing");
  }); 
});
