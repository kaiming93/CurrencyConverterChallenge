import React from 'react';
import {render,screen} from '@testing-library/react'
import Image from './Image'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays an image', () => {
  render(<Image src="/"/>)
  expect(screen.getByTestId('image')).toBeTruthy();
})