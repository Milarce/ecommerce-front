import React from "react";
import { Product } from "../../models/product";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = (props: Props) => {
  return (
    <Grid container spacing={4}>
      {props.products.map((prod: Product) => (
        <Grid key={prod.id} item xs={3}>
          <ProductCard prod={prod} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
