import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../context/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch.tsx";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import CheckboxButtons from "../../components/CheckboxButtons";
import AppPagination from "../../components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

export const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  const selectedRadio = (e: any) => {
    dispatch(setProductParams({ orderBy: e.target.value }));
  };

  const checkedBrands = (items: string[]) => {
    dispatch(setProductParams({ brands: items }));
  };

  const checkedTypes = (items: string[]) => {
    dispatch(setProductParams({ types: items }));
  };

  const handlePagination = (event: any, page: number) => {
    dispatch(setPageNumber({ pageNumber: page }));
  };

  if (!filtersLoaded) return <LoadingComponent message="Loading Products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedvalue={productParams.orderBy}
            onChange={selectedRadio}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={checkedBrands}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={checkedTypes}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
        <Grid item xs={3} />
        <Grid item xs={12} sx={{ mb: 2, pt: 4 }}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={handlePagination}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
