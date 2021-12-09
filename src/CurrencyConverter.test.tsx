import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import CurrencyConverter from './CurrencyConverter'
import '@testing-library/jest-dom/extend-expect';

describe("loads and displays currency converter", () => {
  beforeEach(() => {
    jest.mock("./__mocks__/axios")
})
test('loads and show result', () => {
  render(<CurrencyConverter />)
  expect(screen.getByTestId('currency-converter')).toBeInTheDocument();
  //expect(screen.getByTestId('item')).toBeInTheDocument();
  //const buttonElement = screen.getByRole("button", { name: /Calculate/i} );
  //expect(buttonElement).toBeInTheDocument();
  //fireEvent.click(buttonElement);
})
})

