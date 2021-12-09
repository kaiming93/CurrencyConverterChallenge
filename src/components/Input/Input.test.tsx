import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays input of type number", () => {
  const mockFunc = jest.fn;
  const setup = () => {
    const utils = render(
      <Input
        title="input"
        error={true}
        type="number"
        value={undefined}
        maxLength={20}
        setValue={mockFunc}
        label="Your currency amount"
        clickFunc={mockFunc}
        triggerFunc={mockFunc}
      />
    );
    const inputElement = utils.getByTestId("input-tag");
    return {
      inputElement,
      ...utils,
    };
  };
  test("loads correct props", () => {
    setup();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
  test("should be able to type into input", () => {
    const { inputElement } = setup();
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Testing" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("Testing");
  });
  test("should trigger keydown function on keydown", () => {
    const { inputElement } = setup();
    fireEvent.click(inputElement);
    fireEvent.keyDown(inputElement, {
      target: { value: "68790" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("68790");
  });
  test("should trigger error component on value undefined", () => {
    const { inputElement } = setup();
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });
});
describe("loads and displays input of type search", () => {
  const mockFunc = jest.fn;
  const setup = () => {
    const utils = render(
      <Input
        type="search"
        error={false}
        placeholder="Search..."
        options={[["option1", "option2"]]}
        setOptions={mockFunc}
        setFilteredOptions={mockFunc}
        value={1000}
      />
    );
    const inputElement = utils.getByTestId("input-tag");
    return {
      inputElement,
      ...utils,
    };
  };
  test("loads correct props", () => {
    setup();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
  test("should be able to type into input", () => {
    const { inputElement } = setup();
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "option1" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("option1");
    fireEvent.change(inputElement, {
      target: { value: "option2" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("option2");
  });
});
