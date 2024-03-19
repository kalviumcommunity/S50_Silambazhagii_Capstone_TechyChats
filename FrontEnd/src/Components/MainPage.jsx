import React from "react";
import { Link } from "react-router-dom";
import "./app.css";
import search from "../assets/search.png";
import backward from "../assets/backward.png";
import forward from "../assets/forward.png";
import profile from "../assets/profile.jpeg";
import claps from "../assets/claps.jpeg";
import comments from "../assets/comments.png";
import bookmark from "../assets/bookmark.jpeg";
import image from "../assets/image.jpeg";
import addPost from "../assets/addPost.png";


function MainPage() {
  return (
    <>
       <div className="mainbody">
        <nav className="flex justify-between text-center items-center ">
          <div>TechyChats</div>
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
              width={27}
            />
          </div>
          <div className="flex text-center items-center">
            <div className="">
              <button className="mr-5 bg-gray-500 rounded px-8 text-white py-1.5">
                Login
              </button>
              <Link to="/signup">
                <button className="mr-10 bg-gray-500 rounded px-8 text-white py-1.5">
                  Signup
                </button>
              </Link>
            </div>
            <div className="account">
              <img className=" rounded-full h-12 w-12" src={profile} alt="" />
            </div>
          </div>
        </nav>


        <div className="shadow-md mt-5 w-full py-3 flex justify-evenly cursor-pointer items-center">
          <div>
            <img src={backward} alt="" width={35} />
          </div>
          <div>AI</div>
          <div>Technology</div>
          <div>Blockchain</div>
          <div>Gadgets</div>
          <div>Problem Solving</div>
          <div>Phones</div>
          <div>Software</div>
          <div>Future Tech</div>
          <div>Autonomous Vehicles</div>
          <div>
            <img src={forward} alt="" width={35} />
          </div>
        </div>

        <div className="flex content flex-wrap">
          <div className="box">
            <div className="flex mt-7 items-center">
              <div className=" mainBox">
                <div>
                  <h1 className=" font-semibold text-2xl">
                    Artificial Intelligence: The End of Human Jobs as We Know
                    It?
                  </h1>
                  <p className=" font-semibold">
                    Will AI replace us all? The future of work in a post-AI
                    world
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={profile}
                        alt=""
                        width={27}
                        className="rounded-full"
                      />
                      <div className=" text-sm ml-2">Silambazhagii</div>
                      <img className="ml-10" src={claps} alt="" width={20} />
                      <div className=" text-xs">100</div>
                      <img className="ml-5" src={comments} alt="" width={20} />
                    </div>
                    <div>
                      <img src={bookmark} width={27} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10">
                <img src={image} alt="" width={200} height={50} />
              </div>
            </div>

            <div className="flex mt-7 items-center">
              <div className=" mainBox">
                <div>
                  <h1 className=" font-semibold text-2xl">
                    Artificial Intelligence: The End of Human Jobs as We Know
                    It?
                  </h1>
                  <p className=" font-semibold">
                    Will AI replace us all? The future of work in a post-AI
                    world
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={profile}
                        alt=""
                        width={27}
                        className="rounded-full"
                      />
                      <div className=" text-sm ml-2">Silambazhagii</div>
                      <img className="ml-10" src={claps} alt="" width={20} />
                      <div className=" text-xs">100</div>
                      <img className="ml-5" src={comments} alt="" width={20} />
                    </div>
                    <div>
                      <img src={bookmark} width={27} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10">
                <img src={image} alt="" width={200} height={50} />
              </div>
            </div>

            <div className="flex mt-7 items-center">
              <div className=" mainBox">
                <div>
                  <h1 className=" font-semibold text-2xl">
                    Artificial Intelligence: The End of Human Jobs as We Know
                    It?
                  </h1>
                  <p className=" font-semibold">
                    Will AI replace us all? The future of work in a post-AI
                    world
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={profile}
                        alt=""
                        width={27}
                        className="rounded-full"
                      />
                      <div className=" text-sm ml-2">Silambazhagii</div>
                      <img className="ml-10" src={claps} alt="" width={20} />
                      <div className=" text-xs">100</div>
                      <img className="ml-5" src={comments} alt="" width={20} />
                    </div>
                    <div>
                      <img src={bookmark} width={27} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10">
                <img src={image} alt="" width={200} height={50} />
              </div>
            </div>

            <div className="flex mt-7 items-center">
              <div className=" mainBox">
                <div>
                  <h1 className=" font-semibold text-2xl">
                    Artificial Intelligence: The End of Human Jobs as We Know
                    It?
                  </h1>
                  <p className=" font-semibold">
                    Will AI replace us all? The future of work in a post-AI
                    world
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={profile}
                        alt=""
                        width={27}
                        className="rounded-full"
                      />
                      <div className=" text-sm ml-2">Silambazhagii</div>
                      <img className="ml-10" src={claps} alt="" width={20} />
                      <div className=" text-xs">100</div>
                      <img className="ml-5" src={comments} alt="" width={20} />
                    </div>
                    <div>
                      <img src={bookmark} width={27} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10">
                <img src={image} alt="" width={200} height={50} />
              </div>
            </div>

            <div className="flex mt-7 items-center">
              <div className=" mainBox">
                <div>
                  <h1 className=" font-semibold text-2xl">
                    Artificial Intelligence: The End of Human Jobs as We Know
                    It?
                  </h1>
                  <p className=" font-semibold">
                    Will AI replace us all? The future of work in a post-AI
                    world
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={profile}
                        alt=""
                        width={27}
                        className="rounded-full"
                      />
                      <div className=" text-sm ml-2">Silambazhagii</div>
                      <img className="ml-10" src={claps} alt="" width={20} />
                      <div className=" text-xs">100</div>
                      <img className="ml-5" src={comments} alt="" width={20} />
                    </div>
                    <div>
                      <img src={bookmark} width={27} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10">
                <img src={image} alt="" width={200} height={50} />
              </div>
            </div>
          </div>

         <div className="">
         <div className=" w-80 ml-20 ">
            <div className=" mt-7 shadow-2xl text-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer flex border py-5 px-10">
              <img src={addPost} alt="" width={30}/>
              <div className="ml-4">Add Post</div>
            </div>
          </div>

          <div className=" w-80 mt-10 ml-20 border p-10 items-center justify-center text-center">
            <div className=" font-bold text-lg">Top Picks</div>
            <div className=" shadow-xl items-center flex justify-center py-5">
              <img src={profile} width={20} className=" rounded-full" alt="" />
              <div className="ml-5">Musthafa</div>
            </div>

            <div className=" shadow-xl items-center flex justify-center py-5 mt-5">
              <img src={profile} width={20} className=" rounded-full" alt="" />
              <div className="ml-5">Jithumon</div>
            </div>

            <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
              <img src={profile} width={20} className=" rounded-full" alt="" />
              <div className="ml-5">Shahabas</div>
            </div>

            <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
              <img src={profile} width={20} className=" rounded-full" alt="" />
              <div className="ml-5">Shahillu</div>
            </div>

            <div className=" shadow-xl items-center flex justify-center py-5 mt-5 ">
              <img src={profile} width={20} className=" rounded-full" alt="" />
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
