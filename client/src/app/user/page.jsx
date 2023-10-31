"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import WebsiteLayout from "@layouts/WebsiteLayout";
import Profile from "@assets/images/profile.jpg";
import authUser from "@utils/authUser";

const Dashboard = () => {
  //varibale to store the login user details
  const [user, setUser] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      await authUser()
        .then((data) => {
          // checking whether user is authorized or not
          if (data) setUser(data);
          else router.replace("/login");
        })
        .catch((err) => {
          console.log("fail to fetch user details\n", err);
        });
    };

    auth();
  }, []);

  const totalProblemsCount = 10;
  const poorProblemsCount = 3;
  const pendingProblemsCount = 4;
  const onProcessProblemsCount = 2;
  const successProblemsCount = 1;

  return (
    <WebsiteLayout>
      {user ? (
        <div className="grid xl:grid-cols-[17.5rem_1fr] lg:grid-cols-[15rem_1fr] h-[calc(100vh-5rem)] overflow-y-scroll">
          {/* Profile image column */}
          <div className="lg:flex hidden flex-col gap-5 py-4 px-5 bg-blue-100">
            <header className="text-[1.5em] text-center font-bold">USER</header>
            <div className="xl:h-[11rem] lg:h-[9.7rem] xl:w-[11rem] lg:w-[9.7rem] mx-auto relative">
              <Image src={Profile} alt="no profile" layout="fill" objectFit='contain' className="rounded-full"/>
            </div>
            <div className="grid gap-5 mt-5">
              <div className="grid">
                <span className="font-bold">User Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="grid">
                <span className="font-bold">Email ID:</span>
                <span>{user.email}</span>
              </div>
              <div className="grid">
                <span className="font-bold">Mobile Number:</span>
                <span>{user.mobile || "NULL"}</span>
              </div>
              <div className="grid">
                <span className="font-bold">Address:</span>
                {
                  user.address ? (
                    <>
                      <span>{user.address?.houseName}, {user.address?.streetName}</span>
                      <span>{user.address?.city}, {user.address?.district}</span>
                      <span>{user.address?.state} - {user.address?.pincode}</span>
                    </>
                  ) : <span>NULL</span>
                }
              </div>
            </div>
          </div>

          {/* Status and counts column */}
          <div className="w-[100%] p-4">
            <header className="text-[1.5em] font-bold mb-5">Dashboard</header>
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-5">
              <div className="flex flex-col items-center bg-blue-800 hover:bg-blue-900 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
                <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">Number of<br />Problems Submitted</span>
                <span className="text-[4em] font-bold">{totalProblemsCount}</span>
              </div>
              <div className="flex flex-col items-center bg-red-700 hover:bg-red-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
                <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">Number of<br />Poor Problems</span>
                <span className="text-[4em] font-bold">{poorProblemsCount}</span>
              </div>
              <div className="flex flex-col items-center bg-gray-700 hover:bg-gray-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
                <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">Number of<br />Pending Problems:</span>
                <span className="text-[4em] font-bold">{pendingProblemsCount}</span>
              </div>
              <div className="flex flex-col items-center bg-yellow-500 hover:bg-yellow-600 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
                <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">Number of Problems<br /> on Progress:</span>
                <span className="text-[4em] font-bold">{onProcessProblemsCount}</span>
              </div>
              <div className="flex flex-col items-center bg-green-700 hover:bg-green-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
                <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">Number of<br />solved Problems:</span>
                <span className="text-[4em] font-bold">{successProblemsCount}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Processing..."
      )}

      {/* Ongoing and Solved Rate Ratio Section */}
    </WebsiteLayout>
  );
};

export default Dashboard;
