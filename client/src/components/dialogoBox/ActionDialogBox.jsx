import { useEffect, useRef, useState } from "react"
import '@assets/styles/ActionBtns.css'

const ActionDialogBox = ({display, action}) => {
    //variables to store the inputs given by the admin
    const [status, setStatus] = useState(action.status)
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(null)

    //DOM refference to the status btns
    const actionBtnPoorRef = useRef()
    const actionBtnPendingRef = useRef()
    const actionBtnOnProgrssRef = useRef()
    const actionBtnSolvedRef = useRef()

    const actionBtns = [actionBtnPoorRef, actionBtnPendingRef, actionBtnOnProgrssRef, actionBtnSolvedRef]

    useEffect(() => {
        //adding active style to the present status btn
        const active = status == "poor" ? 0 : status == "pending" ? 1 : status == "on progress" ? 2 : 3
        actionBtns[active].current.classList.add(`action-btn-active-${active}`)
        actionBtns[active].current.classList.remove(`action-btn-${active}`)
    }, [])

    //function to handle the active btn style of the status btns
    const handleActionActive = (index, status) => {
        actionBtns.forEach((ele, i) => {
            if (i == index) {
                ele.current.classList.add(`action-btn-active-${index}`)
                ele.current.classList.remove(`action-btn-${index}`)
            } else if (ele.current.classList.value.includes(`action-btn-active-${i}`)) {
                ele.current.classList.add(`action-btn-${i}`)
                ele.current.classList.remove(`action-btn-active-${i}`)
            }
        })

        setStatus(status)
    }

    const handleActionSubmit = async () => {
        let formData = new FormData()

        formData.append("userId", action.userId)
        formData.append("complaintId", action.complaintId)
        formData.append("status", status)
        formData.append("description", description)
        formData.append("action-image", photo)
        
        await fetch(config.serverUrl + '/action/upload', {
            method: "POST",
            body: formData
        })
        .catch((err) => { console.log('fail to update action table\n', err) })
    }

    return (
        // blur bg 
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="bg-blur"
            onClick={(e) => (e.target.id == "bg-blur" ? display(false) : null)}
        >
            {/* white bg  */}
            <div className="load-dialog-box bg-white rounded-lg p-5 grid justify-center items-center">
                {/* heading  */}
                <div className="font-semibold text-[1.1em]">Update the status of complaint to -</div>
                {/* status btns  */}
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-3 mt-5">
                    {/* poor  */}
                    <div 
                        className="action-btn-0 border py-2 px-3 rounded-md text-center cursor-pointer"
                        onClick={() => handleActionActive(0, "poor")}
                        ref={actionBtnPoorRef}
                    >
                        Poor
                    </div>
                    {/* pending  */}
                    <div 
                        className="action-btn-1 border py-2 px-3 rounded-md text-center cursor-pointer"
                        onClick={() => handleActionActive(1, "pending")}
                        ref={actionBtnPendingRef}
                    >
                        Pending
                    </div>
                    {/* on progress  */}
                    <div 
                        className="action-btn-2 border py-2 px-3 rounded-md text-center cursor-pointer"
                        onClick={() => handleActionActive(2, "on progress")}
                        ref={actionBtnOnProgrssRef}
                    >
                        On Progress
                    </div>
                    {/* solved  */}
                    <div 
                        className="action-btn-3 border py-2 px-3 rounded-md text-center cursor-pointer"
                        onClick={() => handleActionActive(3, "solved")}
                        ref={actionBtnSolvedRef}
                    >
                        Solved
                    </div>
                </div>
                {/* description  */}
                <div className="grid gap-3 mt-10">
                    <label htmlFor="action-description" className="text-[1.1em]">Description:</label>
                    <textarea 
                        rows={5}
                        className="border border-slate-300 rounded-[5px] py-1 px-3 focus:outline-none focus:ring focus:border-blue-500"
                        id="action-description"
                        placeholder="Enter your description here"
                        autoComplete="off"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {/* upload file  */}
                <div className="grid gap-2 mt-5">
                    <label htmlFor="upload-photo" className="text-[1.1em]">Upload photo:</label>
                    <input
                        type="file"
                        className="border border-slate-300 rounded-md p-1"
                        id="upload-photo"
                        name="action-image"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                {/* submit btn  */}
                <button className="text-start mt-5 flex" onClick={handleActionSubmit}>
                    <div className="rounded-[5px] py-1 px-3 bg-blue-900 text-white hover:shadow-[2px_2px_10px_rgba(0,0,0,0.4)] focus:shadow-none transition-all ease-out delay-100">
                        Update
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ActionDialogBox