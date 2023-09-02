import React from "react";
import classes from "./searchAndAdd.module.scss";
import SearchInput from "../searchInput/SearchInput";
import Button from "../buttons/button/Button";

const SearchAndAdd = ({ text, placeholder, onClick, search }) => {
  return (
    <div className={classes["container"]}>
      <SearchInput
        search={search}
        placeholder={placeholder}
        className={classes["search-input"]}
      />
      <Button text={text} onClick={onClick} />
    </div>
  );
};

export default SearchAndAdd;
