import React from "react";
import { useState, useEffect } from "react";
import { Product } from "../../models/product";
import ProductList from "./ProductList";
import agent from "../../api/agent";
import LoadingComponet from "../../layout/LoadingComponent";
import LoadingComponent from "../../layout/LoadingComponent";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const productsList = await agent.Catalog.list(); //The axios fetch is implemented in agent.ts
      setProducts(productsList);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent message="Loading Products..." />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
};

export default Catalog;
