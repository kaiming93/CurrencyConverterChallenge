import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays a select", () => {
  test("loads correct props and events on state select false with index 0", () => {
    const mockValue = jest.fn();
  const mockSelect = jest.fn();
    const {container} = render(<Select
      index={0}
      title="select"
      value={[
        {
          key: "GBP",
          name: "GBP/British Pound Sterling",
        },
        {
          key: "EUR",
          name: "EUR/Euro",
        },
      ]}
      setValue={mockValue}
      selectState={[false, false]}
      setSelectState={mockSelect}
      options={[
        ["AED", "United Arab Emirates Dirham"],
        ["AFN", "Afghan Afghani"],
        ["ALL", "Albanian Lek"],
        ["AMD", "Armenian Dram"],
        ["ANG", "Netherlands Antillean Guilder"],
        ["AOA", "Angolan Kwanza"],
      ]}
      rates={{
        GBP: 1,
        CAD: 1.68,
        CHF: 1.22,
        CNY: 8.43,
        EUR: 1.17,
        INR: 100.09,
        JPY: 150.15,
        RUB: 97.16,
        USD: 1.32,
      }}
    />)
    expect(screen.getByTestId("select")).toBeInTheDocument();
    const selectBtn = getByTestId(container, "button");
    expect(selectBtn).toBeInTheDocument();
    expect(selectBtn).toHaveTextContent("GBP/British Pound Sterling");
    const list = screen.queryByTestId("list-tag")
    expect(list).not.toBeInTheDocument();
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(1)
    userEvent.click(document.body);
    expect(mockSelect).toHaveBeenCalledTimes(2)
    fireEvent.click(selectBtn);
    fireEvent.keyDown(selectBtn, {
      key: "Enter",
      code: "Enter",
      charCode: 13, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(3)
    fireEvent.keyDown(selectBtn, {
      key: "Escape",
      code: "Escape",
      charCode: 27, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(4)
    fireEvent.keyDown(selectBtn, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(5)
  });
  test("should load correct props and events on state select true with index 0", async() => {
    const mockValue = jest.fn();
  const mockSelect = jest.fn();
    const {container} = render(<Select
      index={0}
      title="select"
      value={[
        {
          key: "GBP",
          name: "GBP/British Pound Sterling",
        },
        {
          key: "EUR",
          name: "EUR/Euro",
        },
      ]}
      setValue={mockValue}
      selectState={[true, false]}
      setSelectState={mockSelect}
      options={[
        ["AED", "United Arab Emirates Dirham"],
        ["AFN", "Afghan Afghani"],
        ["ALL", "Albanian Lek"],
        ["AMD", "Armenian Dram"],
        ["ANG", "Netherlands Antillean Guilder"],
        ["AOA", "Angolan Kwanza"],
      ]}
      rates={{
        GBP: 1,
        CAD: 1.68,
        CHF: 1.22,
        CNY: 8.43,
        EUR: 1.17,
        INR: 100.09,
        JPY: 150.15,
        RUB: 97.16,
        USD: 1.32,
      }}
    />)
    const selectBtn = getByTestId(container, "button");
    expect(selectBtn).toBeInTheDocument();
    const list = screen.getByTestId("list-tag")
    expect(list).toBeInTheDocument();
    const noList = screen.getByTestId("list-item-no-result")
    expect(noList).toBeInTheDocument();
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(1); 
    const listItem = screen.getAllByTestId("list-item-tag")
    expect(listItem).toHaveLength(6)
    const firstItem = screen.getAllByTestId("list-item-tag")[0];
    expect(firstItem).toHaveTextContent("AED/United Arab Emirates Dirham")
    fireEvent.keyDown(firstItem, {
      key: "Enter",
      code: "Enter",
      charCode: 13, 
    });
    expect(mockValue).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledTimes(2);
    const secondItem = screen.getAllByTestId("list-item-tag")[1];
    expect(secondItem).toHaveTextContent("AFN/Afghan Afghani");
    fireEvent.click(secondItem);
    expect(mockValue).toHaveBeenCalledTimes(2);
    expect(mockSelect).toHaveBeenCalledTimes(3);
    const thirdItem = screen.getAllByTestId("list-item-tag")[2];
    expect(thirdItem).toHaveTextContent("ALL/Albanian Lek");
    fireEvent.keyDown(thirdItem, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(4);
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(5);
    const fourthItem = screen.getAllByTestId("list-item-tag")[3];
    expect(fourthItem).toHaveTextContent("AMD/Armenian Dram");
    fireEvent.keyDown(fourthItem, {
      key: "a",
      code: "a",
      charCode: 65, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(5);
  });
  test("loads correct props and events on state select false with index 1", () => {
    const mockValue = jest.fn();
  const mockSelect = jest.fn();
    const {container} = render(<Select
      index={0}
      title="select"
      value={[
        {
          key: "GBP",
          name: "GBP/British Pound Sterling",
        },
        {
          key: "EUR",
          name: "EUR/Euro",
        },
      ]}
      setValue={mockValue}
      selectState={[false, false]}
      setSelectState={mockSelect}
      options={[
        ["AED", "United Arab Emirates Dirham"],
        ["AFN", "Afghan Afghani"],
        ["ALL", "Albanian Lek"],
        ["AMD", "Armenian Dram"],
        ["ANG", "Netherlands Antillean Guilder"],
        ["AOA", "Angolan Kwanza"],
      ]}
      rates={{
        GBP: 1,
        CAD: 1.68,
        CHF: 1.22,
        CNY: 8.43,
        EUR: 1.17,
        INR: 100.09,
        JPY: 150.15,
        RUB: 97.16,
        USD: 1.32,
      }}
    />)
    expect(screen.getByTestId("select")).toBeInTheDocument();
    const selectBtn = getByTestId(container, "button");
    expect(selectBtn).toBeInTheDocument();
    expect(selectBtn).toHaveTextContent("GBP/British Pound Sterling");
    const list = screen.queryByTestId("list-tag")
    expect(list).not.toBeInTheDocument();
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(1)
    userEvent.click(document.body);
    expect(mockSelect).toHaveBeenCalledTimes(2)
    fireEvent.click(selectBtn);
    fireEvent.keyDown(selectBtn, {
      key: "Enter",
      code: "Enter",
      charCode: 13, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(3)
    fireEvent.keyDown(selectBtn, {
      key: "Escape",
      code: "Escape",
      charCode: 27, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(4)
    fireEvent.keyDown(selectBtn, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(5)
  });
  test("should load correct props and events on state select true with index 1", async() => {
    const mockValue = jest.fn();
  const mockSelect = jest.fn();
    const {container} = render(<Select
      index={1}
      title="select"
      value={[
        {
          key: "GBP",
          name: "GBP/British Pound Sterling",
        },
        {
          key: "EUR",
          name: "EUR/Euro",
        },
      ]}
      setValue={mockValue}
      selectState={[false, true]}
      setSelectState={mockSelect}
      options={[
        ["AED", "United Arab Emirates Dirham"],
        ["AFN", "Afghan Afghani"],
        ["ALL", "Albanian Lek"],
        ["AMD", "Armenian Dram"],
        ["ANG", "Netherlands Antillean Guilder"],
        ["AOA", "Angolan Kwanza"],
      ]}
      rates={{
        GBP: 1,
        CAD: 1.68,
        CHF: 1.22,
        CNY: 8.43,
        EUR: 1.17,
        INR: 100.09,
        JPY: 150.15,
        RUB: 97.16,
        USD: 1.32,
      }}
    />)
    const selectBtn = getByTestId(container, "button");
    expect(selectBtn).toBeInTheDocument();
    const list = screen.getByTestId("list-tag")
    expect(list).toBeInTheDocument();
    const noList = screen.getByTestId("list-item-no-result")
    expect(noList).toBeInTheDocument();
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(1); 
    const listItem = screen.getAllByTestId("list-item-tag")
    expect(listItem).toHaveLength(6)
    const firstItem = screen.getAllByTestId("list-item-tag")[0];
    expect(firstItem).toHaveTextContent("AED/United Arab Emirates Dirham")
    fireEvent.keyDown(firstItem, {
      key: "Enter",
      code: "Enter",
      charCode: 13, 
    });
    expect(mockValue).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledTimes(2);
    const secondItem = screen.getAllByTestId("list-item-tag")[1];
    expect(secondItem).toHaveTextContent("AFN/Afghan Afghani");
    fireEvent.click(secondItem);
    expect(mockValue).toHaveBeenCalledTimes(2);
    expect(mockSelect).toHaveBeenCalledTimes(3);
    const thirdItem = screen.getAllByTestId("list-item-tag")[2];
    expect(thirdItem).toHaveTextContent("ALL/Albanian Lek");
    fireEvent.keyDown(thirdItem, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(4);
    fireEvent.click(selectBtn);
    expect(mockSelect).toHaveBeenCalledTimes(5);
    const fourthItem = screen.getAllByTestId("list-item-tag")[3];
    expect(fourthItem).toHaveTextContent("AMD/Armenian Dram");
    fireEvent.keyDown(fourthItem, {
      key: "a",
      code: "a",
      charCode: 65, 
    });
    expect(mockSelect).toHaveBeenCalledTimes(5);
  });
});
