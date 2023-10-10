import { useState } from "react";
import Header from "./Header";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const mode = darkMode ? "dark" : "light";

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

  return (
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
