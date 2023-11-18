import React from "react";
import { useAppSelector } from "../context/configureStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

//with this component we check if the user is authorized to access a particular resource
const RequireAuth = () => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />; //if the user is not logged in, we send him to the login page
  }
  return <Outlet />; //is used in a parent component to decide when and how render its childs (ex. is used in routes.tsx to protect <Checkout/> from a non logged user)
};

export default RequireAuth;
