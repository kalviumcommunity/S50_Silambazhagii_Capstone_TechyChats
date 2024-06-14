import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";
import MainPage from "./Components/MainPage";
import About from "./Components/About";
import Login from "./Components/Login";
import Account from "./Components/Account";
import Addpost from "./Components/Addpost";
import StoryPage from "./Components/StoryPage";
import UpdateStory from "./Components/updateStory";
import MyPosts from "./Components/MyPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/addpost" element={<Addpost />} />
      <Route path="/story/:id" element={<StoryPage />} />
      <Route path="/updatestory/:id" element={<UpdateStory />} />
    </Routes>
  );
}

export default App;
