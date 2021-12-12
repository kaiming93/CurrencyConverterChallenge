import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import Input from "./Input";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays input of type number", () => {
  test("loads correct props and event", () => {
    const mockValue = jest.fn();
    const mockFunc = jest.fn();
    const {container} = render(<Input
      title="input"
      error={true}
      type="number"
      value={undefined}
      maxLength={20}
      setValue={mockValue}
      label="Your currency amount"
      triggerFunc={mockFunc}
    />)
    expect(screen.getByTestId("input")).toBeInTheDocument();
    const inputElement = getByTestId(container, 'input-tag')
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "12345" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("12345");
    fireEvent.keyDown(inputElement, {
      target: { value: "68790" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("68790");
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})
  });
  test("should trigger error component on value undefined", () => {
    const mockValue = jest.fn();
    const mockFunc = jest.fn();
    const {container} = render(<Input
      title="input"
      error={true}
      type="number"
      value={undefined}
      maxLength={20}
      setValue={mockValue}
      label="Your currency amount"
      triggerFunc={mockFunc}
    />)
    const inputElement = getByTestId(container, 'input-tag')
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent("enter a value")
  });
  test("should trigger error component on incorrect value", () => {
    const mockValue = jest.fn();
    const mockFunc = jest.fn();
    const {container} = render(<Input
      title="input"
      error={true}
      type="number"
      value={'1000...'}
      maxLength={20}
      setValue={mockValue}
      label="Your currency amount"
      triggerFunc={mockFunc}
    />)
    const inputElement = getByTestId(container, 'input-tag')
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent("1000... isn't a valid number")
  });
  test("should not trigger error component on value defined", () => {
    const mockValue = jest.fn();
    const mockFunc = jest.fn();
    const {container} = render(<Input
      title="input"
      error={true}
      type="number"
      value={12345}
      maxLength={20}
      setValue={mockValue}
      label="Your currency amount"
      triggerFunc={mockFunc}
    />)
    const inputElement = getByTestId(container, 'input-tag')
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
});
describe("loads and displays input of type search", () => {
  test("loads correct props and events", () => {
    const mockOptions = jest.fn();
    const mockFilter = jest.fn();
    const {container} = render(<Input
      type="search"
      error={false}
      placeholder="Search..."
      options={[["option1", "option2","options3","options4"]]}
      setOptions={mockOptions}
      setFilteredOptions={mockFilter}
      value={1000}
    />)
    expect(screen.getByTestId("input")).toBeInTheDocument();
    const inputElement = getByTestId(container, 'input-tag')
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
