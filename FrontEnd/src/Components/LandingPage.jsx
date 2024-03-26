import React, { useContext, useEffect } from "react";
import "./app.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

function LandingPage() {
  const userData = useContext(UserContext);
  useEffect(() => {
    console.log("User data:", userData);
  }, [userData]);
  return (
    <>
      <div className="body1 justify-center items-center text-center h-screen">
        <nav className=" flex justify-between text-white font-semibold text-lg px-7">
          <div className=" text-2xl mt-7 ml-7 tracking-widest">TECHY CHATS</div>
          <div>
            <Link to="/about">
              <button className="mr-7 mt-3">About</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        </nav>

        <div className="text-white text-7xl text- text-center item-center mt-32 font-family: gilroy ">
          Where Tech Enthusiasts Connect
          <br />
          and Explore.
        </div>
        <Link to="/main">
          <button className="bg-white px-16 font-semibold rounded-md mt-48 py-3 tracking-widest">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
