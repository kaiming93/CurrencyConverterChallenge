import React from 'react';
import {render, screen} from '@testing-library/react'
import Select from './Select'
import '@testing-library/jest-dom/extend-expect';

describe('loads and displays a select', () => {
  const mockValue = jest.fn;
  const setup = () => {
    const utils = render(<Select index={0} title="select" value="GBP" defaultText={'GBP/British Pound Sterling'} setValue={mockValue} selectState={[false,false]} setSelectState={mockValue} options={['key1', 'value1']} setOptions={mockValue}/>)
    const selectElement = utils.getByTestId("select-tag");
    return {
      selectElement,
      ...utils,
    };
  };
  test("loads correct props", () => {
    setup();
  expect(screen.getByTestId('select')).toBeInTheDocument();
  })
})