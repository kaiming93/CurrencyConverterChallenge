import React from "react";
import { ISelectProps } from "./ISelect";
import Image from "../Image/Image";

const Select: React.FC<ISelectProps> = (props: any) => {
  const [selectedText, setSelectedText] = React.useState<any>(
    props.defaultText
  );
  const [showOptionList, setShowOptionList] = React.useState<any>(Boolean);

  const handleClickEvent = (e: any) => {
    if (
      !e.target.classList.contains("custom-select__select-options__option") && !e.target.classList.contains("custom-select__select-options") &&
      !e.target.classList.contains("custom-select__selected-text") && !e.target.classList.contains("custom-select__selected-text active") && !e.target.classList.contains("custom-select")
    ) {
      setShowOptionList(false);
    }
  };

  const displayList = () => {
    setShowOptionList(!showOptionList);
  };

  const handleOptionList = (e: any) => {
    setSelectedText(e.target.getAttribute("data-name"));
    props.setValue(e.target.getAttribute("data-value"));
    setShowOptionList(false);
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickEvent);
  });

  return (
    <div className="custom-select">
      <div
        tabIndex={0}
        className={
          showOptionList
            ? "custom-select__selected-text active"
            : "custom-select__selected-text"
        }
        onClick={displayList}
        onKeyDown={(e) => {(e.key === 'Enter' || e.key === 'Space')?displayList():(e.key === 'Escape' || e.key === 'Backspace')?setShowOptionList(false): ""  }}
      >
        <Image
          src={`https://flagcdn.com/16x12/${
            props.value.charAt(0).toLowerCase() +
            props.value.charAt(1).toLowerCase()
          }.png`}
        />
        {selectedText}
      </div>
      {showOptionList && (
        <ul className="custom-select__select-options">
          {props.options.map((option: any, index: number) => {
            return (
              <li
                className="custom-select__select-options__option"
                data-name={option[0] + "/" + option[1]}
                data-value={option[0]}
                key={index}
                tabIndex={0}
                onClick={(e) => handleOptionList(e)}
                onKeyDown={(e) => {(e.key === 'Enter' || e.key === 'Space') ? handleOptionList(e):(e.key === 'Escape' || e.key === 'Backspace')?displayList(): "" }}
              >
                <Image
                  src={`https://flagcdn.com/48x36/${
                    option[0].charAt(0).toLowerCase() +
                    option[0].charAt(1).toLowerCase()
                  }.png`}
                />
                <div>
                  {option[0]}/{option[1]}
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
