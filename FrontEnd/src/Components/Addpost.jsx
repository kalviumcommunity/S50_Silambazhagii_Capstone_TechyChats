import React, { useState } from "react";
import TECHYCHATS from "../assets/TECHYCHATS.png";
import add from "../assets/add.png";
import orangelogo from "../assets/orangelogo.png";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpeg";

function Addpost() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddImageClick = () => {
    document.getElementById("image").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    document.getElementById("image").value = null;
  };

  return (
    <div className="mx-auto px-16 mb-10">
      <nav className="flex justify-between items-center">
      <div><Link to="/main" className = "block shadow-lg px-4 py-1 rounded-full bg-red-100 mt-4 text-black-500">
      ✖️ Go to Home 
      </Link>
        <div className="mt-7 font-semibold flex text-3xl tracking-widest">
          <img src={orangelogo} width={70} alt="" />
          <div className="absolute ml-5 mt-5">
            <img src={TECHYCHATS} width={220} alt="" />
          </div>
        </div></div>
        <div className="flex items-center">
          <div className="px-4 py-1 bg-green-600 text-white cursor-pointer rounded-full mr-4">
            Share
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
          />
          <input
            type="text"
            placeholder="Description"
            className="text-lg p-2 border border-gray-300 outline-none rounded-md w-full mb-3"
          />
        </div>

        <div className="relative mt-5">
          <textarea
            placeholder="Unfold your Story ..."
            className="p-2 border border-gray-300 rounded-md outline-none w-full h-32"
          ></textarea>
          <div className="">
            <img
              src={add}
              onClick={handleAddImageClick}
              className="absolute bottom-2 right-2 transform transition duration-300 ease-in-out hover:rotate-90 cursor-pointer"
              width={70}
              height={10}
              alt="Add Image"
            />
          </div>
        </div>

        {selectedImage && (
          <button
            onClick={clearSelectedImage}
            className="shadow-2xl border px-5 py-1 w-40 rounded-full mt-4"
          >
            Change Image
          </button>
        )}
        {selectedImage && (
          <div className="mt-5">
            <img src={selectedImage} alt="Selected" className="w-96 h-auto" />
          </div>
        )}
      </div>
      <input
        type="file"
        id="image"
        accept="image/*"
        className="hidden bg-red-400"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default Addpost;
