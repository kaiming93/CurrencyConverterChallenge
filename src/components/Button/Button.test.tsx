import React from 'react';
import {render, screen, getByRole, fireEvent} from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays a button with a logo', () => {
  const mockClick = jest.fn();
  render(<Button title="button" text="button" logo='../../img/swap.svg' className="button" clickFunc={mockClick}/>)
  expect(screen.getByTestId('button')).toBeInTheDocument();
  expect(screen.queryByTestId('image')).toBeInTheDocument()
})

test('loads and displays a button without a logo', () => {
  const mockClick = jest.fn();
  render(<Button title="button" text="button" className="button" clickFunc={mockClick}/>)
  expect(screen.getByTestId('button')).toBeInTheDocument();
  expect(screen.getByTestId('button')).toHaveTextContent('button');
  expect(screen.queryByTestId('image')).not.toBeInTheDocument()
})

test('loads and trigger button click event and keydown', () => {
  const mockClick = jest.fn();
  const mockKeyDown = jest.fn();
  const {container} = render(<Button title="button" text="button" className="button" clickFunc={mockClick} keyDown={mockKeyDown}/>)
  expect(screen.getByTestId('button')).toBeInTheDocument();
  const btn = getByRole(container, "button")
  fireEvent.click(btn);
  expect(mockClick).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(btn, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });
  expect(mockKeyDown).toHaveBeenCalledTimes(1);
})