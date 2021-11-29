import React from 'react';
import {render} from '@testing-library/react'
import Error from './Error'

test('returns true', () => {
  render(<Error errorMsg="enter a value"/>)
  expect(true).toBe(true)
})