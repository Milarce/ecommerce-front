import { Button, Grid } from "@mui/material";
import BasketSummary from "./BasketSumary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../context/configureStore";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <>
      <BasketTable items={basket?.items} isBasket={true} />
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
