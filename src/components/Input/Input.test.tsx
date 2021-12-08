import React from 'react';
import {render, screen} from '@testing-library/react'
import Input from './Input'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays input', () => {
  const mockValue = jest.fn;
  render(<Input type="text" title="input" setValue={mockValue}/>)
  expect(screen.getByTestId('input')).toBeTruthy();
})