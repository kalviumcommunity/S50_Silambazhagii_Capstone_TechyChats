import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StoryPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/getone/${id}`
        );

        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleGoBack = () => {
    navigate("/main");
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
          <div className="flex justify-center mt-8">
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGoBack}
            >
              Go Back
            </button> */}
            <button class="btn-96 h-10 shadow-xl" onClick={handleGoBack}><span>Go Back</span></button>

          </div>
        </div>
      ) : (
        <p className="text-center mt-20">No post found</p>
      )}
    </>
  );
}

export default StoryPage;
