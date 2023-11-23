import BasketTable from "../basket/BasketTable";
import { Order } from "../../models/order";
import { BasketItem } from "../../models/basket";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  order?: Order;
  handleSelectedOrder: (id: number) => void;
}

const OrderDetails = (props: Props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Order No. {props.order?.id}</Typography>
        <Button onClick={() => props.handleSelectedOrder(0)}>Go Back</Button>
      </Box>
      <BasketTable
        items={props.order?.orderItems as BasketItem[]}
        isBasket={false}
      />
    </>
  );
};

export default OrderDetails;
