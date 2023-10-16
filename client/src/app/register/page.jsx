import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="grid grid-cols-2">
      {/* background image of the register page  */}
      <div>
        <Image
          src=""
          alt="regester background image"
          width="100%"
          height='100%'
        />
      </div>

      {/* register form of the register page  */}
      <div className="flex flex-col justify-center px-12 py-6">
        <p className="text-[2em] font-bold">Register</p>

        <form className="mt-10">

          {/* User name */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="username">Name:</label>                               
            <input autoComplete="off" className="border border-slate-300 rounded-[5px] py-1 px-2" type="text" id="username" placeholder="Enter your name here"/>
          </div>

           {/* Email */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="email">Email:</label>                              
            <input autoComplete="off" className="border border-slate-300 rounded-[5px] py-1 px-2" type="text" id="username" placeholder="Enter your email id here"/>
            <p className="text-[0.85em] hidden">Already a user has registered with this email id</p>
          </div>

          {/* Mobile number */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="mobile-number">Mobile Number:</label>                 
            <input autoComplete="off" className="border border-slate-300 rounded-[5px] py-1 px-2" type="number" id="mobile-number" placeholder="Enter your mobile number here"/>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]">Address:</label>

            {/* House Number street name*/}
            <div className="grid grid-cols-[1fr_2fr] gap-2">
              <input autoComplete="off" className="border border-slate-300 py-1 px-2 rounded-tl-[5px]" type="text" placeholder="House number / name"/>                                 
              <input autoComplete="off" className="border border-slate-300 py-1 px-2 rounded-tr-[5px]" type="text" placeholder="Street name"/>                                 
            </div>

            {/* City Name and District */}
            <div className="grid grid-cols-[1fr_1fr] gap-2">
              <input autoComplete="off" className="border border-slate-300 py-1 px-2" type="text" placeholder="City"/>                                                  
              <input autoComplete="off" className="border border-slate-300 py-1 px-2" type="text" placeholder="District"/>                                                  
            </div>

            {/* Statet and Pincode */}
            <div className="grid grid-cols-[3fr_1fr] gap-2">
              <input autoComplete="off" className="border border-slate-300 py-1 px-2 rounded-bl-[5px]" type="text" placeholder="State"/>                               
              <input autoComplete="off" className="border border-slate-300 py-1 px-2 rounded-br-[5px]" type="number" placeholder="Pin code"/>                               
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="password">Password:</label>                           
            <input autoComplete="off" className="border border-slate-300 rounded-[5px] py-1 px-2" type="password" id="password" placeholder="Enter your password here"/>
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="confirm-password">Confirm password:</label>   
            <input autoComplete="off" className="border border-slate-300 rounded-[5px] py-1 px-2" type="password" id="confirm-password" placeholder="Confirm your password"/>
          </div>

          <div className="flex justify-between mt-10 items-center">
            {/* submit button  */}
            <button className="border border-slate-300 rounded-[5px] py-1 px-4 bg-blue-400 text-white">Register</button>

            {/* link to Login page  */}
            <div className="flex gap-1">
              <p>Already have an accout?</p>
              <Link href='/login'>Log in</Link>
            </div>
          </div>

        </form>


      </div>
    </div>
  );
};

export default Register;
