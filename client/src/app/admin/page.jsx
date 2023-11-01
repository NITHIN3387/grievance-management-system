"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import authAdmin from "@utils/authAdmin";

import Profile from "@assets/images/profile.jpg";
import Image from "next/image";
import config from "@config/serverConfig";
import Loader from "@components/Loader";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  const [complaints, setComplaints] = useState([]);
  const [locationFrequency, setLocationFrequency] = useState([]);
  const [statusColl, setStatusColl] = useState([]);
  const [statusFrequency, setStatusFrequency] = useState([]);

  const router = useRouter();
  const loading = useRef()

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
          setComplaints(res.data);

          setLocationFrequency(() => {
            let temp = {};

            for (let ele of res.data) {
              const location = ele.location.split(",");
              const dist = location[location.indexOf(" Karnataka") - 1];

              temp[dist] ? (temp[dist] += 1) : (temp[dist] = 1)
            }

            temp = Object.entries(temp)
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

            return temp;
          });

          await Promise.all(
            res.data.map(
              async (data) =>
                await fetch(config.serverUrl + "/action/get/" + data._id, {
                  method: "GET",
                }).then((res) => res.json())
            )
          ).then((val) => {
            setStatusColl(val);

            setStatusFrequency(() => {
              let temp = {};

              for (let ele of val) {
                temp[ele.data.status]
                  ? (temp[ele.data.status] += 1)
                  : (temp[ele.data.status] = 1);
              }

              return temp;
            });
          });
        })
        .then(() => loading.current.classList.add("hidden"))
    };
    loadComplaints();
    auth();
  }, []);

  return (
    <WebsiteLayout>
      <div ref={loading}>
        <Loader />
      </div>
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
                {statusFrequency["on progress"]
                  ? statusFrequency["on progress"]
                  : 0}
              </span>
            </div>
            <div className="flex flex-col items-center bg-green-700 hover:bg-green-800 text-white xl:p-4 lg:p-3 p-2 rounded-lg cursor-pointer">
              <span className="text-center text-slate-100 xl:text-[1em] lg:text-[0.74em] sm:text-[0.75em] text-[0.9rem]">
                Number of
                <br />
                solved Problems:
              </span>
              <span className="text-[4em] font-bold">
                {statusFrequency?.solved ? statusFrequency.solved : 0}
              </span>
            </div>
          </div>
          <header className="text-[1.5em] font-bold my-5">
            Location with highest complaints
          </header>
          <div className="grid sm:grid-cols-[4fr_1fr] gap-5">
            {/* table  */}
            <div className="flex flex-col">
              {/* table head  */}
              <div className="grid grid-cols-[1fr_6rem]">
                <div className="border h-fit p-3 w-[100%] bg-slate-300 rounded-tl-lg">
                  Location
                </div>
                <div className="border h-fit p-3 text-center bg-slate-300  rounded-tr-lg">
                  Count
                </div>
              </div>
              <div className=" overflow-y-scroll h-[calc(100vh-30rem)]">
                {Object.keys(locationFrequency).map((key) => (
                  // {/* table row  */}
                  <div className="grid grid-cols-[1fr_6rem]">
                    <div className="border h-fit p-3 w-[100%]">{key}</div>
                    <div className="border h-fit p-3 text-center">
                      {locationFrequency[key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* percentage  */}
            <div className="p-3 flex flex-col items-center">
              <div
                className="bg-green-500 h-40 w-40 grid p-5 rounded-full shadow-2xl"
                style={{
                  backgroundImage: `conic-gradient(green ${
                    parseInt(
                      (statusFrequency.solved / complaints.length) * 100
                    ) || 0
                  }%, white 0%)`,
                }}
              >
                <div className="bg-white rounded-full flex justify-center items-center shadow-inner border text-[2em] font-bold text-green-700">
                  {parseInt(
                    (statusFrequency.solved / complaints.length) * 100
                  ) || 0}
                  %
                </div>
              </div>
              <header className="text-[1.5em] font-bold mt-5 text-center">
                Problem
                <br />
                Solve Rate
              </header>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default Dashboard;
