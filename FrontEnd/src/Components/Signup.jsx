import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./app.css";
import "./animation.css";
import bg from "../assets/bg.png";
import Cookies from "js-cookie";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [googleClicked, setGoogleClicked] = useState(false); 

  const handleGoogleClick = () => {
    setGoogleClicked(true); // Set state to true when Google sign-up is clicked
    // console.log(data)
    window.location.href = "http://localhost:3000/auth/google";
  }

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/createnew",
        data
      );
      console.log(response.data);
      setSub(true);
      navigate("/main");
      const { Userdata, token } = response.data;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("username", data.name);
      Cookies.set("useremail", data.email);
      Cookies.set("userbio", data.bio);
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    }
  };

  const password = watch("password", " ");

  const [sub, setSub] = useState(false);

  return (
    <div
      className="signup w-screen h-screen flex justify-end overflow-y-hidden"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="container h-screen mt-10">
        <div className="text-center text-white text-4xl font-bold ">
          CREATE ACCOUNT
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto my-4 p-4 border rounded-lg items-center justify-center shadow-lg bg-white"
        >
          {sub && !Object.keys(errors).length && (
            <>
              <h2 className="text-green-600 text-2xl font-bold">
                Registration Successful!
              </h2>
              <h1 className="mb-5 text-blue-700 font-semibold">
                Click here to proceed!
              </h1>
            </>
          )}

<div
            className="auth mb-4 flex justify-center"
            onClick={handleGoogleClick}
          >
            {/* Render Google sign-up button */}
            <button className=" mt-1 flex items-center justify-center border rounded-full px-7">
              <div>Sign Up With Google</div>
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
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              })}
              id="Name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Name"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email",
                },
              })}
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Bio"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Bio
            </label>
            <input
              {...register("bio", {
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
              })}
              id="Bio"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Bio"
            />
            {errors.Bio && (
              <span className="text-red-600 text-sm">{errors.Bio.message}</span>
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
                  message:
                    "Password must contain at least one special character",
                },
              })}
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Password"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Repeat Password
            </label>
            <input
              {...register("repeat_password", {
                required: "Repeat Password is required",
                validate: (value) =>
                  value === password || "Password doesn't match",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
                  message: "Repeat your Password",
                },
              })}
              id="repeatPassword"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Repeat your Password"
            />
            {errors.repeat_password && (
              <span className="text-red-600 text-sm">
                {errors.repeat_password.message}
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
              Sign Up
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            Already have an account ?
            <span className="underline font-bold cursor-pointer">
              <Link to="/login"> Login here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
