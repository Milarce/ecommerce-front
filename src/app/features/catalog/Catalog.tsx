import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const productsList = await axios.get(
        "http://localhost:5000/api/Products"
      );
      setProducts(productsList.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
