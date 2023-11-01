import React from "react";
import { Product } from "../../models/product";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../context/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

const ProductList = (props: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {props.products.map((prod: Product) => (
        <Grid key={prod.id} item xs={4}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard prod={prod} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
