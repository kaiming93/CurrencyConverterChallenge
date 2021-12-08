import React from 'react'
import {render, screen} from '@testing-library/react'
import CurrencyConverter from './CurrencyConverter'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays currency converter', () => {
  render(<CurrencyConverter />)
  expect(screen.getByTestId('currency-converter')).toBeTruthy();
})