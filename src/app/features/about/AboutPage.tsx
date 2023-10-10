import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import agent from "../../api/agent";

const AboutPage = () => {
  const [validationErrors, setvalidationErrors] = useState<string[]>([]);

  const getValidationError = async () => {
    try {
      await agent.TestErrors.getValidationError();
      console.log("Does not showed");
    } catch (err: any) {
      setvalidationErrors(() => err);
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h2">
        About
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }
        >
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }
        >
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }
        >
          Test 500 error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Error</AlertTitle>
          <List>
            {validationErrors.map((error, i) => (
              <ListItem key={i}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </>
  );
};

export default AboutPage;
