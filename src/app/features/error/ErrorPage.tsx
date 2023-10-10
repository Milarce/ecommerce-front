import React from "react";
import styles from "./ErrorPage.module.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
//import errorImg from "/images/error-001.png";

const ErrorPage = () => {
  const { state } = useLocation(); //state value comes from agent.ts using router.navigate()
  return (
    <>
      {state?.error ? (
        <Container component={Paper}>
          <Typography variant="h3" color="secondary">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error.detail || "Internal ServerError"}
          </Typography>
        </Container>
      ) : (
        <>
          <Typography variant="h3" color="secondary">
            Not Found
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              className={styles.errorImg}
              src="/images/errors/error-001.png"
              alt=""
            />
            <Typography gutterBottom variant="h4">
              Upsss something were wrong
            </Typography>
          </Box>

          <Divider sx={{ mt: 4 }} />
          <Button fullWidth component={Link} to="/catalog">
            Go back shopping
          </Button>
        </>
      )}
      ;
    </>
  );
};

export default ErrorPage;
