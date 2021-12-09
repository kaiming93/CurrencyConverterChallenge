export interface IInputProps {
    title?: string;
    setValue?: (event:any) => void;
    label?: string;
    value?: number|undefined|"";
    type: 'number'|'text'|'search';
    maxLength?: number|undefined;
    clickFunc?: (event:any) => void;
    triggerFunc?: (event:any) => void;
    error?:boolean;
    options?: Array<JSX.Element | Array<any>>;
    setOptions?: (event:any) => void;
    filteredOptions?: Array<JSX.Element | Array<any>>;
    setFilteredOptions?: (event:any) => void;
    placeholder?:string;
    className?:string;
  }