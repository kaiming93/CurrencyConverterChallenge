import React from 'react';
import {render,screen} from '@testing-library/react'
import Error from './Error'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays an error', () => {
  render(<Error errorMsg="enter a value"/>)
  expect(screen.getByTestId('error')).toBeInTheDocument();
})