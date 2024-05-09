import React, { useEffect, useState } from "react";

function myPosts() {
  
  const [posts, setPosts] = useState([]);

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
    <>
      <div className="box">
        {posts.map((post) => (
          <div
            className="flex mt-7 border w-4/5 items-center cursor-pointer"
            onClick={() => handlePostClick(post._id)}
            key={post._id}
          >
            <div className="w-4/5 mainBox">
              <div>
                <h1 className="font-semibold text-2xl">{post.title}</h1>
                <p className="font-semibold">{post.description}</p>
                <div className="flex justify-between">
                  <div className="flex items-center mt-4">
                    <img
                      src={profile}
                      alt=""
                      width={27}
                      className="rounded-full"
                    />
                    <div className="text-sm ml-2">{post.author}</div>
                    <div className="heart-container" title="Like">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="Give-It-An-Id"
                      />
                      <div
                        className="svg-container"
                        // onClick={incrementLike}
                      >
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
                    <img className="ml-10" src={comments} alt="" width={20} />
                  </div>
                  <div>
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
              </div>
            </div>
            <div className="ml-10">
              <img src={post.image_url} alt="" width={200} height={50} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default myPosts;
