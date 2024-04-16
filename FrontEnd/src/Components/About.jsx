import React, { useContext } from "react";
import ParticleApp from "../utilities/particleGen";
import "./app.css";
import myProfile from "../assets/myProfile.jpeg";
import linkedin from "../assets/linkedin.png";
import insta from "../assets/insta.png";
import gt from "../assets/gt.png";
import fb from "../assets/fb.png";

function About() {
  return (
    <>
      <div className="particle-container">
        <ParticleApp />
        <div className="content text-white  p-10">
          <nav className="navii text-center font-semibold ">TECHYCHATS</nav>
          <div className="flex flex-row items-center">
            <div className="mt-7 topic">
              About TechyChats:
              <p className="mt-5">
                Welcome to TechyChats, your go-to destination for all
                tech-related things! We're dedicated to bringing you the latest
                news, reviews, tutorials, and discussions about the
                ever-evolving world of technology, From the latest gadgets and
                gizmos to cutting-edge developments in artificial intelligence
                and beyond, we're here to explore the ever-evolving world of
                technology and share our insights with you.
              </p>
            </div>
            <img
              className=" rounded-3xl"
              src="https://assets.thehansindia.com/h-upload/2021/07/31/1600x960_1092805-tech.jpg"
              alt=""
              width={400}
            />
          </div>

          <div className="text-center px-5">
            <div className="mt-7 topic">Our Mission:</div>
            <p className="mt-5">
              At TechyChats, our mission is simple: to empower and inspire tech
              enthusiasts of all levels, and to demystify technology and make it
              accessible to everyone. Whether you're a seasoned tech enthusiast
              or just dipping your toes into the digital waters, or someone
              simply curious about the latest gadgets and innovations, we aim to
              provide informative, engaging content that empowers you to
              navigate the tech landscape with confidence and caters to your
              interests.
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
              <div className="topic">About the Founder</div>
              <div>
                <p className="mt-5">
                  Hey there! I'm Kopperun Silambazhagii MA, the mastermind
                  driving TechyChats. As a first-year student in BCA Software
                  Product Engineering, I'm on a mission to become a top-notch
                  software product engineer. With my knack for problem-solving,
                  Python, C++, and critical thinking, along with my expertise in
                  full-stack development, I'm excited to lead you on a journey
                  through the tech world. I'm all about pushing boundaries and
                  embracing the ever-evolving tech landscape. Join me as we
                  embark on an exciting journey of innovation and exploration at
                  TechyChats!
                </p>
              </div>
            </div>
          </div>

          <div className="topic mt-10">What We Offer:</div>
          <p className="mt-7">
            News & Updates: Stay informed with our up-to-the-minute coverage of
            industry news, product releases, and technological advancements.
          </p>
          <p className="mt-3">
            In-depth Reviews: Get unbiased and comprehensive reviews of the
            newest gadgets, software, and services to help you make informed
            decisions before purchasing.
          </p>
          <p className="mt-3">
            Guides & Tutorials: Whether you're looking to master a new
            programming language, optimize your smartphone's settings, or delve
            into the world of cybersecurity, our step-by-step guides and
            tutorials have got you covered.
          </p>
          <p className="mt-3">
            Community Discussions: Join our vibrant community of tech
            enthusiasts to share your insights, ask questions, and engage in
            lively discussions about all things tech-related.
          </p>

          <div className="flex flex-row mt-10 items-center">
            <div>
              <div className="topic mt-3 ml-40">What we do:</div>
              <p className="mt-7">
                Through in-depth articles, insightful reviews, helpful
                tutorials, and thought-provoking discussions, we strive to keep
                you informed about the latest trends, innovations, and
                breakthroughs shaping our digital future. Whether you're curious
                about the latest smartphone releases, intrigued by the
                possibilities of virtual reality, or eager to learn how to
                protect your privacy online, TechyChats has you covered.
              </p>
            </div>
            <img
              className=" rounded-3xl"
              src="https://cdn.gobankingrates.com/wp-content/uploads/2016/07/8_iStock_66660583_LARGE.jpg?webp=1"
              alt=""
              width={400}
            />
          </div>
          <div className="text-center px-5">
            <div className="mt-7 topic">Get Involved:</div>
            <p className="mt-5">
              At TechyChats, we believe that the best conversations happen when
              everyone has a seat at the table. That's why we encourage our
              readers to get involved! Whether you have a burning question, a
              topic suggestion, or an opinion to share, we want to hear from
              you. Join the discussion in the comments section, connect with us
              on social media, or drop us a line via email. Your feedback helps
              shape the future of TechyChats, and we're grateful for your
              support.
            </p>
            <div></div>
          </div>
          <div className="topic mt-7">Stay Connected:</div>
          <p className="mt-5">
            Want to stay up-to-date with the latest from TechyChats? Be sure to
            subscribe to our newsletter and follow us on social media. Whether
            you prefer LinkedIn, Instagram, Facebook or Github you'll find us
            sharing the latest articles, engaging with our community, and
            providing behind-the-scenes glimpses into life at TechyChats.
          </p>
          <div className="mt-5 flex items-center justify-center">
            <div className="justify-evenly w-2/5 flex">
              <a
                href="https://www.linkedin.com/in/kopperun-silambazhagii-ma-4aa196287/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} width={70} alt="LinkedIn" />
              </a>
              <a
                href="https://www.instagram.com/techychats/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={insta} width={70} alt="Instagram" />
              </a>
              <a
                href="https://github.com/Silambazhagii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={gt} width={70} alt="GitHub" />
              </a>
              <img src={fb} width={70} alt="" />
            </div>
          </div>
          <div>
            <div className="topic mt-7 ml-40">Join Us on the Journey:</div>
            <p className="mt-1">
              Whether you're a tech novice or a seasoned pro, we invite you to
              join us on this exciting journey through the digital landscape.
              Together, let's explore the endless possibilities of technology
              and embrace the future, one byte at a time.
            </p>
          </div>
        <div className="text-center mt-10 h-16 text-xl">👩🏼‍💻 Embark on this journey and tailor it to reflect your unique vision for TechyChats! 💻</div>
        </div>
      </div>
    </>
  );
}

export default About;
