import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useStoreContex } from "../context/StoreContext";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../context/configureStore";
import { fetchBasketAsync } from "../features/basket/basketSlice";
import { fetchCurrentUser } from "../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const mode = darkMode ? "dark" : "light";

  //useCallbak is used here to avoid going in infinit loop with the useEffect and dispatch
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  //Dark theme properties
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? "#EAEAEA" : "#121212",
      },
    },
  });

  const handleTheme = () => {
    setDarkMode(() => !darkMode);
  };

  return loading ? (
    <LoadingComponent message="Initializing..." />
  ) : (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header switchMode={handleTheme} auth={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
