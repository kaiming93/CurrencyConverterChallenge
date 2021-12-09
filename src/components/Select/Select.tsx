import React from "react";
import { ISelectProps } from "./ISelect";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState<Array<JSX.Element | Array<any>>>([]);
  const handleClickEvent = (e: any) => {
    const element = [...document.getElementsByClassName("custom-select")];

    let flag = true;
    element.forEach((el) => {
      if (e.target !== el && el?.contains(e.target)) {
        flag = false;
      }
    });
    if (flag){
      props.setSelectState([false, false]);
    }
  };

  const displayList = () => {
    props.index === 0
      ? props.setSelectState([!props.selectState[0], false])
      : props.setSelectState([false, !props.selectState[1]]);
    setFilteredOptions(props.options);
  };

  const handleOptionList = (name: any, value: any) => {
    props.index === 0
      ? props.setValue([{ key: value, name: name }, props.value[1]])
      : props.setValue([props.value[0], { key: value, name: name }]);
    props.setSelectState([false, false]);
  };
  React.useEffect(() => {
    setFilteredOptions(props.options);
    document.addEventListener("mousedown", handleClickEvent);
  }, [props.options]);

  return (
    <div className="custom-select" id={`custom-select${props.index}`} data-testid="select">
      <Button clickFunc={displayList}
        keyDown={(e:any) => {
          console.log(e, '<<<<')
          e.key === "Enter" || e.key === "Space"
            ? displayList()
            : e.key === "Escape" || e.key === "Backspace"
            ? props.setSelectState([false, false])
            : "";
        }}
        logo={`https://flagcdn.com/48x36/${
          props.value[props.index].key.charAt(0).toLowerCase() +
          props.value[props.index].key.charAt(1).toLowerCase()
        }.png`}
        logoWidth="48px"
        title={props.value[props.index].name}
        className={
          props.selectState[props.index]
            ? "custom-select__selected-text active"
            : "custom-select__selected-text"
        }
        />
      {props.selectState[props.index] && (
        <ul
          className="custom-select__select-options"
          aria-label="countries"
          data-testid="list-tag"
        >
          <div className="search">
            <Input
              type="search"
              error={false}
              placeholder="Search..."
              options={props.options}
              setOptions={props.setOptions}
              className="search"
              setFilteredOptions={setFilteredOptions}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: any, index: number) => {
              const name = option[0] + "/" + option[1];
              const value = option[0];
              return (
                <li
                  data-testid="list-item-tag"
                  className="custom-select__select-options__option"
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
                    width="48px"
                  />
                  <div>{name}</div>
                </li>
              );
            })
          ) : (
            <li className="custom-select__select-options__option noresult">
              <p>No result :(</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
