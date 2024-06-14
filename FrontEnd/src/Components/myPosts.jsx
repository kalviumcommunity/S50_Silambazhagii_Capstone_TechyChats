import axios from "axios";
import React, { useEffect, useState } from "react";
import profile from "../assets/profile.jpeg";
import { useNavigate } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(true);
  const [like, setLike] = useState(0);
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/updatestory/${postId}`);
  };

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        const postsWithBase64Images = response.data.map((post) => {
          const base64Image = post.image_url.toString("base64");
          return {
            ...post,
            image_url: `data:image/png;base64,${base64Image}`,
          };
        });
        console.log(postsWithBase64Images);
        setPosts(postsWithBase64Images);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {posts.map((post) => (
        <div
          className="flex flex-col md:flex-row items-center md:items-start md:justify-between p-6 mb-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => handlePostClick(post._id)}
          key={post._id}
        >
          <div className="md:w-3/4 w-full">
            <h1 className="font-semibold text-2xl mb-2">{post.title}</h1>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <div className="flex items-center mb-4">
              <img
                src={profile}
                alt=""
                width={30}
                className="rounded-full mr-2"
              />
              <div className="text-sm text-gray-600">{post.author}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="heart-container" title="Like">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={`like-${post._id}`}
                  />
                  <div className="svg-container">
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-outline"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-filled"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                    <svg
                      className="svg-celebrate"
                      width="100"
                      height="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="10,10 20,20"></polygon>
                      <polygon points="10,50 20,50"></polygon>
                      <polygon points="20,80 30,70"></polygon>
                      <polygon points="90,10 80,20"></polygon>
                      <polygon points="90,50 80,50"></polygon>
                      <polygon points="80,80 70,70"></polygon>
                    </svg>
                  </div>
                </div>
                <div className="text-xs ml-1">{like}</div>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  onClick={(e) => {
                    // e.stopPropagation();
                    // handleEditClick(post._id);
                  }}
                >
                  Edit
                </button>
              </div>
              <label className="ui-bookmark">
                <input type="checkbox" />
                <div className="bookmark">
                  <svg viewBox="0 0 32 32">
                    <g>
                      <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                    </g>
                  </svg>
                </div>
              </label>
            </div>
          </div>
          <div className="md:ml-10 mt-4 md:mt-0 w-full md:w-1/4">
            <img
              src={post.image_url}
              alt=""
              className="rounded-lg shadow-sm w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
