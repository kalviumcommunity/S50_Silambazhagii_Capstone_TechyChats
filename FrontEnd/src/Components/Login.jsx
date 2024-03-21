import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import bg from "../assets/signup-bg.png"; 
import './app.css'

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

  const onSubmit = async (data) => {
    const user = userData.find(
      (user) => user.Email === data.Email && user.Password === data.Password
    );

    if (user) {
      navigate("/main");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      className="login w-screen loginpage justify-center items-center h-screen"
    >
      <div className="container w-screen h-screen">
        <div className=" text-center text-white items-center justify-center text-4xl font-bold ">
          LOGIN
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto my-4 p-4 border rounded-lg items-center justify-center shadow-lg bg-white"
        >
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
        </form>
      </div>
    </div>
  );
}

export default Login;
