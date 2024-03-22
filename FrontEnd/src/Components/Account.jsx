import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpeg";
import { motion } from "framer-motion";

function Account() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay:2.5,duration: 5, ease: "easeInOut" }} // Adjusted timing and easing
      className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-900 overflow-hidden"
    >
  <motion.div
  className="absolute w-full h-full bg-gradient-to-b from-gray-800 to-gray-900"
  style={{
    borderRadius: "50%", // Making it a circle shape
  }}
  animate={{
    rotate: [0, 360], // Instead of just one rotation, animating from 0 to 360 degrees
    scale: [0, 2.5, 0], // Making it scale from 0 to 1 and back to 0
  }}
  transition={{ delay: 2.5, duration: 15, repeat: Infinity, ease: "linear" }}
/>

      <div className="border rounded-lg w-3/4 bg-white shadow-md p-8 relative z-10">
        <nav className="shadow-lg mb-8 flex justify-center items-center bg-gray-800 text-white px-6 py-3 rounded-lg">
          <div className="text-xl font-semibold">PROFILE</div>
        </nav>
        <div className="flex flex-col items-center mb-8">
          <motion.img
            src={profile}
            width={100}
            className="rounded-full mb-4"
            alt="Profile"
            whileHover={{
              y: -10,
              scale: 1.1, // Increased hover scale for better emphasis
              transition: { duration: 0.3 }, // Maintained consistent transition duration
            }}
          />
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <label className="mr-2 text-gray-800">Name:</label>
              <input type="text" className="border rounded-md px-2 py-1" />
            </div>
            <div className="flex items-center mb-4">
              <label className="mr-2 text-gray-800">Email:</label>
              <input type="text" className="border rounded-md px-2 py-1" />
            </div>
            <div className="flex items-center">
              <label className="mr-2 text-gray-800">About:</label>
              <input type="text" className="border rounded-md px-2 py-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <motion.button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-4"
            whileHover={{ scale: 1.05 }} // Maintained subtle hover scale
            onClick={() => { /* Handle logout */ }}
          >
            Log Out
          </motion.button>
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }} // Maintained subtle hover scale
            onClick={() => { /* Handle edit profile */ }}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Account;
