'use client'

import departmentList from "@utils/departmentList";
import { useState } from "react";
import Select from "react-select";

const DialogBoxGrievance = ({display, hide}) => {
    // checking whether we have to display dialog box or not 
    if (!display) return null

    //variables to store the input given by user
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])  // storing the current date in the formate yyyy-mm-dd

    return (
        <div className="fixed bg-black w-[100%] h-[100%] inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="blur-bg" onClick={(e) => e.target.id == 'blur-bg' ? hide(false) : null}>
            <div className="load-dialog-box grid gap-5 bg-white p-5 rounded-lg w-[50%]">
                <div className="text-[1.75em] font-bold">Raise your problem</div>

                <form className="grid gap-4">
                    {/* complaint text  */}
                    <div className="grid gap-2">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            rows="5"
                            className="border border-slate-300 rounded-md px-2 py-1 focus:outline-blue-500"
                            id="description"
                            placeholder="Write details about the problem here"
                        />
                    </div>

                    {/* date and department  */}
                    <div className="grid grid-cols-[1fr_2fr] gap-5">
                        {/* date  */}
                        <div className="grid gap-2">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                className="border border-slate-300 rounded-md px-2 py-1 focus:outline-blue-500"
                                id="date"
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* department  */}
                        <div className="grid gap-2">
                            <label>Department:</label>
                            <Select
                                options={departmentList}
                                placeholder="Select the department"
                            />
                        </div>
                    </div>

                    {/* upload file  */}
                    <div className="grid gap-2">
                        <label htmlFor="upload-photo">Upload photo:</label>
                        <input
                            type="file"
                            className="border border-slate-300 rounded-md p-1"
                            id="upload-photo"
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>

                    {/* submit button  */}
                    <div>
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:shadow-[2px_2px_10px_rgba(0,0,0,0.4)] focus:bg-blue-500 focus:shadow-none transition-all ease-out delay-100"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DialogBoxGrievance;
