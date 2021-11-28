import React from 'react';
import {render} from '@testing-library/react'
import Input from './Input'

test('returns true', () => {
  const mockValue = jest.fn;
  render(<Input title="input" setValue={mockValue}/>)
  expect(true).toBe(true)
})