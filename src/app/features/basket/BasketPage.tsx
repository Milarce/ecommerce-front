import React, { useEffect, useState } from "react";
import { Basket, BasketItem } from "../../models/basket";
import {
  IconButton,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { Delete } from "@mui/icons-material";

const BasketPage = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const basketResult: Basket = await agent.Basket.get();
      if (!basketResult)
        return <Typography variant="h3">Your basket empty</Typography>;
      setBasket(basketResult);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent message="Loading Basket..." />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
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
                    {item.name}
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity) / 100}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default BasketPage;
