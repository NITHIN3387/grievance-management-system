"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import LoginBgImage from "@assets/images/LoginPage.webp";
import PasswordVisible from "@assets/images/password-visible.png";
import PasswordHide from "@assets/images/password-hide.png";

import config from "@config/serverConfig";

const login = () => {
  //variables to store the values given by the user as input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //variable which determine the state of the password(visible or hidden)
  const [passwordState, setPasswordState] = useState(false);

  const router = useRouter();

  //variable reffering to the DOM to add effor effect
  const errMsg = useRef();

  // function to handle the login of a user and admin
  const handleLogin = async (e) => {
    if (![email, password].includes("")){  //checking whether any input is empty or not
      e.preventDefault();  //preventing default reload of the page when registration form is submitted

      //removing the error effect of invalid user or password
      errMsg.current.classList.value.includes("hidden") ? null : errMsg.current.classList.add("hidden");

      try {
        await fetch(config.serverUrl + "/user/login", { //api for login user and admin
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            //checking whether login is successfull or not
            if (res.status == "success")
              //checking whether login user is a admin or not
              if (email.split("@")[1] == "mcc.gov.in")
                router.replace("/admin/" + res.data[0]._id);
              else router.replace("/user/" + res.data[0]._id);
            else errMsg.current.classList.remove("hidden"); //adding error effect on the invalid email or password
            console.log("Login successfull")
          });
      } catch (err) {
        console.log("fail to login\n", err);
      }
    }
  };

  return (
    <div className="grid xl:grid-cols-2 md:grid-cols-[4fr_5fr] grid-cols-1">
      {/* background image of the Login page  */}
      <div className="p-10 md:flex hidden items-center">
        <Image
          src={LoginBgImage}
          alt="regester background image"
          height={"100%"}
          priority
        />
      </div>

      {/* Login form of the Login page  */}
      <div className="flex flex-col justify-center sm:px-12 px-6 py-7 h-[100vh] overflow-y-scroll">
        <p className="text-[2.2em] font-bold mb-10">Login</p>

        <form className="mt-10" onSubmit={(e) => handleLogin(e)}>
          {/* Email */}
          <div className="flex flex-col gap-4 mb-4">
            <label className="text-[1.1em]" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              className="border border-slate-300 rounded-[5px] py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              id="email"
              placeholder="Enter your email id here"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-3 relative">
            <label className="text-[1.1em]" htmlFor="password">
              Password:
            </label>
            <div className="flex items-center">
              <input
                type={passwordState ? "text" : "password"}
                className="border border-slate-300 rounded-[5px] py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-[100%]"
                id="password"
                placeholder="Enter your password here"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Image
                src={passwordState ? PasswordVisible : PasswordHide}
                alt="password state"
                width={"50"}
                className=" scale-[0.6] absolute right-1 bg-white"
                onClick={() =>
                  setPasswordState((preCondition) => !preCondition)
                }
              />
            </div>
            <p className="text-[0.85em] text-red-500 hidden" id="error-msg" ref={errMsg}>
              * Incorrect Email or Password
            </p>
          </div>

          <div className="flex sm:flex-row flex-col-reverse justify-between mt-10 sm:items-center">
            {/* submit button  */}
            <button
              className="rounded-[5px] py-2 px-5 bg-blue-600 text-white hover:shadow-[2px_2px_10px_rgba(0,0,0,0.4)] focus:bg-blue-500 focus:shadow-none transition-all ease-out delay-100"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>

            {/* link to User page  */}
            <div className="flex gap-1 sm:mb-0 mb-5">
              <p>Don't have an account?</p>
              <Link href="/register" className=" text-blue-600 font-semibold">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
