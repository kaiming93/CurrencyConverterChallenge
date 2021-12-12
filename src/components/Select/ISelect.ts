export interface ISelectProps {
    index: number;
    title?: string;
    options: Array<JSX.Element | Array<any>>;
    setValue: (event:any) => void;
    selectState: Array<JSX.Element | boolean>;
    setSelectState: (event:any) => void;
    value: Array<JSX.Element | any>;
    rates: any;
  }