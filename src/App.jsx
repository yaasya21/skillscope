import React, { useState } from "react";
import { Header } from "./components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Profile } from "./components/Profile";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/">
            <Route path={"signup"} element={<SignUp />} />
            <Route path={"signin"} element={<SignIn />} />
          </Route>
          <Route path={"/profile"}>
            <Route path={":talentId"} element={<Profile />} />
            {/* <Route
                    path=":talentId/edit"
                    element={<EditPage AvatarIMG={AvatarIMG} />}
                /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
