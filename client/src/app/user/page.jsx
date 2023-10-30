"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import authUser from "@utils/authUser";
import Image from 'next/image'


import Profile from '@assets/images/userProfile.jpeg'
import RatioImage from '@assets/images/ratio.jpeg'


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      await authUser()
        .then((data) => {
          data ? setUser(data) : router.replace("/login");
        })
        .catch((err) => {
          console.log("Failed to fetch User details\n", err);
        });
    };

    auth();
  }, []);
  const [percentage, setPercentage] = useState(65);

  return (
    <WebsiteLayout>
      <div>
        <div className="flex flex-col md:flex-row">
          {" "}
          {/* Added flex-col for mobile and flex-row for desktop */}
          <div className="w-full md:w-1/5 h-auto md:h-screen bg-sky-300 border-r-2  gap-4 md:gap-0">
            <h1 className="text-center font-medium mt-3 text-2xl text-white">User</h1>
            <div className="flex flex-col items-center gap-4 mt-4">
              <div>
              <Image 
              className="rounded-full"
              src={Profile} 
               alt="no profile"
               width={200} 
                height={260} />
              </div>
              <div>
              {user ? <p className="text-white">user name: {user.name}</p> : 'Processing.....'}
              <br />
               {user ? <p className="text-white ">email ID: {user.email}</p> : 'Processing.....'}
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/5 p-3">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Replaced h-40 with h-auto to make the boxes adaptive */}
              <div className="h-auto gap-2 flex flex-col border-2 border-blue-800 bg-blue-500 p-4 text-center text-white items-center ">
                <div className="text-xl px-3">Total Problems</div>
                <div className="text-5xl">10</div>
              </div>
              <div className="h-auto gap-2 flex flex-col border-2 border-gray-800 bg-gray-500 p-4 text-center text-white items-center ">
                <div className="text-xl px-3">Pending Problems</div>
                <div className="text-5xl">3</div>
              </div>
              <div className="h-auto gap-2 flex flex-col border-2 border-yellow-800 bg-yellow-500 p-4 text-center text-white items-center ">
                <div className="text-xl px-3">Solved Problems</div>
                <div className="text-5xl">3</div>
              </div>
              <div className="h-auto gap-2 flex flex-col border-2 border-green-600 bg-green-800 p-4 text-center text-white items-center ">
                <div className="text-xl px-3">Ongoing problems</div>
                <div className="text-5xl">3</div>
              </div>
              <div className="h-auto gap-2 flex flex-col border-2 border-red-600 bg-red-800 p-4 text-center text-white items-center ">
                <div className="text-xl px-3">Poor Problems</div>
                <div className="text-5xl">1</div>
              </div>
            </div>
            <div className="p-3 relative">
              <div class="w-40 h-40 shadow-lg rounded-full p-4">
                <div class="w-32 h-32  text-3xl font-semibold flex justify-center items-center">
                  {percentage}%
                </div>
              </div>
              <svg class="w-40 h-40 absolute top-3 left-3">
                <circle cx="80" cy="80" r="69" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default Dashboard;
