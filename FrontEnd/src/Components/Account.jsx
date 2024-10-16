import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profile from "../assets/profile.jpeg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

function Account() {
  const userId = Cookies.get("userId").replace(/\"/g, "");
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedUserEmail, setUpdatedUserEmail] = useState("");
  const [updatedUserBio, setUpdatedUserBio] = useState("");
  const [userData, setUserData] = useState({});
  const [skills, setSkills] = useState("");
  const [dob, setDob] = useState(new Date());
  const [place, setPlace] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        console.log(response);
        setUpdatedUserEmail(response.data.email);
        setUpdatedUserName(response.data.name);
        setUpdatedUserBio(response.data.bio);
        setSkills(response.data.skills || "");
        setDob(new Date(response.data.dob || Date.now()));
        setPlace(response.data.place || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const animationEndTimeout = setTimeout(() => {
      document.body.style.overflow = "visible";
    }, 17500);
    return () => clearTimeout(animationEndTimeout);
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  
  const handleSubmit = () => {
    console.log(updatedUserBio);
    console.log(skills);
    console.log(place);
    console.log(dob);
  
    axios
      .put(`http://localhost:3000/users/${userId}`, {
        name: updatedUserName,
        email: updatedUserEmail,
        bio: updatedUserBio,
        skills: skills,
        dob: dob.toISOString(),
        place: place,
      })
      .then((response) => {
        setUpdatedUserEmail(response.data.email);
        setUpdatedUserName(response.data.name);
        setUpdatedUserBio(response.data.bio);
  
        // Parse the dob into a Date object for DatePicker usage
        const newDob = new Date(response.data.dob);
        setDob(newDob);
        
        setSkills(response.data.skills);
        setEditMode(false);
  
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // navigate("/main");
  };
  
  // Display formatted DOB in non-edit mode
  const formattedDob = dob ? new Intl.DateTimeFormat('en-GB').format(dob) : "No Date Provided";
  

  const logout = () => {
    Cookies.remove("userId");
    // Cookies.remove("useremail");
    // Cookies.remove("userbio");
    // Cookies.remove("skills");
    // Cookies.remove("dob");
    // Cookies.remove("place");

    navigate("/main");
  };

  useEffect(() => {
    const savedSkills = Cookies.get("skills");
    const savedDob = Cookies.get("dob");
    const savedPlace = Cookies.get("place");

    if (savedSkills) setSkills(savedSkills);
    if (savedDob) setDob(new Date(savedDob));
    if (savedPlace) setPlace(savedPlace);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-900 overflow-hidden"
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

        <div className="justify-items-center overflow-hidden border rounded-lg w-4/5 bg-white shadow-md p-8 relative z-10 flex flex-col ">
          <Link to="/main">
            <div className="big">✖️ Go to Home</div>
          </Link>
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
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className="border rounded-md px-2 py-1 w-3/4"
                    value={updatedUserName}
                    defaultValue={updatedUserName}
                    onChange={(e) => setUpdatedUserName(e.target.value)}
                  />
                ) : (
                  <div>{updatedUserName}</div>
                )}
              </div>
              <div className="flex items-center mb-4 w-full">
                <label className="mr-2 text-gray-800 w-1/4 text-right">
                  Email:
                </label>
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Add your Email"
                    className="border rounded-md px-2 py-1 w-3/4"
                    value={updatedUserEmail}
                    defaultValue={updatedUserEmail}
                    onChange={(e) => setUpdatedUserEmail(e.target.value)}
                  />
                ) : (
                  <div>{updatedUserEmail}</div>
                )}
              </div>
              <div className="flex items-center mb-4 w-full">
                <label className="mr-2 text-gray-800 w-1/4 text-right">
                  About:
                </label>
                {editMode ? (
                  <textarea
                    placeholder="Add your About"
                    className="border rounded-md px-2 py-1 w-3/4"
                    rows="3"
                    value={updatedUserBio}
                    onChange={(e) => setUpdatedUserBio(e.target.value)}
                  />
                ) : (
                  <div>{updatedUserBio}</div>
                )}
              </div>
              <div className="flex items-center mb-4 w-full">
                <label className="mr-2 text-gray-800 w-1/4 text-right">
                  Skills:
                </label>
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Add your Skills"
                    className="border rounded-md px-2 py-1 w-3/4"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                ) : (
                  <div>{skills}</div>
                )}
              </div>
              <div className="flex items-center mb-4 w-full">
                <label className="mr-2 text-gray-800 w-1/4 text-right">
                  DOB:
                </label>
                {editMode ? (
                  <DatePicker
                    selected={dob}
                    placeholder="Add your DOB"
                    onChange={(date) => setDob(date)}
                    className="border rounded-md px-2 py-1 w-3/4"
                  />
                ) : (
                  <div>{formattedDob || "No Date Provided"}</div>
                )}
              </div>
              <div className="flex items-center w-full">
                <label className="mr-2 text-gray-800 w-1/4 text-right">
                  Place:
                </label>
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Add your Place"
                    className="border rounded-md px-2 py-1 w-3/4"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                ) : (
                  <div>{place}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            {editMode && (
              <motion.button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                whileHover={{ scale: 1.05 }}
                onClick={handleSubmit}
              >
                Submit
              </motion.button>
            )}
          </div>
          <div className="flex justify-between w-full">
            <motion.button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-4"
              whileHover={{ scale: 1.05 }}
              onClick={logout}
            >
              Log Out
            </motion.button>
            {!editMode && (
              <motion.button
                className="bg-black text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                onClick={toggleEditMode}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </motion.button>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/myposts">
              <button className="btn-96 h-10 shadow-xl">
                <span>View my Posts</span>
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Account;
