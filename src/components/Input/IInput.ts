export interface IInputProps {
    title?: string;
    setValue?: (event:any) => void;
    label?: string;
    value?: any;
    type: 'number'|'text'|'search';
    maxLength?: number|undefined;
    triggerFunc?: (event:any) => void;
    error:boolean;
    options?: Array<JSX.Element | Array<any>>;
    setOptions?: (event:any) => void;
    filteredOptions?: Array<JSX.Element | Array<any>>;
    setFilteredOptions?: (event:any) => void;
    placeholder?:string;
    className?:string;
  }