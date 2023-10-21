import { BasketItem } from "../../models/basket";
import {
  Box,
  Button,
  Grid,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSumary";
import { currencyFormat } from "../../util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

const BasketPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  //const [status, setStatus] = useState({ loading: false, name: "" }); //"name" is used to know wich was the element clicked

  /*   const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((resp) => dispatch(setBasket(resp)))
      .catch((err) => console.error(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeBasketItemAsync({ productId, quantity }))) //Recall: the reducers receive just one action property, we are distructuring here as it was
      .catch((err) => console.error(err)) //{productId, quantity} = action.payload
      .finally(() => setStatus({ loading: false, name: "" }));
  }; */

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item: BasketItem) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell>{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity) / 100}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="secondary"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Check out
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
