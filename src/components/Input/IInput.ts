export interface IInputProps {
    title?: string;
    setValue?: any;
    label?: string;
    value?: number|undefined|"";
    type: 'number'|'text'|'search';
    maxLength?: number|undefined;
    clickFunc?: any;
    triggerFunc?: any;
    error?:any;
    options?:any;
    setOptions?:any;
    filteredOptions?: any;
    setFilteredOptions?: any;
    placeholder?:any;
  }