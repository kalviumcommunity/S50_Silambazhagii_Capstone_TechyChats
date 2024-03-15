import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import bg from '../assets/signup-bg.png'

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSub(true);
    navigate("/main");
    
  };

  const password = watch("password", " ");

  const [sub, setSub] = useState(false);

  return (
    <div className="signup w-screen h-screen" style={{backgroundImage: `url(${bg})`}}>
     <div className="container  w-screen h-screen mt-10" >
      <div className="text-center text-white text-4xl font-bold">CREATE ACCOUNT</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-4 p-4 border rounded-lg shadow-lg bg-white"
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

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Name
          </label>
          <input
            {...register("Name", {
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
          {errors.Name && (
            <span className="text-red-600 text-sm">{errors.Name.message}</span>
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
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Add Bio
          </label>
          <input
            id="bio"
            type="bio"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your Bio"
          />
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
                message: "Password must contain at least one special character",
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
            {...register("repeatPassword", {
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
          {errors.repeatPassword && (
            <span className="text-red-600 text-sm">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <div className="flex text-sm">
          <input
            type="checkbox"
            id="agree"
            {...register("agree", {
              required: " You must accept all the terms and conditions",
            })}
          />
          <label className="ml-3 cursor-pointer">
            I agree all statements in{" "}
            <span className="underline">Terms of service</span>
          </label>
        </div>
        {errors.agree && (
          <span className="text-red-600 text-sm">{errors.agree.message}</span>
        )}

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
          {" "}
          Already have an account ?{" "}
          <span className="underline font-bold cursor-pointer">Login here</span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Signup;
