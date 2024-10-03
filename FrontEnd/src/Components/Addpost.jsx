import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TECHYCHATS from "../assets/TECHYCHATS.png";
import orangelogo from "../assets/orangelogo.png";
import profile from "../assets/profile.jpeg";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgDB } from "./Firebase/firebaseconfig";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Addpost() {
  // Swal.fire({
  //   title: "Good job!",
  //   text: "You clicked the button!",
  //   icon: "success"
  // });
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (files) => setFiles([files[0]]);
  const handleRejected = (fileRejections) =>
    setFileRejections([fileRejections[0]]);
  const handleRemove = () => {
    setFiles([]);
    setFileRejections([]);
  };

  const handleGoHome = () => {
    navigate("/main");
  };

  const handleSubmit = async () => {
    let errors = [];
    if (!title) errors.push("Title");
    if (!description) errors.push("Description");
    if (!story) errors.push("Story");
    if (files.length === 0) errors.push("File");

    if (errors.length > 0) {
      alert(`Please fill ${errors.join(", ")}.`);
      return;
    }
    else{
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
    }

    setLoading(true);

    try {
      const storageRef = ref(imgDB, `Imgs/${uuidv4()}`);
      const uploadTask = await uploadBytes(storageRef, files[0]);
      const image_url = await getDownloadURL(uploadTask.ref);

      const formData = { title, description, story, image_url };

      await axios.post("http://localhost:3000/posts", formData);
      navigate("/main");
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-16 mb-10">
      <nav className="flex justify-between items-center">
        <div>
          <button
            onClick={handleGoHome}
            className=" mt-7 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105"
            title="Go to Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="inline-block mr-2"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Home
          </button>
          <div className="mt-7 font-semibold flex text-3xl tracking-widest">
            <img src={orangelogo} width={70} alt="" />
            <div className="absolute ml-5 mt-5">
              <img src={TECHYCHATS} width={220} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="px-4 py-1 bg-green-600 text-white cursor-pointer rounded-full mr-4"
            onClick={() => handleSubmit()}
          >
            {loading ? "Posting..." : "Share"}
          </div>
          <Link to="/account">
            <div className="account">
              <img className="rounded-full h-12 w-12" src={profile} alt="" />
            </div>
          </Link>
        </div>
      </nav>
      <div className="w-xl mt-12 flex flex-col">
        <div>
          <input
            type="text"
            placeholder="Title"
            className="text-3xl p-2 border border-gray-300 outline-none rounded-md w-full mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="text-lg p-2 border border-gray-300 outline-none rounded-md w-full mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Story"
            className="text-lg p-2 border border-gray-300 outline-none rounded-md w-full mb-3"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        <Pane maxWidth={654}>
          <FileUploader
            label="Upload File"
            description="You can upload 1 file. File can be up to 50 MB."
            maxSizeInBytes={50 * 1024 ** 2}
            maxFiles={1}
            onChange={handleChange}
            onRejected={handleRejected}
            renderFile={(file) => {
              const { name, size, type } = file;
              const fileRejection = fileRejections.find(
                (fileRejection) => fileRejection.file === file
              );
              const { message } = fileRejection || {};
              return (
                <FileCard
                  key={name}
                  isInvalid={fileRejection != null}
                  name={name}
                  onRemove={handleRemove}
                  sizeInBytes={size}
                  type={type}
                  validationMessage={message}
                />
              );
            }}
            values={files}
          />
        </Pane>
      </div>
      {loading && <div className="text-center mt-4 text-lg">Posting...</div>}
    </div>
  );
}

export default Addpost;
