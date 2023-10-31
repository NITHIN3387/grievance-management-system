"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import authAdmin from "@utils/authAdmin";

import Profile from "@assets/images/profile.jpg";
import Image from "next/image";
import { Archivo_Narrow } from "next/font/google";
import config from "@config/serverConfig";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [statusFrequency, setStatusFrequency] = useState([]);
  const [statusColl, setStatusColl] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      await authAdmin()
        .then((data) => {
          data ? setAdmin(data) : router.replace("/login");
        })
        .catch((err) => {
          console.log("Failed to fetch admin details\n", err);
        });
    };
    const loadComplaints = async () => {
      await fetch(config.serverUrl + "/problems/get", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res)
          await Promise.all(
            res.data.map(
              async (data) =>
                await fetch(config.serverUrl + "/action/get/" + data._id, {
                  method: "GET",
                })
                  .then((res) => res.json())
                  .then(async (res) => {
                    // console.log(res)
                    setStatusFrequency(() => {
                      let temp = {};
                      for (let ele of res.data) {
                        temp[ele.status]
                          ? (temp[ele.status] += 1)
                          : (temp[ele.status] = 1);
                      }
                      return temp;
                    });
                  })
            )
          ).then((val) => {
            setStatusColl(val);
          });
        });
    };
    loadComplaints();
    auth();
  }, []);

  const [percentage, setPercentage] = useState(65);

  return (
    <WebsiteLayout>
      <div className="grid xl:grid-cols-[17.5rem_1fr] lg:grid-cols-[15rem_1fr] h-[calc(100vh-5rem)] overflow-y-scroll">
        {/* Profile image column */}
        <div className="lg:flex hidden flex-col gap-5 py-4 px-5 bg-blue-100">
          <header className="text-[1.5em] text-center font-bold">ADMIN</header>
          <div className="xl:h-[11rem] lg:h-[9.7rem] xl:w-[11rem] lg:w-[9.7rem] mx-auto relative">
            <Image
              src={Profile}
              alt="no profile"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
          <div className="grid gap-5 mt-5">
            <div className="grid">
              <span className="font-bold">Admin Name:</span>
              <span>{admin?.name}</span>
            </div>
            <div className="grid">
              <span className="font-bold">Email ID:</span>
              <span>{admin?.email}</span>
            </div>
          </div>
        </div>

        {/* Status and counts column */}
        <div className="w-[100%] p-4">
          <header className="text-[1.5em] font-bold mb-5">Dashboard</header>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-5">
            <div className="flex flex-col items-center bg-blue-800 hover:bg-blue-900 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of
                <br />
                Problems
              </span>
              <span className="text-[4em] font-bold">{statusColl.length}</span>
              {/* {console.log(statusFrequency)} */}
            </div>
            <div className="flex flex-col items-center bg-red-700 hover:bg-red-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of
                <br />
                Poor Problems
              </span>
              <span className="text-[4em] font-bold">
                {statusFrequency?.poor ? statusFrequency.poor : 0}
              </span>
            </div>
            <div className="flex flex-col items-center bg-gray-700 hover:bg-gray-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of
                <br />
                Pending Problems:
              </span>
              <span className="text-[4em] font-bold">
                {statusFrequency?.pending ? statusFrequency.pending : 0}
              </span>
            </div>
            <div className="flex flex-col items-center bg-yellow-500 hover:bg-yellow-600 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of Problems
                <br /> on Progress:
              </span>
              <span className="text-[4em] font-bold">
                {statusFrequency?.onprogress ? statusFrequency.onprogress : 0}
              </span>
            </div>
            <div className="flex flex-col items-center bg-green-700 hover:bg-green-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of
                <br />
                solved Problems:
              </span>
              <span className="text-[4em] font-bold">
                {statusFrequency?.success ? statusFrequency.success : 0}
              </span>
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
