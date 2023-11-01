import { TextField, debounce } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../context/configureStore";
import { setProductParams } from "./catalogSlice";

let startedDebounce = false; //I use this flag to prevent running debouncedSearch every time onChange runs

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((e: any) => {
    dispatch(setProductParams({ searchTerm: e.target.value }));
    startedDebounce = false;
  }, 1000);

  const onChangeHandler = (e: any) => {
    setSearchTerm(e.target.value);
    if (startedDebounce) return;
    debouncedSearch(e);
    startedDebounce = true;
  };

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={onChangeHandler}
    />
  );
};

export default ProductSearch;
