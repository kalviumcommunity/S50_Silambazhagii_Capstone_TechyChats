// import UserContext from "./UserContext";
import React, { useContext } from "react";
import ParticleApp from "../utilities/particleGen";
import "./app.css";

function About() {
  // const {userData} = useContext(UserContext);

  return (
    
    <>
      <div className="particle-container">
        <ParticleApp />
        <div className="content text-white">About</div>
        <div>
          {/* <h1>User Data:</h1> */}
          {/* <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Bio: {userData.bio}</p> */}
        </div>
      </div>
    </>
  );
}

export default About;

// import React from 'react'

// function About() {
//   return (
//     <div>About</div>
//   )
// }

// export default About