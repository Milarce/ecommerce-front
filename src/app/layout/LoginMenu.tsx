import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../context/configureStore";
import { signOut } from "../features/account/accountSlice";
import { clearBasket } from "../features/basket/basketSlice";
import { Link } from "react-router-dom";

const LoginMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" sx={{ typography: "h6" }} onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default LoginMenu;
