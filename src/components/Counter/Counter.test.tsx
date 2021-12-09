import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays a counter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test("loads and displays a counter", () => {
    const mockClick = jest.fn;
    render(
      <Counter
        title="counter"
        counter={600}
        setCounter={mockClick}
        setResult={mockClick}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
  });
  test("loads and displays a counter", () => {
    const mockClick = jest.fn;
    render(
      <Counter
        title="counter"
        counter={557}
        setCounter={mockClick}
        setResult={mockClick}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
  });

  test("loads and trigger setResult with counter 0", () => {
    const mockCounter = jest.fn;
    const mockResult = jest.fn;
    const { container } = render(
      <Counter
        title="counter"
        counter={0}
        setCounter={mockCounter}
        setResult={mockResult}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    //fireEvent.click(container);
    //expect(mockResult).toBeCalled()
  });
});
