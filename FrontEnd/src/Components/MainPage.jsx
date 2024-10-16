import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./app.css";
import "./style.css";
import "./animation.css";
import search from "../assets/search.png";
import profile from "../assets/profile.jpeg";
import commentsIcon from "../assets/commentsIcon.png";
import addPost from "../assets/addPost.png";
import orangelogo from "../assets/orangelogo.png";
import TECHYCHATS from "../assets/TECHYCHATS.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Comments from "./Comments";

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [userNameCookie, setUserNameCookie] = useState(
    Cookies.get("name") ? Cookies.get("name").replace(/"/g, "") : ""
  );
  const UserName = userNameCookie;

  const [like, setLike] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [search, setSearch] = useState('');


  const [likedPosts, setLikedPosts] = useState({});

  const [load, setLoad] = useState(true);
  const [data, setData] = useState(true);
  const [account, setAccount] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/story/${postId}`);
  };

  const handleBookmarkToggle = () => {
    setBookmark((prev) => !prev); // Toggle bookmark state
  };

  const handleSave = () => {
    // This is where you can save the bookmark state to another component
    console.log("Bookmark saved:", bookmark);
  };

  const handleCommentClick = (post) => {
    setActiveCommentPost(post);
  };

  const handleCloseCommentBox = () => {
    setActiveCommentPost(null);
  };

  useEffect(() => {
    const user = Cookies.get("userId");
    if (user) {
      setUserData(JSON.parse(user));
      setAccount(true);
    } else {
      setAccount(false);
    }
  }, []);

  // useEffect(()=>{
  //   axios.get("http://localhost:3000/posts")
  //   .then((response) =>{
  //     const data = response.data;
  //     setData(data);
  //     console.log("dadas",response.data)
  //   })
  // })

//   const filteredData = data.filter((data) =>
//   data.title.toLowerCase().startsWith(search.toLowerCase())
// );

useEffect(() => {
  axios
    .get("http://localhost:3000/posts")
    .then((response) => {
      setPosts(response.data);
      setLoad(false);

      const userId = Cookies.get("userId").replace(/"/g, "");
      
      // Check if the user ID is in the likes array of each post
      const initialLikedPosts = response.data.reduce((acc, post) => {
        acc[post._id] = post.likes.includes(userId); // Set to true if userId is in likes array
        return acc;
      }, {});
      
      setLikedPosts(initialLikedPosts);
    })
    .catch((error) => {
      console.log(error);
      setLoad(false);
    });
}, []);


const handleLikeToggle = async (postId) => {
  // Optimistically update the liked state in the frontend
  const isCurrentlyLiked = likedPosts[postId];
  setLikedPosts({ ...likedPosts, [postId]: !isCurrentlyLiked });

  // Find and update the specific post's like count immediately
  setPosts(posts.map(post =>
    post._id === postId
      ? { ...post, likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1 }
      : post
  ));

  try {
    // Send the like/unlike request to the server
    const response = await axios.patch(`http://localhost:3000/posts/like/${postId}`, {
      action: !isCurrentlyLiked ? 'like' : 'unlike',
      userId: Cookies.get("userId").replace(/"/g, "")
    });

    const updatedPost = response.data;

    // Update the post data with server response if needed
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, likes: updatedPost.likes } : post
    ));
  } catch (error) {
    console.error(error);

    // Rollback optimistic update on error
    setLikedPosts({ ...likedPosts, [postId]: isCurrentlyLiked });
    setPosts(posts.map(post =>
      post._id === postId
        ? { ...post, likes: isCurrentlyLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  }
};


  return (
    <>
      <div className="mainbody">
        <nav className="flex justify-between text-center items-center">
          <div className="font-semibold flex text-3xl tracking-widest">
            <img src={orangelogo} width={70} alt="" />
            <div className="absolute ml-5 mt-5">
              <img src={TECHYCHATS} width={220} alt="" />
            </div>
          </div>
          <div className="relative">
            <input
              className="bg-gray-200 border ml-20 outline-zinc-300 rounded-full py-1 hover:bg-gray-300 px-5 w-96"
              type="text"
              name=""
              id=""
              placeholder="Search"
            />
            <img
              src={search}
              alt=""
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              width={20}
            />
          </div>
          <div className="flex text-center items-center">
            {!account && (
              <div className="">
                <Link to="/login">
                  <button className="mr-5 bg-orange-400 rounded px-8 text-white font-semibold py-1.5">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-orange-400 mr-10 rounded px-8 text-white font-semibold py-1.5">
                    Signup
                  </button>
                </Link>
              </div>
            )}
            {account && (
              <div className="">
                <Link to="/addpost">
                  <div className="mr-32 mt-7 text-center justify-center hover:bg-gray-200 cursor-pointer flex px-3 shadow-md py-4 transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img src={addPost} alt="" width={30} />
                    <div className="ml-3 text-lg font-serif text-gray-800 tracking-wide">
                      Share Your Story
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {setLoad && (
              <div className="mr-4">
                {account && (
                  <Link to="/account">
                    <div className="account justify-center flex flex-col items-center ">
                      <img
                        className="rounded-full  h-12 w-12"
                        src={profile}
                        alt=""
                      />
                      <div>{UserName}</div> {/* Display user name */}
                    </div>
                  </Link>
                )}
              </div>
            )}

            <div className="hamburger-icon ">
              <input
                id="checkbox2"
                type="checkbox"
                checked={showHamburgerMenu}
                onClick={() => setShowHamburgerMenu((prevState) => !prevState)}
              />
              <label className="toggle toggle2" htmlFor="checkbox2">
                <div id="bar4" className="bars"></div>
                <div id="bar5" className="bars"></div>
                <div id="bar6" className="bars"></div>
              </label>
            </div>
          </div>
        </nav>
        {/* <div className="relative">
          <div
            className="hover:text-gray-500 w-fit ml-0 cursor-pointer "
            onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
          >
            Categories
          </div>
          {showCategoriesDropdown && (
            // <div className="  left-0 bg-white shadow-md rounded-md z-10 px-5 nav-container w-full py-3 flex justify-between items-center relative">
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     AI
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Technology
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Blockchain
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Gadgets
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Problem Solving
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Phones
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Software
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Future Tech
            //   </div>
            //   <div className="hover:text-gray-500 cursor-pointer px-4 py-2">
            //     Autonomous Vehicles
            //   </div>
            // </div>
          )}
        </div>{" "} */}
        {account && (
          <div>
            {activeCommentPost && (
              <div className="fixed inset-0 z-50  bg-black bg-opacity-50  flex items-end justify-center">
                <div className="animate-slide-up">
                  <Comments
                    post={activeCommentPost}
                    onClose={handleCloseCommentBox}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {load && (
          <div className="boxes mt-[20%] ml-[50%]">
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div className="mainbody flex justify-between">
          <div className="box w-3/4">
            <div className="flex  items-center ">
              <div className="flex flex-wrap w-full mr-20">
                <div className="flex content-box flex-wrap">
                  <div className="box w-full p-4">
                    {posts.map((post) => (
                      <div
                        className="flex p-4 mt-7 shadow-md border-b-4 w-5/5 items-center cursor-pointer"
                        key={post._id}
                        // onClick={() => handlePostClick(post._id)}
                      >
                        <div className="w-4/5 mainBox">
                          <div>
                            <h1
                              className="font-semibold text-2xl"
                              onClick={() => handlePostClick(post._id)}
                            >
                              {post.title}
                            </h1>
                            <p
                              className=" font-large text-gray-500"
                              onClick={() => handlePostClick(post._id)}
                            >
                              {post.description}
                            </p>
                            <div className="flex justify-between">
                              <div className="flex items-center mt-4">
                                <img
                                  src={profile}
                                  alt=""
                                  width={27}
                                  className="rounded-full"
                                />
                                {account && (
                                  <div className="text-sm ml-2">{UserName}</div>
                                )}
                                {/* <div className="heart-container" title="Like">
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    id="Give-It-An-Id"
                                  />
                                  <div
                                    className="svg-container"
                                    onClick={() =>
                                      handleLikeToggle(
                                        post._id,
                                        likedPosts[post._id]
                                      )
                                    }
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
                                </div> */}
<div className="heart-container" title="Like">
  <input
    type="checkbox"
    className="checkbox"
    id={`like-${post._id}`}
    checked={likedPosts[post._id] || false}
    onChange={() => handleLikeToggle(post._id)}
  />
  <div className="svg-container">
    <svg
      viewBox="0 0 24 24"
      className={likedPosts[post._id] ? "svg-filled" : "svg-outline"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
    </svg>
  </div>
</div>

<div className="text-xs ml-1 flex flex-row ">
  {post.likes.length || 0}
</div>

                                {/* <div className="text-xs ml-1">{like}</div> */}
                                <img
                                  src={commentsIcon}
                                  className
                                  width={100}
                                  alt="Comments"
                                  onClick={() => handleCommentClick(post)}
                                />
                              </div>

                              <div>
                                <div onClick={handleSave}>
                                  <label className="ui-bookmark">
                                    <input
                                      type="checkbox"
                                      checked={bookmark}
                                      onChange={handleBookmarkToggle}
                                    />{" "}
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
                        </div>
                        <div className="ml-10 ">
                          <img
                            className="size-image"
                            src={post.image_url}
                            onClick={() => handlePostClick(post._id)}
                            alt=""
                            width={200}
                            height={30}
                          />
                        </div>
                      </div>
                    ))}
                    {/* Conditionally render Comments component */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hamburger Menu */}

          {!load && (
            <div className="flex fixed right-0 border mr-14 px-7 mt-0 h-fit justify-center">
              {!showHamburgerMenu && (
                <div className="flex flex-col items-center">
                  <div className="w-80 mt-10 p-10 text-center">
                    <div className="font-bold text-lg">Top Picks</div>

                    <div className="shadow-xl flex items-center justify-center py-5 mt-5 w-full">
                      <img
                        src={profile}
                        width={35}
                        className="rounded-full"
                        alt=""
                      />
                      <div className="ml-5">Jubii</div>
                    </div>

                    <div className="shadow-xl flex items-center justify-center py-5 mt-5 w-full">
                      <img
                        src={profile}
                        width={35}
                        className="rounded-full"
                        alt=""
                      />
                      <div className="ml-5">Jimmy</div>
                    </div>

                    <div className="shadow-xl flex items-center justify-center py-5 mt-5 w-full">
                      <img
                        src={profile}
                        width={35}
                        className="rounded-full"
                        alt=""
                      />
                      <div className="ml-5">Kookie</div>
                    </div>

                    <div className="shadow-xl flex items-center justify-center py-5 mt-5 w-full">
                      <img
                        src={profile}
                        width={35}
                        className="rounded-full"
                        alt=""
                      />
                      <div className="ml-5">Hobii</div>
                    </div>

                    <div className="shadow-xl flex items-center justify-center py-5 mt-5 w-full">
                      <img
                        src={profile}
                        width={35}
                        className="rounded-full"
                        alt=""
                      />
                      <div className="ml-5">Namjoon</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!load && (
            <div>
              {showHamburgerMenu && (
                <div className=" border mt-7 h-96 w-96">
                  <div className="w-full grid justify-center mt-10 h-fit">
                    <Link to="/account">
                      <button className="cssbuttons-io-button w-56 text-center py-5 mt-7">
                        Account
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </Link>

                    <Link to="/myposts">
                      <button className="cssbuttons-io-button w-56 text-center py-5 mt-7">
                        My Posts
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </Link>

                    <Link to="/saved">
                      <button className="cssbuttons-io-button w-56 text-center py-5 mt-7">
                        Saved
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </Link>

                    <Link to="/about">
                      <button className="cssbuttons-io-button w-56 text-center py-5 mt-7">
                        About TechyChats
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainPage;
