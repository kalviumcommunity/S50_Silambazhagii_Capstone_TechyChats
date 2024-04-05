import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import the Cookies module
import "./app.css";
import bg from "../assets/bg.png";



function Login() {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data of Users", err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          await axios.post(
            "http://localhost:4000/users/tokenvalidate", { token });
          navigate("/home");
        } catch (error) {
          console.error("Error in post request", error.response.data.error);
        }
      }
    };
  
    fetchData();
  }, [userData]); // Add userData as a dependency
  

  const onSubmit = async (data) => {
    console.log(data);
    const user = userData.find(
      (user) => user.email === data.Email && user.password === data.Password
    );

    if (user) {
      navigate("/main");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      className="login w-screen h-screen"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="  text-white w-fit p-5 font-semibold text-lg tracking-widest">TECHY CHATS</div>

      <div className="">
      <div className=" items-center justify-center container mx-auto">
        <div className="text-center text-white text-4xl font-bold mb-8">
          LOGIN
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 border rounded-lg items-center justify-center shadow-lg bg-white"
        >
          <div className="mb-4 flex justify-center">
            <button className=" mt-1 flex items-center justify-center border rounded-full px-7">
              <div>Login With Google</div>
              <div>
                <img
                  src="https://cdn-teams-slug.flaticon.com/google.jpg"
                  width={50}
                  alt=""
                />
              </div>
            </button>
          </div>

          <div className=" text-center mb-1 mt-1">Or</div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid Email",
                },
              })}
              id="Email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Email"
            />
            {errors.Email && (
              <span className="text-red-600 text-sm">
                {errors.Email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
              })}
              id="Password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Password"
            />
            {errors.Password && (
              <span className="text-red-600 text-sm">
                {errors.Password.message}
              </span>
            )}
          </div>

          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="w-full text-white px-4 py-2 rounded cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #1a202c, #2d3748)",
                border: "none",
              }}
            >
              Login
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            Don't have an account?
            <span className="underline font-bold cursor-pointer">
              <Link to="/signup"> Sign up here</Link>
            </span>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;
