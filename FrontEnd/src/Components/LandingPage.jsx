import React, { useContext, useEffect } from "react";
import "./app.css";
import { Link } from "react-router-dom";
import TypewriterText from "../typewriter";
import orangelogo from "../assets/orangelogo.png";
import whiteTechychats from "../assets/whiteTechychats.png";
import bgvideo from "../assets/bgvid.mp4";

function LandingPage() {
  return (
    <>
      <video autoPlay muted loop src={bgvideo} id="myVideo" className="-z-20 hue-rotate-45">
      </video>
        <div className="body1 justify-center items-center text-center h-screen">
          <nav className=" flex justify-between text-white text-center font-semibold text-lg px-7">
            <div className="font-semibold flex text-3xl tracking-widest">
              <img src={orangelogo} width={70} alt="" />
              <div className="absolute ml-5 mt-5">
                <img src={whiteTechychats} width={220} alt="" />
              </div>
            </div>
            <div>
              <Link to="/about">
                <button className="mr-7 mt-3">About</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          </nav>
          <div className="text-white flex items-center justify-center item-center mt-44 font-family: gilroy">
            <div className="w-4/5 text-7xl text-center">
              <TypewriterText
                strings={["Where Tech Enthusiasts Connect And Explore..."]}
              />
            </div>
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
