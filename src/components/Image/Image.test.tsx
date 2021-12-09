import React from 'react';
import {render,screen} from '@testing-library/react'
import Image from './Image'
import '@testing-library/jest-dom/extend-expect';

describe("loads and displays an image", () => {
test('loads correct props with invalid src', () => {
  render(<Image width="40px" src="https://flagcdn.com/48x36/an.png"/>)
  expect(screen.getByTestId('image')).toBeInTheDocument();;
  //expect(container.firstChild?.firstChild).toHaveClass('image_invalid blur')
})
// test('loads correct props with valid src', () => {
//   const { container } =  render(<Image width="40px" src="https://flagcdn.com/48x36/gb.png"/>)
//   expect(screen.getByTestId('image')).toBeInTheDocument();;
//   expect(screen.getByTestId('valid-image')).toBeInTheDocument();;
//   //expect(container.firstChild?.firstChild).toHaveClass('image_invalid blur')
// })
 })