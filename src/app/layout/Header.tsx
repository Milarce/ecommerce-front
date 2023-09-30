import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

interface Props {
  auth: boolean;
  switchMode: () => void;
}

const Header = (props: Props) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={props.auth}
                onChange={props.switchMode}
                aria-label="mode switch"
              />
            }
            label={props.auth ? "Light-Mode" : "Dark-Mode"}
          />
        </FormGroup>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Re-Store
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
