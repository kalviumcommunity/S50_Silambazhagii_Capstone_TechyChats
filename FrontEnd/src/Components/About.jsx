import React, { useContext } from "react";
import ParticleApp from "../utilities/particleGen";
import "./app.css";
import myProfile from "../assets/myProfile.jpeg";

function About() {
  return (
    <>
      <div className="particle-container">
        <ParticleApp />
        <div className="content text-white  p-10">
          <nav className="navii text-center font-semibold ">TECHYCHATS</nav>
          <div className="flex flex-row items-center">
            <div className="mt-3 text-3xl">
              About TechyChats:
              <p className="mt-5">
                Welcome to TechyChats, your go-to destination for all things
                tech-related! We're dedicated to bringing you the latest news,
                reviews, tutorials, and discussions about the ever-evolving
                world of technology.
              </p>
            </div>
            <img
              src="https://cdn.gobankingrates.com/wp-content/uploads/2016/07/8_iStock_66660583_LARGE.jpg?webp=1"
              alt=""
              width={400}
            />
          </div>

          <div className="text-center px-5">
            <div className="mt-7 text-3xl">Our Mission:</div>
            <p className="mt-5">
              At TechyChats, our mission is simple: to empower and inspire tech
              enthusiasts of all levels. Whether you're a seasoned developer, a
              casual user, or someone simply curious about the latest gadgets
              and innovations, we're here to provide informative and engaging
              content that caters to your interests.
            </p>
            <div></div>
          </div>

          <div className="flex mt-10 w-full items-center">
            <img
              src={myProfile}
              alt=""
              width={240}
              className=" rounded-full mt-10"
            />
            <div>
              <div className="  text-3xl">About the Founder</div>
              <div><p className="mt-5">
                Hey there! I'm Kopperun Silambazhagii MA, the mastermind driving
                TechyChats. As a first-year student in BCA Software Product
                Engineering, I'm on a mission to become a top-notch software
                product engineer. With my knack for problem-solving, Python,
                C++, and critical thinking, along with my expertise in
                full-stack development, I'm excited to lead you on a journey
                through the tech world. I'm all about pushing boundaries and
                embracing the ever-evolving tech landscape. Join me as we embark
                on an exciting journey of innovation and exploration at
                TechyChats!
              </p></div>
            </div>
          </div>

          <div className=" text-3xl mt-10">What We Offer:</div>
          <p>
            News & Updates: Stay informed with our up-to-the-minute coverage of
            industry news, product releases, and technological advancements.
          </p>
          <p>
            In-depth Reviews: Get unbiased and comprehensive reviews of the
            newest gadgets, software, and services to help you make informed
            decisions before purchasing.
          </p>
          <p>
            Guides & Tutorials: Whether you're looking to master a new
            programming language, optimize your smartphone's settings, or delve
            into the world of cybersecurity, our step-by-step guides and
            tutorials have got you covered.
          </p>
          <p>
            Community Discussions: Join our vibrant community of tech
            enthusiasts to share your insights, ask questions, and engage in
            lively discussions about all things tech-related.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
