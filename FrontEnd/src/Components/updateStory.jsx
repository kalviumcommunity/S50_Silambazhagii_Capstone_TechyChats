import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgDB } from "./Firebase/firebaseconfig";
import { v4 as uuidv4 } from "uuid";

function UpdateStory() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    story: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/posts/getone/${id}`);
            setPost(response.data);
            setFormData({
                title: response.data.title,
                description: response.data.description,
                story: response.data.story,
                image: null,
                image_url: response.data.image_url, 
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching post:", error);
            setLoading(false);
        }
    };

    fetchPost();
}, [id]);


  const handleGoBack = () => {
    navigate("/myposts");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        let image_url = post.image_url; 

        if (formData.image) {
            const storageRef = ref(imgDB, `Imgs/${uuidv4()}`);
            const uploadTask = await uploadBytes(storageRef, formData.image);
            image_url = await getDownloadURL(uploadTask.ref);
        }

        const updatedFormData = {
            ...formData,
            image_url,
        };

        await axios.put(`http://localhost:3000/posts/update/${id}`, updatedFormData);

        setEditing(false);
        navigate("/myposts");
    } catch (error) {
        console.error("Error updating post:", error);
        setError("Failed to update post. Please try again.");
    }
};


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/delete/${id}`);
      navigate("/myposts");
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
          </div>
        </div>
      ) : post ? (
        <div className="container mx-auto p-8">
          {!editing ? (
            <>
              <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 text-center mb-8">
                {post.description}
              </p>
              <div className="flex justify-center mb-8">
                <img
                  className="rounded-lg shadow-lg"
                  src={post.image_url}
                  alt={post.title}
                  width={600}
                />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {post.story}
              </p>
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                Edit Story
              </h1>
              {error && (
                <div className="mb-4 text-red-500 text-center">
                  {error}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="story"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Story
                </label>
                <textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="6"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Image Upload
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p className="text-center mt-20">No post found</p>
      )}
    </>
  );
}

export default UpdateStory;
