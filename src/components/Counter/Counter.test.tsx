import React from 'react';
import {render, screen} from '@testing-library/react'
import Counter from './Counter'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays a counter', () => {
  const mockClick = jest.fn;
  render(<Counter title="counter" counter={60} setCounter={mockClick} setResult={mockClick}/>)
  expect(screen.getByTestId('counter')).toBeInTheDocument();;
})