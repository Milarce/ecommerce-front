import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Container component={Paper} sx={{ height: 20 }}>
        <Typography gutterBottom variant="h3">
          Opsss not found
        </Typography>
        <Divider />
        <Button fullWidth component={Link} to="/catalog">
          Go back
        </Button>
      </Container>
    </>
  );
};

export default NotFound;
