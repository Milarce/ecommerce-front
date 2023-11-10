import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import App from "../layout/App";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../features/about/AboutPage";
import ErrorPage from "../features/error/ErrorPage";
import BasketPage from "../features/basket/BasketPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import Login from "../features/account/Login";
import Register from "../features/account/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "not-found", element: <ErrorPage /> },
      { path: "basket", element: <BasketPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
