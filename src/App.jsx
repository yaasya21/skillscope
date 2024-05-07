import React from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Main } from "./components/Main";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { AddPostProfile } from "./components/AddPostProfile";
import { Payment } from "./components/Payment";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path={"talents"} element={<Main />} />
            <Route path={"signup"} element={<SignUp />} />
            <Route path={"signin"} element={<SignIn />} />
          </Route>
          <Route path={"/profile"}>
            <Route path={":talentId"} element={<Profile />} />
            <Route path={":talentId/edit"} element={<EditProfile />} />
            <Route path={":talentId/post"} element={<AddPostProfile />} />
            <Route path={":talentId/coins"} element={<Payment />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
