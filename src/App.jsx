import React, { useState } from "react";
import { Header } from "./components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { SignUp } from "./components/SignUp/SignUp";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
