import React from 'react';
import {render} from '@testing-library/react'
import Button from './Button'

test('returns true', () => {
  const mockClick = jest.fn;
  render(<Button title="button" clickFunc={mockClick}/>)
  expect(true).toBe(true)
})