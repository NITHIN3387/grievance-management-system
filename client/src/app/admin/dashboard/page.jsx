import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl py-4 px-3 bg-purple-600 font-semibold text-white">
        Admin Dashboard
      </h1>
      <div className="flex">
        <div className="w-3/12 h-screen bg-blue-200 border-r-2 border-blue-400 gap-4">
          <h1 className="text-center font-medium mt-3 text-2xl">Admin</h1>
          <div className="flex flex-col items-center gap-4 mt-4">
            <div>
              <img src="" alt="image here" />
            </div>
            <div>
              <p>Admin name</p>
              <p>Admin Email</p>
            </div>
          </div>
        </div>
        <div className="w-9/12 p-3">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-40 gap-2 flex flex-col border-2 border-blue-600 bg-blue-500 p-4 text-center text-white items-center">
              <div className="h-1/2 text-xl px-3">Total Problems</div>
              <div className="h-1/2 text-5xl">10</div>
            </div>
            <div className="h-40 gap-2 flex flex-col border-2 border-gray-600 bg-gray-500 p-4 text-center text-white items-center">
              <div className="h-1/2 text-xl px-3">Pending Problems</div>
              <div className="h-1/2 text-5xl">3</div>
            </div>
            <div className="h-40 gap-2 flex flex-col border-2 border-yellow-600 bg-yellow-500 p-4 text-center text-white items-center">
              <div className="h-1/2 text-xl px-3">Solved Problems</div>
              <div className="h-1/2 text-5xl">3</div>
            </div>
            <div className="h-40 gap-2 flex flex-col border-2 border-green-600 bg-green-500 p-4 text-center text-white items-center">
              <div className="h-1/2 text-xl px-3">Ongoing problems</div>
              <div className="h-1/2 text-5xl">3</div>
            </div>
            <div className="h-40 gap-2 flex flex-col border-2 border-red-600 bg-red-500 p-4 text-center text-white items-center">
              <div className="h-1/2 text-xl px-3">Poor Problems</div>
              <div className="h-1/2 text-5xl">1</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;
