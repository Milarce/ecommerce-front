import { useState } from "react";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";
import { CssBaseline, Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

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
      <CssBaseline />
      <Header switchMode={handleTheme} auth={darkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;