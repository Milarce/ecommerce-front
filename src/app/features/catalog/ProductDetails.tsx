import {
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = id && (await agent.Catalog.details(parseInt(id))); //The axios fetch is implemented in agent.ts
      setProduct(response);
      setLoading(false);
    } catch (err: any) {
      console.error(err.response);
      navigate("/not-found");
    }
  };

  return (
    <>
      <Typography>Product Details</Typography>
      {loading ? (
        <LoadingComponent message="Loading Product..." />
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              src={product?.pictureUrl}
              alt={product?.name}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product?.name}</Typography>
            <Divider sx={{ m: 2 }}></Divider>
            <Typography variant="h4" color="secondary">
              ${product ? (product.price / 100).toFixed(2) : ""}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product?.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product?.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product?.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quantity in Stock</TableCell>
                    <TableCell>{product?.quantityInStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
