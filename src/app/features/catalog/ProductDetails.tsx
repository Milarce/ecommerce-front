import {
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { useStoreContex } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";

const ProductDetails = () => {
  const { basket, setBasket, removeItem } = useStoreContex();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [submitLoad, setSubmitload] = useState(false);

  const item = basket?.items.find((i) => i.productId === product?.id); //Verifiy if the product is already in the basket

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    getData();
  }, [id, item]);

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

  const handleInputChange = (e: any) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };

  const handleUpdateCart = async () => {
    setSubmitload(true);
    try {
      if (!item || quantity > item.quantity) {
        const updatedQuantity = item ? quantity - item.quantity : quantity;
        const resp = await agent.Basket.addItem(product?.id!, updatedQuantity);
        setBasket(resp);
      } else {
        const updatedQuantity = item.quantity - quantity;
        await agent.Basket.removeItem(product?.id!, updatedQuantity);
        removeItem(product?.id!, updatedQuantity);
      }
    } catch {
    } finally {
      setSubmitload(false);
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
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <TextField
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  label="Quantity in Cart"
                  fullWidth
                  value={quantity}
                />
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  loading={submitLoad}
                  onClick={handleUpdateCart}
                  sx={{ height: "55px" }}
                  color="primary"
                  size="large"
                  variant="contained"
                  fullWidth
                  disabled={
                    item?.quantity === quantity || (!item && quantity === 0)
                  }
                >
                  {item ? "update Quantity" : "Add to Cart"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
