import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";
import MainPage from "./Components/MainPage";
import About from "./Components/About";
import Login from "./Components/Login";
import Account from "./Components/Account";
import { UserProvider } from "./Components/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
