import React from "react";
import { ISelectProps } from "./ISelect";
import Image from "../Image/Image";
import Search from '../Search/Search'

const Select: React.FC<ISelectProps> = (props: any) => {
  const [selectedText, setSelectedText] = React.useState<any>(
    props.defaultText
  );
  const [showOptionList, setShowOptionList] = React.useState<any>(Boolean);

  const handleClickEvent = (e: any) => {
    if (
      !e.target.classList.contains("blur")
    ) {
      setShowOptionList(false);
    }
  };

  const displayList = () => {
    setShowOptionList(!showOptionList);
  };

  const handleOptionList = (name:any, value:any) => {
    setSelectedText(name);
    props.setValue(value);
    setShowOptionList(false);
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickEvent);
  });

  return (
    <div className="custom-select blur">
      <div
        tabIndex={0}
        className={
          showOptionList
            ? "custom-select__selected-text active blur"
            : "custom-select__selected-text blur"
        }
        onClick={displayList}
        onKeyDown={(e) => {(e.key === 'Enter' || e.key === 'Space')?displayList():(e.key === 'Escape' || e.key === 'Backspace')?setShowOptionList(false): ""  }}
      >
        <Image
          src={`https://flagcdn.com/48x36/${
            props.value.charAt(0).toLowerCase() +
            props.value.charAt(1).toLowerCase()
          }.png`}
        />
         {selectedText} 
      </div>
      {showOptionList && (
        <ul className="custom-select__select-options blur">
          <Search />
          {props.options.map((option: any, index: number) => {
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
                onKeyDown={(e) => {(e.key === 'Enter' || e.key === 'Space') ? handleOptionList(name, value):(e.key === 'Escape' || e.key === 'Backspace')?displayList(): "" }}
              >
                <Image
                  src={`https://flagcdn.com/48x36/${
                    value.charAt(0).toLowerCase() +
                    value.charAt(1).toLowerCase()
                  }.png`}
                />
                <div className="blur">
                  {name}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
