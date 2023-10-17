'use client'
import Image from "next/image";
import Link from "next/link";
import LoginBgImage from '@assets/images/LoginPage.webp';
import React, { useState } from "react";

const login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const handlelogin = async (e) => {
        e.preventDefault()
        console.log(email,password)
    }
    return (
        <div className="grid grid-cols-2">
          {/* background image of the Login page  */}
          <div className="p-10 flex items-center">
            <Image
              src={LoginBgImage}
              alt="regester background image"
              height={"100%"}
              priority
            />
          </div>
    
          {/* Login form of the Login page  */}
          <div className="flex flex-col justify-center px-12 py-7 h-[100vh] overflow-y-scroll">
            <p className="text-[2.2em] font-bold mb-10">Login</p>
              

            <form className="mt-10" onSubmit={(e) => handlelogin(e)}>
               {/* Email */}
              <div className="flex flex-col gap-4 mb-4">
                <label className="text-[1.1em]" htmlFor="email">Email:</label>                              
                <input
                  type="text"
                  className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
                  id="email"
                  placeholder="Enter your email id here"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
    
              {/* Password */}
              <div className="flex flex-col gap-2 mb-3">
                <label className="text-[1.1em]" htmlFor="password">Password:</label>  
                <div className="flex">
                  <input
                    type="password"
                    className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
                    id="password"
                    placeholder="Enter your password here"
                    autoComplete="off"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <Image 
                    src={passwordState ? PasswordVisible : PasswordHide}
                    alt="password state"
                    width={"50"}
                    height={"1"}
                    className="relative"
                  /> */}
                </div>                         
                <p className="text-[0.85em] text-red-500 hidden" id="password-lenght-error">* Incorrect Email or Password</p>
              </div>
    
              
    
              <div className="flex justify-between mt-10 items-center">
                {/* submit button  */}
                <button className="border border-slate-300 rounded-[5px] py-1 px-4 bg-blue-400 text-white" onClick={(e) => handlelogin(e)}>Login</button>
    
                {/* link to User page  */}
                <div className="flex gap-1">
                  <p>Don't have an account?</p>
                  <Link href='/register' className=" text-blue-600 font-semibold">Register</Link>
                </div>
              </div>
    
            
            </form>
    
          </div>
        </div>
      );
}

export default login