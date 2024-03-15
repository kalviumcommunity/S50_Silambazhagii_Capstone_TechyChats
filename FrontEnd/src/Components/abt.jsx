// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import LocomotiveScroll from "locomotive-scroll";
// import "./style.css"; // Import CSS file for styling

// function Abt() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let locoScroll;

//     // Function to initialize Locomotive Scroll
//     const initLocomotiveScroll = () => {
//       gsap.registerPlugin(ScrollTrigger);

//       locoScroll = new LocomotiveScroll({
//         el: document.querySelector("#main"),
//         smooth: true,
//       });

//       locoScroll.on("scroll", ScrollTrigger.update);

//       ScrollTrigger.scrollerProxy("#main", {
//         scrollTop(value) {
//           return arguments.length
//             ? locoScroll.scrollTo(value, 0, 0)
//             : locoScroll.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//           return {
//             top: 0,
//             left: 0,
//             width: window.innerWidth,
//             height: window.innerHeight,
//           };
//         },
//         pinType: document.querySelector("#main").style.transform
//           ? "transform"
//           : "fixed",
//       });

//       ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
//       ScrollTrigger.refresh();
//     };

//     // Function to render canvas
//     const renderCanvas = () => {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       window.addEventListener("resize", () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         render();
//       });

// // Function to generate file paths for images
// function files(index) {
//   const imagePath = `./pics/male${String(index + 1).padStart(4, "0")}.png`;
//   console.log("Loading image:", imagePath);
//   return imagePath;
// }


//       const frameCount = 300;
//       const images = [];
//       const imageSeq = {
//         frame: 0,
//       };
//       let loadedCount = 0;

//       // Load images
//       for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.src = files(i);
//         images.push(img);
//         img.onload = () => {
//           loadedCount++;
//           if (loadedCount === frameCount) {
//             render();
//           }
//         };
//         img.onerror = (error) => {
//           console.error("Error loading image:", error);
//           loadedCount++; // Increment loadedCount even if an image fails to load
//           if (loadedCount === frameCount) {
//             render();
//           }
//         };
//       }

//       // Define animation sequence
//       gsap.to(imageSeq, {
//         frame: frameCount - 1,
//         snap: "frame",
//         ease: "none",
//         scrollTrigger: {
//           scrub: 0.15,
//           trigger: "#page canvas",
//           start: "top top",
//           end: "600% top",
//           scroller: "#main",
//         },
//         onUpdate: render,
//       });

//       // Render function
//       function render() {
//         // Check if the current image is loaded
//         if (
//           images[imageSeq.frame].complete &&
//           images[imageSeq.frame].naturalHeight !== 0
//         ) {
//           scaleImage(images[imageSeq.frame], context);
//         }
//       }

//       // Function to scale and position images on canvas
//       function scaleImage(img, ctx) {
//         const canvas = ctx.canvas;
//         const hRatio = canvas.width / img.width;
//         const vRatio = canvas.height / img.height;
//         const ratio = Math.max(hRatio, vRatio);
//         const centerShift_x = (canvas.width - img.width * ratio) / 2;
//         const centerShift_y = (canvas.height - img.height * ratio) / 2;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(
//           img,
//           0,
//           0,
//           img.width,
//           img.height,
//           centerShift_x,
//           centerShift_y,
//           img.width * ratio,
//           img.height * ratio
//         );
//       }
//     };

//     // Initialize Locomotive Scroll
//     initLocomotiveScroll();

//     // Render Canvas
//     renderCanvas();

//     // Cleanup
//     return () => {
//       locoScroll.destroy();
//     };
//   }, []);

//   return (
//     <>
//       <div id="nav">
//         <h3>
//           <b>TECHY</b>CHATS
//         </h3>
//         <button>Close</button>
//       </div>
//       <div id="main">
//         <div id="page">
//           <div id="loop">
//             <h1>
//               <b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span>
//             </h1>
//             <h1>
//               <b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span>
//             </h1>
//             <h1>
//               <b>WHERE </b>TECH ENTHUSIASTS <b><i>CONNECT</i></b> <span>AND</span> EXPLORE <span><i>THE TECH WORLD.</i></span>
//             </h1>
//           </div>
//           <h3>
//             At TechyChats, we're tech enthusiasts & innovators <br /> unraveling the future. making tech accessible, <br /> igniting conversations.
//           </h3>
//           <h4>...SCROLL TO READ</h4>
//           <canvas ref={canvasRef}></canvas>
//         </div>
//         <div id="page1">
//           <div id="right-text">
//             <h3>FACE BEHIND TECHYCHATS</h3>
//             <h1>FOUNDER</h1>
//             <img className="myPic" src="./myPic.jpeg" alt="pic" width="20%" height="20%" />
//           </div>
//           <div id="left-text">
//             <h2>KOPPERUN SILAMBAZHAGII MA</h2>
//             <p>
//               Hi, I'm Kopperun Silambazhagii, founder of TechyChats and a first-year BCA student. Hailing from Tamil Nadu, my passion for technology fuels my drive to explore the latest trends and
//               breakthroughs in the field. At TechyChats, we're committed to making tech accessible to all regardless of expertise. Join us as we delve into engaging content, spark curiosity, and foster
//               meaningful conversations about the future of technology!
//             </p>
//             <h1>👩🏼‍💻🤩</h1>
//           </div>
//         </div>
//         <div id="page2">
//           <div id="text1">
//             <h3>TechyChats</h3>
//             <h1>JOIN OUR COMMUNITY</h1>
//           </div>
//           <div id="text2">
//             <p>Connect with us on social media, share your thoughts, and join the conversation as we journey through the ever-evolving landscape of innovation.</p>
//             <img src="/fb.png" alt="" width="10%" className="logo" />
//             <img src="/insta.png" alt="" width="10%" className="logo" />
//             <img src="/linkedin.png" alt="" width="10%" className="logo" />
//             <img src="/github.png" alt="" width="10%" className="logo" />
//           </div>
//         </div>
//         <div id="page3">
//           <div id="text3">
//             <h1>WANT TO KNOW MORE?</h1>
//             <button className="button">CONTACT US</button>
//           </div>
//           <div id="text4">
//             <h1>KEEP EXPLORING</h1>
//             <img src="./assets/jump.gif" alt="" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Abt;
