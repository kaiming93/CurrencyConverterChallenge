import React from 'react';
import {render, screen, getAllByRole} from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom/extend-expect';
import logo from '../../img/swap.svg'

test('loads and displays a button', () => {
  const mockClick = jest.fn;
  const {container} = render(<Button title="button" className="button" logo={logo} logoWidth="30px" clickFunc={mockClick}/>)
  expect(screen.getByTestId('button')).toBeInTheDocument();
  //const img = getAllByRole(container, 'image')
  //expect(img).toHaveLength(1);
})