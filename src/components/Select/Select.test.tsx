import React from 'react';
import {render} from '@testing-library/react'
import Select from './Select'

test('returns true', () => {
  const mockValue = jest.fn;
  render(<Select title="select" defaultValue="GBP" setValue={mockValue} options={['key1', 'value1']}/>)
  expect(true).toBe(true)
})