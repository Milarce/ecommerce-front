import { useEffect, useState } from "react";
import Header from "./Header";
import { CssBaseline, Container, createTheme, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContex } from "../context/StoreContext";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import agent from "../api/agent";

function App() {
  const { setBasket } = useStoreContex();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const mode = darkMode ? "dark" : "light";

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) =>
          basket ? (
            setBasket(basket)
          ) : (
            <Typography variant="h3">Your basket empty</Typography>
          )
        )
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [setBasket]);

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
