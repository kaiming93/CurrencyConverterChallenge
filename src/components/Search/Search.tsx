import React from "react";
import { ISearchProps } from "./ISearch";
import Input from '../Input/Input';

const Search: React.FC<ISearchProps> = (props: any) => {
  const handleDefault = (e:any) => {
    e.preventDefault()
  }
  return <div className="search"><Input type="text" error={false} clickFunc={handleDefault}/></div>;
};

export default Search;