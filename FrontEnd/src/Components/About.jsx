import React from 'react';
import './script'
import './style.css'

function About() {
  return (
    <div>
      <div id="nav">
        <h3><b>TECHY</b>CHATS</h3>
        <button>Close</button>
      </div>
      <div id="main">
        <div id="page">
          <div id="loop">
            <h1><b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span></h1>
            <h1><b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span></h1>
            <h1><b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span></h1>
          </div>
          <h3>At TechyChats, we're tech enthusiasts & innovators <br /> unraveling the future. making tech accessible,  <br /> igniting conversations.</h3>
          <h4>...SCROLL TO READ</h4>
          <canvas></canvas>
        </div>
        <div id="page1">
          <div id="right-text">
            <h3>FACE BEHIND TECHYCHATS</h3>
            <h1>FOUNDER</h1>
            <img className="myPic" src="./myPic.jpeg" alt="pic" width="20%" height="20%" />
          </div>
          <div id="left-text">
            <h2>KOPPERUN SILAMBAZHAGII MA</h2>
            <h4>Hi, I'm Kopperun Silambazhagii, founder of TechyChats and a <br />
              first-year BCA student. Hailing from Tamil Nadu, my passion for   <br />
              technology fuels my drive to explore the latest trends and  <br />
              breakthroughs in the field. At TechyChats, we're committed  , <br />
              to making tech accessible to all regardless of expertise. Join us<br />
              as we delve into engaging content, spark curiosity, and foster <br />
              meaningful conversations about the future of technology! <span role="img" aria-label="woman technologist">👩🏼‍💻🤩</span>
            </h4>
          </div>
        </div>
        <div id="page2">
          <div id="text1">
            <h3>TechyChats</h3>
            <h1>JOIN<br />OUR<br />COMMUNITY</h1>
          </div>
          <div id="text2">
            <p>Connect with us on social media, share your thoughts, <br /> and join the conversation as we journey through  <br /> the ever-evolving landscape of innovation.</p>
            <img src="/fb.png" alt=""  width="10%" className="logo" />
            <img src="/insta.png" alt="" width="10%" className="logo" />
            <img src="/linkedin.png" alt="" width="10%" className="logo" />
            <img src="/github.png" alt="" width="10%" className="logo" />
          </div>
        </div>
        <div id="page3">
          <div id="text3">
            <h3>CYBERFICTION / PLAYGROUND</h3>
            <h1>CYBERFIELD<br />IS OUR<br />PLAYGROUND</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
