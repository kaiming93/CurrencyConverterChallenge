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
  test("loads and displays a counter with even number and trigger setCounter every second", () => {
    const mockCounter = jest.fn();
    render(
      <Counter
        title="counter"
        counter={600}
        setCounter={mockCounter}
        setResult={mockCounter}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    expect(screen.getByTestId("counter")).toHaveTextContent("Expire in 10:00")
    expect(mockCounter).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000)
    expect(mockCounter).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(6000)
    expect(mockCounter).toHaveBeenCalledTimes(7);
  });
  test("loads and displays a counter with uneven number and trigger setCounter every second", () => {
    const mockCounter = jest.fn();
    const mockResult = jest.fn();
    render(
      <Counter
        title="counter"
        counter={557}
        setCounter={mockCounter}
        setResult={mockResult}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    expect(screen.getByTestId("counter")).toHaveTextContent("Expire in 9:17");
    expect(mockCounter).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000)
    expect(mockCounter).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(6000)
    expect(mockCounter).toHaveBeenCalledTimes(7);
  });

  test("loads and trigger setResult with counter 0", () => {
    const mockCounter = jest.fn();
    const mockResult = jest.fn();
    const { container } = render(
      <Counter
        title="counter"
        counter={0}
        setCounter={mockCounter}
        setResult={mockResult}
      />
    );
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    expect(screen.getByTestId("counter")).toHaveTextContent("Expire in 0:00");
    expect(mockResult).toHaveBeenCalledTimes(1);
  });
});
