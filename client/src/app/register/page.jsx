'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import RegistrerBgImage from '@assets/images/registrer-page-bg.jpeg'
import PasswordVisible from '@assets/images/password-visible.png'
import PasswordHide from '@assets/images/password-hide.png'
import config from "@config/serverConfig";

const Register = () => {
  // variables to store the details enter by the user for register 
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [mobile, setMobile] = useState(null)
  const [address, setAddress] = useState({houseName: '', streetName: '', city: '', district: '', state: '', pincode: ''})
  const [password, setPassword] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const [passwordState, setPasswordState] = useState(false)

  const router = useRouter()

  // variables which has reference to the DOMS which is user to display error effect 
  const emailDoc = document.getElementById('email')
  const emailError = document.getElementById('email-error')
  const passwordError = document.getElementById('password-error')
  const confirmPassword = document.getElementById('confirm-password')
  const passwordDoc = document.getElementById('password')
  const passwordLenghtError = document.getElementById('password-lenght-error')

  // function to add the error effect 
  const addErrorEffect = (err) => {
    // checking whether it a email err or password confirmatio err or password length too small err
    if (err == 'email'){
      emailError.classList.remove('hidden')
      emailDoc.classList.add('border-red-500')
      emailDoc.classList.remove('border-slate-300')
    } else if (err == 'to-short-password'){
      passwordLenghtError.classList.remove('hidden')
      passwordDoc.classList.add('border-red-500')
      passwordDoc.classList.remove('border-slate-300')
    }else{
      passwordError.classList.remove('hidden')
      confirmPassword.classList.add('border-red-500')
      confirmPassword.classList.remove('border-slate-300')
    }
  }

  // function to remove the error effect 
  const removeErrorEffect = (err) => {
    // checking whether it a email err or password confirmation err or password length too small err
    if (err == 'email'){
      emailError.classList.value.includes('hidden') ? null : emailError.classList.add('hidden')
      emailDoc.classList.value.includes('border-red-500') ? null : emailDoc.classList.remove('border-red-500')
      emailDoc.classList.value.includes('border-slate-300') ? null : emailDoc.classList.add('border-slate-300')
    } else if (err = 'to-short-password'){
      passwordLenghtError.classList.value.includes('hidden') ? null : passwordLenghtError.classList.add('hidden')
      passwordDoc.classList.value.includes('border-red-500') ? null : passwordDoc.classList.remove('border-red-500')
      passwordDoc.classList.value.includes('border-slate-300') ? null : passwordDoc.classList.add('border-slate-300')
    }else {
      passwordError.classList.value.includes('hidden') ? null : passwordError.classList.add('hidden')
      confirmPassword.classList.value.includes('border-red-500') ? null : confirmPassword.classList.remove('border-red-500')
      confirmPassword.classList.value.includes('border-slate-300') ? null : confirmPassword.classList.add('border-slate-300')
    }
  }

  // function to handle the Register of a user 
  const handleRegister = async (e) => {
    e.preventDefault() //preventing default reload of the page when registration form is submitted

    // calling functoins to remove the error effect 
    removeErrorEffect('password-confirm')
    removeErrorEffect('email')
    removeErrorEffect('to-short-password')
    
    if (password.length < 8)  //checking whether password satisfy the minimum length
      addErrorEffect('to-short-password')
    else if (password === confirm){ // checking whether password and confirm password matches 
      try{
        // fetching the api to register the user 
        await fetch(config.serverUrl + '/user/register', {
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
            password
          })        
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 'duplicate')             // checking whether the email is already registered or not 
            addErrorEffect('email')                  //adding error effect for duplicate email id register
          else if (res.status == 'success')          // checking whether registration is successfull or not
            router.push('/login')                    // routing to the login page 
          else
            console.log('internal server error');
        })

      }catch(err){
        console.log('fail to register\n', err);
      }

    }else{
      addErrorEffect('password-confirm')            // adding error effect for mismatch of password and confirm password 
    }
  }

  return (
    <div className="grid grid-cols-2">
      {/* background image of the register page  */}
      <div className="p-10 flex items-center">
        <Image
          src={RegistrerBgImage}
          alt="regester background image"
          height={"100%"}
          priority
        />
      </div>

      {/* register form of the register page  */}
      <div className="flex flex-col justify-center px-12 py-6 h-[100vh] overflow-y-scroll">
        <p className="text-[2.2em] font-bold">Register</p>

        <form className="mt-10" onSubmit={(e) => handleRegister(e)}>

          {/* User name */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="username">Name:</label>                               
            <input
              type="text"
              className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
              id="username"
              placeholder="Enter your name here"
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

           {/* Email */}
          <div className="flex flex-col gap-2 mb-3">
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
            <p className="text-[0.85em] text-red-500 hidden" id="email-error">* Already a user has registered with this email id</p>
          </div>

          {/* Mobile number */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="mobile-number">Mobile Number:</label>                 
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
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-tl-[5px]"
                placeholder="House number / name"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, houseName: e.target.value})}
              />                                 
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-tr-[5px]"
                placeholder="Street name"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, streetName: e.target.value})}
              />                                 
            </div>

            {/* City Name and District */}
            <div className="grid grid-cols-[1fr_1fr] gap-2">
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="City"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, city: e.target.value})}
              />                                                  
              <input 
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="District"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, district: e.target.value})}
              />                                                  
            </div>

            {/* Statet and Pincode */}
            <div className="grid grid-cols-[3fr_1fr] gap-2">
              <input
                type="text"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-bl-[5px]"
                placeholder="State"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, state: e.target.value})}
              />                               
              <input
                type="number"
                className="border border-slate-300 py-1 px-2 focus:outline-none focus:ring focus:border-blue-500 rounded-br-[5px]"
                placeholder="Pin code"
                autoComplete="off"
                required
                onChange={(e) => setAddress({...address, pincode: e.target.value})}
              />                               
            </div>
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
            <p className="text-[0.85em] text-red-500 hidden" id="password-lenght-error">* Password must have at least 8 characters</p>
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-[1.1em]" htmlFor="confirm-password">Confirm password:</label>   
            <input
              type="password"
              className="border border-slate-300 rounded-[5px] py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
              id="confirm-password"
              placeholder="Confirm your password"
              autoComplete="off"
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
            <p className="text-[0.85em] text-red-500 hidden" id="password-error">* Password didn't match</p>
          </div>

          <div className="flex justify-between mt-10 items-center">
            {/* submit button  */}
            <button className="border border-slate-300 rounded-[5px] py-1 px-4 bg-blue-400 text-white" onClick={(e) => handleRegister(e)}>Register</button>

            {/* link to Login page  */}
            <div className="flex gap-1">
              <p>Already have an accout?</p>
              <Link href='/login' className=" text-blue-600 font-semibold">Log in</Link>
            </div>
          </div>

        </form>


      </div>
    </div>
  );
};

export default Register;
