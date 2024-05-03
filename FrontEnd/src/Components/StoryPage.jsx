import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StoryPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/getone/${id}`
        );
        const base64Image = response.data.image_url.toString("base64");
        const postWithBase64Image = {
          ...response.data,
          image_url: `data:image/png;base64,${base64Image}`,
        };
        setPost(postWithBase64Image);
        console.log(postWithBase64Image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <div className=" m-10 items-center border justify-center text-center">
          <h1 className=" text-5xl font-semibold">{post.title}</h1>
          <p className=" text-2xl text-gray-700">{post.description}</p>
          <img className=" items-center" src={post.image_url} alt={post.title} width={300}/>
          <p>{post.story}</p>
        </div>
      ) : (
        <p>No post found</p>
      )}
    </>
  );
}

export default StoryPage;
