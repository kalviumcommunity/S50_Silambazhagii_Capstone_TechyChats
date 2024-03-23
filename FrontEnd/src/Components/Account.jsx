import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profile from "../assets/profile.jpeg";

function Account() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [dob, setDob] = useState(new Date());
  const [place, setPlace] = useState("");

  useEffect(() => {
    setName("John Doe");
    setEmail("john@example.com");
    setAbout("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    setSkills("React, JavaScript, HTML, CSS");
    setDob(new Date("1990-01-01"));
    setPlace("New York, USA");
    setLoaded(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const animationEndTimeout = setTimeout(() => {
      document.body.style.overflow = "visible";
    }, 17500);
    return () => clearTimeout(animationEndTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-900 overflow-hidden"
    >
      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-gray-800 to-gray-900"
        style={{
          borderRadius: "50%",
        }}
        animate={{
          rotate: [0, 360],
          scale: [0, 2.5, 0],
        }}
        transition={{
          delay: 2.5,
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="justify-items-center border rounded-lg w-4/5 bg-white shadow-md p-8 relative z-10 flex flex-col justify-center items-center">
        <nav className="shadow-lg mb-8 flex justify-center items-center bg-gray-800 text-white px-6 py-3 rounded-lg w-full">
          <div className="text-xl font-semibold">PROFILE</div>
        </nav>
        <div className="flex justify-items-center flex-col items-center mb-8 w-full">
          <motion.img
            src={profile}
            width={150}
            className="rounded-full mb-4 border-4 border-white hover:border-gray-700"
            alt="Profile"
            whileHover={{
              y: -10,
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center mb-4 w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                Name:
              </label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 w-3/4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                Email:
              </label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 w-3/4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                About:
              </label>
              <textarea
                className="border rounded-md px-2 py-1 w-3/4"
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                Skills:
              </label>
              <input
                type="text"
                className="border rounded -md px-2 py-1 w-3/4"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                DOB:
              </label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                className="border rounded-md px-2 py-1 w-3/4"
              />
            </div>
            <div className="flex items-center w-full">
              <label className="mr-2 text-gray-800 w-1/4 text-right">
                Place:
              </label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 w-3/4"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <motion.button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-4"
            whileHover={{ scale: 1.05 }}
            onClick={() => {}}
          >
            Log Out
          </motion.button>
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => {}}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Account;
