import { Typography, Grid } from "@mui/material";
import BasketSummary from "../basket/BasketSumary";
import BasketTable from "../basket/BasketTable";
import { useAppSelector } from "../../context/configureStore";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <BasketTable items={basket?.items} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
