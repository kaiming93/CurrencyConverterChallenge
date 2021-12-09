import React from 'react';
import {render, screen} from '@testing-library/react'
import Counter from './Counter'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays a counter', () => {
  const mockClick = jest.fn;
  render(<Counter title="counter" counter={mockClick} setCounter={mockClick} setResult={mockClick} result={mockClick}/>)
  expect(screen.getByTestId('counter')).toBeInTheDocument();;
})