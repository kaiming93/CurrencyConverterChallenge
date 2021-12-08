import React from 'react';
import {render, screen} from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays a button', () => {
  const mockClick = jest.fn;
  render(<Button title="button" clickFunc={mockClick}/>)
  expect(screen.getByTestId('button')).toBeTruthy();
})