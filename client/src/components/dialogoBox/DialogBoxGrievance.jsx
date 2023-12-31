'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import config from "@config/serverConfig";
import auth from "@utils/authUser";
import Loader from "@components/Loader";

const DialogBoxGrievance = ({display, hide}) => {
    // checking whether we have to display dialog box or not 
    if (!display) return null

    //varibale to store the login user details
    const [user, setUser] = useState(null)

    //variables to store the input given by user
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])  // storing the current date in the formate yyyy-mm-dd
    const [photo, setPhoto] = useState("")

    //DOM reference to display error effect
    const metaErrMsg = useRef() 
    const loading = useRef()

    const router = useRouter()
    
    useEffect(() => {
        // fetching logged in  user details
        const authUser = async () => {
            await auth()
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

        authUser()
    }, [])


    // function to handle the submitio of inputs given by user 
    const handleProblemSubmit = async (e) => {
        
        console.log(photo);
        if (![description, date, photo].includes("")){
            loading.current.classList.remove("hidden")
            e.preventDefault();

            metaErrMsg.current.classList.add("hidden")

            // creating a new form data 
            let formData = new FormData()

            //appending all the input to form data
            formData.append("description", description)
            formData.append("date", date)
            formData.append("grievance-image", photo)
            // formData.append("userId", user._id)
            // formData.append("userName", user.name)

            try {
                //api for uploading the problem
                await fetch(config.serverUrl + '/problems/upload', {
                    method: "POST",
                    body: formData
                })
                .then((res) => res.json())
                .then(async (res) => { 
                    if (res.status == "success"){
                        hide(false)

                        let formData = new FormData()

                        formData.append("userId", user._id)
                        formData.append("complaintId", res._id)
                        formData.append("status", "pending")
                        formData.append("description", "")

                        await fetch(config.serverUrl + '/action/upload', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": "token-value",
                            },
                            body: JSON.stringify({
                                userId: user._id,
                                complaintId: res._id,
                                status: "pending",
                                description: ""
                            })
                        })
                        .catch((err) => { console.log('fail to update action table\n', err) })
                    }else if (res.status == "metadata error")    //displaying error if img does not has metadata with location
                        metaErrMsg.current.classList.remove("hidden")
                })
                .then(() => loading.current.classList.add("hidden"))
            } catch (err) {
                console.log("fail to add\n", err);
            }
        }
    }

    return (
        <div className="fixed bg-black w-[100%] h-[100%] inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10" id="blur-bg" onClick={(e) => e.target.id == 'blur-bg' ? hide(false) : null}>
            <div className="hidden" ref={loading}>
                <Loader />
            </div>
            <div className="load-dialog-box grid gap-5 bg-white p-5 rounded-lg xl:w-[50%] lg:w-[60%] md:w-[70%] w-[90%]">
                <div className="text-[1.75em] font-bold">Raise your problem</div>

                <form className="grid gap-4" onSubmit={(e) => handleProblemSubmit(e)}>
                    {/* complaint text  */}
                    <div className="grid gap-2">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            rows="10"
                            className="border border-slate-300 rounded-md px-2 py-1 focus:outline-blue-500"
                            id="description"
                            placeholder="Write details about the problem here"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* date and department  */}
                    <div className="grid sm:grid-cols-[1fr_2fr] gap-5">
                        {/* date  */}
                        <div className="grid gap-2">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                className="border border-slate-300 rounded-md px-2 py-1 focus:outline-blue-500"
                                id="date"
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* upload file  */}
                        <div className="grid gap-2">
                            <label htmlFor="upload-photo">Upload photo:</label>
                            <input
                                type="file"
                                className="border border-slate-300 rounded-md p-1"
                                id="upload-photo"
                                name="grievance-image"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                required
                            />
                        </div>
                    </div>
                    <p className="text-[0.85em] text-red-500 hidden" id="error-msg" ref={metaErrMsg}>* Turn on your location and click photo again</p>

                    {/* submit button  */}
                    <div>
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:shadow-[2px_2px_10px_rgba(0,0,0,0.4)] focus:bg-blue-500 focus:shadow-none transition-all ease-out delay-100"
                            onClick={(e) => handleProblemSubmit(e)}
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
