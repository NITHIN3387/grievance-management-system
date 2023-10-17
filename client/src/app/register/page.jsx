"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import RegistrerBgImage from "@assets/images/registrer-page-bg.jpeg";
import PasswordVisible from "@assets/images/password-visible.png";
import PasswordHide from "@assets/images/password-hide.png";
import config from "@config/serverConfig";

const Register = () => {
  // variables to store the details enter by the user for register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState({houseName: "", streetName: "", city: "", district: "", state: "", pincode: "",});
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  //variable which determine the state of the password(visible or hidden)
  const [passwordState, setPasswordState] = useState(false);
  const [confirmPasswordState, setConfirmPasswordState] = useState(false);

  const router = useRouter();

  // variables which has reference to the DOMS which is user to display error effect
  const emailDoc = useRef();
  const emailError = useRef();
  const passwordError = useRef();
  const confirmPassword = useRef();
  const passwordDoc = useRef();
  const passwordLenghtError = useRef();

  // function to add the error effect
  const addErrorEffect = (err) => {
    // checking whether it a email err or password confirmatio err or password length too small err
    if (err == "email") {
      emailError.current.classList.remove("hidden");
      emailDoc.current.classList.add("border-red-500");
      emailDoc.current.classList.remove("border-slate-300");
    } else if (err == "to-short-password") {
      passwordLenghtError.current.classList.remove("hidden");
      passwordDoc.current.classList.add("border-red-500");
      passwordDoc.current.classList.remove("border-slate-300");
    } else {
      passwordError.current.classList.remove("hidden");
      confirmPassword.current.classList.add("border-red-500");
      confirmPassword.current.classList.remove("border-slate-300");
    }
  };

  // function to remove the error effect
  const removeErrorEffect = (err) => {
    // checking whether it a email err or password confirmation err or password length too small err
    if (err == "email") {
      emailError.current.classList.value.includes("hidden") ? null : emailError.current.classList.add("hidden");
      emailDoc.current.classList.value.includes("border-red-500") ? null : emailDoc.current.classList.remove("border-red-500");
      emailDoc.current.classList.value.includes("border-slate-300") ? null : emailDoc.current.classList.add("border-slate-300");
    } else if ((err = "to-short-password")) {
      passwordLenghtError.current.classList.value.includes("hidden") ? null : passwordLenghtError.current.classList.add("hidden");
      passwordDoc.current.classList.value.includes("border-red-500") ? null : passwordDoc.current.classList.remove("border-red-500");
      passwordDoc.current.classList.value.includes("border-slate-300") ? null : passwordDoc.current.classList.add("border-slate-300");
    } else {
      passwordError.current.classList.value.includes("hidden") ? null : passwordError.current.classList.add("hidden");
      confirmPassword.current.classList.value.includes("border-red-500") ? null : confirmPassword.current.classList.remove("border-red-500");
      confirmPassword.current.classList.value.includes("border-slate-300") ? null : confirmPassword.current.classList.add("border-slate-300");
    }
  };

  // function to handle the Register of a user
  const handleRegister = async (e) => {
    if (![name, email, mobile, password, confirm].includes("") && !Object.values(address).includes("")){  //checking whether any input is empty or not
      e.preventDefault(); //preventing default reload of the page when registration form is submitted

      // calling functoins to remove the error effect
      removeErrorEffect("password-confirm");
      removeErrorEffect("email");
      removeErrorEffect("to-short-password");

      if (password.length < 8) {
        //checking whether password satisfy the minimum length
        addErrorEffect("to-short-password");
      } else if (password === confirm) {
        // checking whether password and confirm password matches
        try {
          // fetching the api to register the user
          await fetch(config.serverUrl + "/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
            },
            body: JSON.stringify({
              name,
              email,
              mobile,
              address,
              password,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status == "duplicate")
                // checking whether the email is already registered or not
                addErrorEffect(
                  "email"
                ); //adding error effect for duplicate email id register
              else if (res.status == "success")
                // checking whether registration is successfull or not
                router.push("/login"); // routing to the login page
              else console.log("internal server error");
            });
        } catch (err) {
          console.log("fail to register\n", err);
        }
      } else {
        addErrorEffect("password-confirm"); // adding error effect for mismatch of password and confirm password
      }
    }
  };

  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-[4fr_5fr] grid-cols-1">
      {/* background image of the register page  */}
      <div className="xl:p-10 lg:ps-5 p-10 items-center lg:flex hidden">
        <Image
          src={RegistrerBgImage}
          alt="regester background image"
          height={"100%"}
          priority
        />
      </div>

      {/* register form of the register page  */}
      <div className="flex flex-col justify-center sm:px-12 px-6 py-6 h-[100vh] overflow-y-scroll xl:gap-12 lg:gap-0">
        <p className="text-[2.2em] font-bold xl:mt-0 mt-12 xl:mb-0 mb-6">Register</p>

        <form className="" onSubmit={(e) => handleRegister(e)}>
          {/* User name */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="username">
              Name:
            </label>
            <input
              type="text"
              className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
              id="username"
              placeholder="Enter your name here"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
              id="email"
              placeholder="Enter your email id here"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailDoc}
              required
            />
            <p
              className="text-[0.85em] text-red-500 hidden"
              id="email-error"
              ref={emailError}
            >
              * Already a user has registered with this email id
            </p>
          </div>

          {/* Mobile number */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="mobile-number">
              Mobile Number:
            </label>
            <input
              type="number"
              className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
              id="mobile-number"
              placeholder="Enter your mobile number here"
              autoComplete="off"
              required
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]">Address:</label>

            {/* House Number street name*/}
            <div className="grid grid-cols-[1fr_2fr] gap-2">
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-tl-[5px] w-[100%]"
                placeholder="House No."
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, houseName: e.target.value })
                }
              />
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-tr-[5px] w-[100%]"
                placeholder="Street name"
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, streetName: e.target.value })
                }
              />
            </div>

            {/* City Name and District */}
            <div className="grid grid-cols-[1fr_1fr] gap-2">
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 w-[100%]"
                placeholder="City"
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500  w-[100%]"
                placeholder="District"
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, district: e.target.value })
                }
              />
            </div>

            {/* Statet and Pincode */}
            <div className="grid sm:grid-cols-[3fr_1fr] grid-cols-[4fr_3fr] gap-2">
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500  w-[100%] rounded-bl-[5px]"
                placeholder="State"
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
              <input
                type="number"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500  w-[100%] rounded-br-[5px]"
                placeholder="Pin code"
                autoComplete="off"
                required
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-3 relative">
            <label className="text-[1.1em]" htmlFor="password">
              Password:
            </label>
            <div className="flex items-center">
              <input
                type={passwordState ? "text" : "password"}
                className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 w-[100%]"
                id="password"
                placeholder="Enter your password here"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordDoc}
                required
              />
              <Image
                src={passwordState ? PasswordVisible : PasswordHide}
                alt="password state"
                width={"50"}
                className=" scale-[0.5] absolute right-0"
                onClick={() =>
                  setPasswordState((preCondition) => !preCondition)
                }
                priority
              />
            </div>
            <p
              className="text-[0.85em] text-red-500 hidden"
              id="password-lenght-error"
              ref={passwordLenghtError}
            >
              * Password must have at least 8 characters
            </p>
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2 mb-3 relative">
            <label className="text-[1.1em]" htmlFor="confirm-password">
              Confirm password:
            </label>
            <div className="flex items-center">
              <input
                type={confirmPasswordState ? "text" : "password"}
                className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 w-[100%]"
                id="confirm-password"
                placeholder="Confirm your password"
                autoComplete="off"
                onChange={(e) => setConfirm(e.target.value)}
                ref={confirmPassword}
                required
              />
              <Image
                src={confirmPasswordState ? PasswordVisible : PasswordHide}
                alt="password state"
                width={"50"}
                className=" scale-[0.5] absolute right-0"
                onClick={() =>
                  setConfirmPasswordState((preCondition) => !preCondition)
                }
                priority
              />
            </div>
            <p
              className="text-[0.85em] text-red-500 hidden"
              id="password-error"
              ref={passwordError}
            >
              * Password didn't match
            </p>
          </div>

          <div className="flex sm:flex-row flex-col-reverse justify-between mt-10 sm:items-center">
            {/* submit button  */}
            <button
              className="border border-slate-300 rounded-[5px] py-2 px-5 bg-blue-600 text-white hover:shadow-[2px_2px_10px_rgba(0,0,0,0.4)] focus:bg-blue-500 focus:shadow-none transition-all ease-out delay-100"
              onClick={(e) => handleRegister(e)}
            >
              Register
            </button>

            {/* link to Login page  */}
            <div className="flex gap-1 sm:mb-0 mb-5">
              <p>Already have an accout?</p>
              <Link href="/login" className=" text-blue-600 font-semibold">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
