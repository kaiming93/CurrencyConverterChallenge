import React from 'react';
import {render} from '@testing-library/react'
import App from '../App'

test('returns true', () => {
  render(<App />)
  expect(true).toBe(true)
})