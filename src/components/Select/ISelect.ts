export interface ISelectProps {
    index?: number;
    title?: string;
    options?: Array<JSX.Element | Array<any>>;
    setOptions?: (event:any) => void;
    setValue?: (event:any) => void;
    defaultValue?: Array<JSX.Element | Array<any>>;
    selectState?: Array<JSX.Element | boolean>;
    setSelectState?: (event:any) => void;
    value?: Array<JSX.Element | any>;
  }