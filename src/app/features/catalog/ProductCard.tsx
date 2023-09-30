import React from "react";
import { Product } from "../../models/product";
import {
  Card,
  CardMedia,
  Avatar,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
} from "@mui/material";

interface Props {
  prod: Product;
}

const ProductCard = (props: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            {props.prod.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={props.prod.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contains",
          backgroundColor: "primary.light",
        }}
        image={props.prod.pictureUrl}
        title={props.prod.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(props.prod.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.prod.brand} / {props.prod.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
