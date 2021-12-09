import React from 'react'
import {render, screen, fireEvent, waitFor,getByRole, getAllByRole} from '@testing-library/react'
import CurrencyConverter from './CurrencyConverter'
import '@testing-library/jest-dom/extend-expect';

describe("loads and displays currency converter", () => {
  beforeEach(() => {
    jest.mock("./__mocks__/axios")
})
test('loads and show result', () => {
  const { container } = render(<CurrencyConverter />)
  expect(screen.getByTestId('currency-converter')).toBeInTheDocument();
  const allBtn = getAllByRole(container, "button");
  expect(allBtn).toHaveLength(4);
  const swapBtn = getByRole(container, "button", {name:""});
  expect(swapBtn).toHaveClass("button swap");
  fireEvent.click(swapBtn);
  const calcBtn = getByRole(container, "button", {name:"Calculate"});
  expect(calcBtn).toHaveClass("button calculate");
  fireEvent.click(calcBtn);
  //const buttonElement = screen.getByRole("button", { name: /Calculate/i} );
  //expect(buttonElement).toBeInTheDocument();
  //fireEvent.click(buttonElement);
})
})

