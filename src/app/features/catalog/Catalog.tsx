import React from "react";
import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../context/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  return (
    <>
      {status === "pendingFetchProducts" ? (
        <LoadingComponent message="Loading Products..." />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
};

export default Catalog;
