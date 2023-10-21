import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../context/configureStore";

interface Props {
  auth: boolean;
  switchMode: () => void;
}

const middleLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&.hover": {
    color: "grey.400",
  },
  "&.active": {
    color: "grey.800",
  },
};

const Header = (props: Props) => {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0); //Sums all products and their quantities

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
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
          <Typography variant="h6" component={NavLink} to={"/"} sx={navStyles}>
            HOME
          </Typography>
        </Box>
        <Box>
          <List sx={{ display: "flex" }}>
            {middleLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink} //el atributo "component" permite utilizar componentes de otras librerias, en este caso NavLink de "react-router-dom"
                to={path}
                sx={navStyles}
                key={path}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to={"/basket"}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 4 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink} //el atributo "component" permite utilizar componentes de otras librerias, en este caso NavLink de "react-router-dom"
                to={path}
                sx={navStyles}
                key={path}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
