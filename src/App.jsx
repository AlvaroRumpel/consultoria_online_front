import Login from "./components/Login";
import Singup from "./components/Singup";
import { GlobalStyle } from "./components/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { useState } from "react/cjs/react.development";
import { themeClaro, themeEscuro } from "./components/styles/theme";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { BtnTema } from "./components/styles";
import NavHeader from "./components/NavHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import InsertExercise from "./components/InsertExercise";

function App() {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme((theme) => !theme);
  };
  return (
    <Router>
      <ThemeProvider theme={theme ? themeClaro : themeEscuro}>
        <BtnTema onClick={toggleTheme}>
          <ThemeSwitcher theme={theme} />
        </BtnTema>
        <GlobalStyle />
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/singup" element={<Singup />} />
          <Route exact path="/insert-exercise" element={<InsertExercise />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-center" theme="colored" />
      </ThemeProvider>
    </Router>
  );
}

export default App;
