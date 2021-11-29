import React from 'react';
import {render} from '@testing-library/react'
import CurrencyConverter from './CurrencyConverter'

test('returns true', () => {
  render(<CurrencyConverter />)
  expect(true).toBe(true)
})