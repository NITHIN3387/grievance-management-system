'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import WebsiteLayout from '@layouts/WebsiteLayout'
import Profile from '@assets/images/userProfile.jpeg'
import RatioImage from '@assets/images/ratio.jpeg'
import authUser from '@utils/authUser'

const Dashboard = () => {
  //varibale to store the login user details
  const [user, setUser] = useState(null)

  const router = useRouter()
  
  useEffect(() => {
    // fetching logged in  user details
    const auth = async () => {
      await authUser()
      .then((data) => {
        // checking whether user is authorized or not 
        if (data)
          setUser(data)
        else
          router.replace("/login")
      })
      .catch((err) => {
        console.log("fail to fetch user details\n", err);
      })
    }

    auth()
  }, [])


  const totalProblemsCount = 10;
  const poorProblemsCount = 3;
  const pendingProblemsCount = 4;
  const onProcessProblemsCount = 2;
  const successProblemsCount = 1;

  
  return (
    <WebsiteLayout>
      {user ? (
        <div className="flex">
          {/* Profile image column */}
          <div className="w-1/4 p-4  ">
            <Image src={Profile} 
            alt="no profile"
             width={200} 
             height={260} />
             <br/>
            {user ? <p>user name: {user.name}</p> : 'Processing.....'}
            <br />
            {user ? <p>email ID: {user.email}</p> : 'Processing.....'}
          </div>

          {/* Status and counts column */}
          <div className="w-3/4 p-4">
            <div className="flex items-center gap-4">
              <div className="cursor-pointer">
                <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 px-2 rounded">
                  Total Problems Submitted: {totalProblemsCount}
                </button>
              </div>
              <div className="cursor-pointer">
                <button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-4 px-2 rounded">
                  Poor Problems: {poorProblemsCount}
                </button>
              </div>
              <div className="cursor-pointer">
                <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-4 px-2 rounded">
                  Pending Problems: {pendingProblemsCount}
                </button>
              </div>
              <div className="cursor-pointer">
                <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-4 px-2 rounded">
                  Problems on Process: {onProcessProblemsCount}
                </button>
              </div>
              <div className="cursor-pointer">
                <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-4 px-2 rounded">
                  Successful Resolutions: {successProblemsCount}
                </button>
              </div>
            </div>
            <div className="flex items-right gap-15 mt-20">
        <div className="w-1/2 p-4">
          {/* Add your ratio information here */}
          <h2 className="text-2xl font-semibold text-right">Ongoing and Solved Rate Ratio</h2>
          <p className='text-right'>Insert your ratio details and explanation here.</p>
        </div>
        <div className="w-1/2 p-4 ">
          <Image src={RatioImage} 
          alt="Ratio Image" 
          width={100}
           height={150} />
        </div>
      </div>
            
          </div>
          
        </div>
        
      ) : (
        'Processing...'
      )}
     
      {/* Ongoing and Solved Rate Ratio Section */}
      
       
    </WebsiteLayout>
  );
}

export default Dashboard