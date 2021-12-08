import React from "react";
import { ISelectProps } from "./ISelect";
import Image from "../Image/Image";
import Input from "../Input/Input";

const Select: React.FC<ISelectProps> = (props: any) => {
  const [selectedText, setSelectedText] = React.useState<any>(
    props.defaultText
  );
  const [filteredOptions, setFilteredOptions] = React.useState<any>([]);
  const handleClickEvent = (e: any) => {
    if (!e.target.classList.contains("blur")) {
      props.setSelectState([false, false]);
    }
  };

  const displayList = () => {
    props.index === 0
      ? props.setSelectState([!props.selectState[0], false])
      : props.setSelectState([false, !props.selectState[1]]);
      setFilteredOptions(props.options)
  };

  const handleOptionList = (name: any, value: any) => {
    setSelectedText(name);
    props.setValue(value);
    props.setSelectState([false, false]);
  };
  React.useEffect(() => {
    setFilteredOptions(props.options)
    // document.addEventListener("mousedown", handleClickEvent);
  },[props.options]);

  return (
    <div className="custom-select blur" data-testid="select">
      <div
        tabIndex={0}
        className={
          props.selectState[props.index]
            ? "custom-select__selected-text active blur"
            : "custom-select__selected-text blur"
        }
        onClick={displayList}
        onKeyDown={(e) => {
          e.key === "Enter" || e.key === "Space"
            ? displayList()
            : e.key === "Escape" || e.key === "Backspace"
            ? props.setSelectState([false, false])
            : "";
        }}
      >
        <Image
          src={`https://flagcdn.com/48x36/${
            props.value.charAt(0).toLowerCase() +
            props.value.charAt(1).toLowerCase()
          }.png`}
        />
        {selectedText}
      </div>
      {props.selectState[props.index] && (
        <ul className="custom-select__select-options blur">
          <div className="search"><Input type="search" error={false} placeholder="Search..." options={props.options} setOptions={props.setOptions} setFilteredOptions={setFilteredOptions}/></div>
          {filteredOptions.length > 0? filteredOptions.map((option: any, index: number) => {
            const name = option[0] + "/" + option[1];
            const value = option[0];
            return (
              <li
                className="custom-select__select-options__option blur"
                data-name={name}
                data-value={value}
                key={index}
                tabIndex={0}
                onClick={() => handleOptionList(name, value)}
                onKeyDown={(e) => {
                  e.key === "Enter" || e.key === "Space"
                    ? handleOptionList(name, value)
                    : e.key === "Escape" || e.key === "Backspace"
                    ? displayList()
                    : "";
                }}
              >
                <Image
                  src={`https://flagcdn.com/48x36/${
                    value.charAt(0).toLowerCase() +
                    value.charAt(1).toLowerCase()
                  }.png`}
                />
                <div className="blur">{name}</div>
              </li>
            );
          }): <li className="custom-select__select-options__option blur">No result :(</li>}
        </ul>
      )}
    </div>
  );
};

export default Select;
