import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./app.css";
import "./animation.css";
import search from "../assets/search.png";
import backward from "../assets/backward.png";
import forward from "../assets/forward.png";
import profile from "../assets/profile.jpeg";
import claps from "../assets/claps.jpeg";
import comments from "../assets/comments.png";
import addPost from "../assets/addPost.png";
import orangelogo from "../assets/orangelogo.png";
import TECHYCHATS from "../assets/TECHYCHATS.png";
import { UserContext } from "./UserContext";

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(0);
  const [account, setAccount] = useState(false);


  const { userData } = useContext(UserContext);

  const UserName = Cookies.get("username");
  const UserEmail = Cookies.get("useremail");
  const UserBio = Cookies.get("userbio");

  const incrementLike = () => {
    setLike(like + 1);
  };

  useEffect(() => {

    if (userData) {
      setAccount(true);
    } else {
      setAccount(false);
    }


    console.log("User data:", userData);
    // console.log(userData.name);
  }, [userData]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="mainbody">
        <nav className="flex justify-between text-center items-center ">
          <div className="font-semibold flex text-3xl tracking-widest">
            <img src={orangelogo} width={70} alt="" />
            <div className="absolute ml-5 mt-5">
              <img src={TECHYCHATS} width={220} alt="" />
            </div>
          </div>
          <div class="relative">
            <input
              class="bg-gray-200 border outline-zinc-300 rounded-full py-1 hover:bg-gray-300 px-5 w-96"
              type="text"
              name=""
              id=""
              placeholder="Search"
            />
            <img
              src={search}
              alt=""
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
              width={20}
            />
          </div>
          <div className="flex text-center items-center">
            <div className="">
              <Link to="/login">
                <button className="mr-5 bg-orange-400 rounded px-8 text-white font-semibold py-1.5">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="mr-10 bg-orange-400 rounded px-8 text-white font-semibold py-1.5">
                  Signup
                </button>
              </Link>
            </div>
            {account && (
            <Link to="/account">
              <div className="account">
                <img className=" rounded-full h-12 w-12" src={profile} alt="" />
                <div>{userData.name}</div>
              </div>
            </Link>
            )}
          </div>
        </nav>

        <div className=" nav-container shadow-md mt-5 w-full py-3  flex justify-evenly items-center">
          <div className="cursor-pointer">
            <img src={backward} alt="" width={35} />
          </div>
          <div className="hover:text-gray-500 cursor-pointer">AI</div>
          <div className="hover:text-gray-500 cursor-pointer">Technology</div>
          <div className="hover:text-gray-500 cursor-pointer">Blockchain</div>
          <div className="hover:text-gray-500 cursor-pointer">Gadgets</div>
          <div className="hover:text-gray-500 cursor-pointer">
            Problem Solving
          </div>
          <div className="hover:text-gray-500 cursor-pointer">Phones</div>
          <div className="hover:text-gray-500 cursor-pointer">Software</div>
          <div className="hover:text-gray-500 cursor-pointer">Future Tech</div>
          <div className="hover:text-gray-500 cursor-pointer">
            Autonomous Vehicles
          </div>
          <div className="cursor-pointer">
            <img src={forward} alt="" width={35} />
          </div>
        </div>

        <div className="mainbody flex justify-between">
          <div className="box w-3/4">
            <div className="flex mt-8 items-center">
              <div className="flex flex-wrap">
                <div className="flex flex-wrap">
                  <div className="box">
                    {posts.map((post) => (
                      <div className="flex mt-7 items-center" key={post.id}>
                        <div className="w-4/5 mainBox">
                          <div>
                            <h1 className="font-semibold text-2xl">
                              {post.title}
                            </h1>
                            <p className="font-semibold">{post.description}</p>
                            <div className="flex justify-between">
                              <div className="flex items-center mt-4">
                                <img
                                  src={profile}
                                  alt=""
                                  width={27}
                                  className="rounded-full"
                                />
                                <div className="text-sm ml-2">
                                  {post.author}
                                </div>
                                <div className="heart-container" title="Like">
                                  <input
                                    type="checkbox"
                                    className="checkbox "
                                    id="Give-It-An-Id"
                                  />
                                  <div
                                    className="svg-container"
                                    onClick={incrementLike}
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
                                <img
                                  className="ml-10"
                                  src={comments}
                                  alt=""
                                  width={20}
                                />
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
                          <img
                            src={post.image_url}
                            alt=""
                            width={200}
                            height={50}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="w-80 ml-20 mt-7 shadow-2xl text-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer flex border py-5 px-10">
              <img src={addPost} alt="" width={30} />
              <div className="ml-4">Add Post</div>
            </div>

            <div className="w-80 mt-10 ml-20 border p-10 items-center justify-center text-center">
              <div className="font-bold text-lg">Top Picks</div>

              <div className=" shadow-xl items-center flex justify-center py-5 mt-5">
                <img
                  src={profile}
                  width={35}
                  className=" rounded-full"
                  alt=""
                />
                <div className="ml-5">Musthafa</div>
              </div>

              <div className=" shadow-xl items-center flex justify-center py-5 mt-5">
                <img
                  src={profile}
                  width={35}
                  className=" rounded-full"
                  alt=""
                />
                <div className="ml-5">Jithumon</div>
              </div>

              <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
                <img
                  src={profile}
                  width={35}
                  className=" rounded-full"
                  alt=""
                />
                <div className="ml-5">Shahabas</div>
              </div>

              <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
                <img
                  src={profile}
                  width={35}
                  className=" rounded-full"
                  alt=""
                />
                <div className="ml-5">Shahillu</div>
              </div>

              <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
                <img
                  src={profile}
                  width={35}
                  className=" rounded-full"
                  alt=""
                />
                <div className="ml-5">Silambam</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
