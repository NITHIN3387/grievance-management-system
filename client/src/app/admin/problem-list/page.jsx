'use client'

import { useEffect, useRef, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import authAdmin from '@utils/authAdmin'
import config from '@config/serverConfig'
import ProblemCard from '@components/ProblemCard'
import DocViewer from '@components/dialogoBox/DocViewer'
import ActionDialogBox from '@components/dialogoBox/ActionDialogBox'

const ProblemList = () => {
    const [admin, setAdmin] = useState()    //varibale to store the login admin details
    const [complaints, setComplaints] = useState([])  //varibale to store the login admin details

    const [doc, setDoc] = useState('')  //variable to store the img url to which to be shown in the DocViewer dialog box

    const viewDocRef = useRef()     //DOM refference to the DocViewer component
    const actionBoxRef = useRef()     //DOM refference to the DocViewer component

    useEffect(() => {
        // fetching logged in  admin details
        const auth = async () => {
            await authAdmin()
            .then((data) => { data ? setAdmin(data) : router.replace("/login") })   // checking whether admin is authorized or not 
            .catch((err) => { console.log("fail to fetch admin details\n", err) })
        }

        //fetching complaints related to the logged user department
        const loadComplaints = async () => {
            await fetch(config.serverUrl + '/problems/get', {
                method: 'GET',
                credentials: 'include'
            })
            .then((res) => res.json())
            .then((res) => setComplaints(res.data))
        }

        auth()
        loadComplaints()
    }, [])

    //function to handle the display of DocViewer dialog box
    const viewDoc = (display, imgUrl) => {
        if (display) {
            viewDocRef.current.classList.add('flex')
            viewDocRef.current.classList.remove('hidden')
            
            setDoc(imgUrl)
        } else {
            viewDocRef.current.classList.add('hidden')
            viewDocRef.current.classList.remove('flex')
        }
    }

    //function to handle the display of DocViewer dialog box
    const viewActionBox = (display) => {
        if (display) {
            actionBoxRef.current.classList.add('flex')
            actionBoxRef.current.classList.remove('hidden')
        } else {
            actionBoxRef.current.classList.add('hidden')
            actionBoxRef.current.classList.remove('flex')
        }
    }

    return (
        <WebsiteLayout>
            <div className='grid sm:p-5 p-3 gap-7'>
                {/* heading  */}
                <header className='text-[2em] font-bold'>Problems</header>
                {/* filter options and search bar  */}
                <div className='flex gap-5'>
                    <div className='bg-slate-500 text-white py-2 px-3 rounded-md'>Pending</div>
                    <div className='bg-yellow-400 text-white py-2 px-3 rounded-md'>On Progress</div>
                </div>
                {/* complaint list  */}
                <div className='h-[calc(100vh-16.5rem)] overflow-scroll shadow-inner rounded-lg'>
                    {
                        complaints.length ?
                        complaints.map((data) => (
                            data.status !== "poor" || data.status !== "solved" ? <ProblemCard data={data} key={data._id} viewDoc={viewDoc}/> : null
                        )) :
                        <div>No complaints to display :{')'}</div>
                    }
                </div>
            </div>
            
            {/* DocViewer dialog box  */}
            <div className="hidden" ref={viewDocRef}>
                <DocViewer display={viewDoc} imgUrl={doc}/>
            </div>

            {/* action dialog box  */}
            <div className="hidden" ref={actionBoxRef}>
                <ActionDialogBox display={viewActionBox}/>
            </div>
        </WebsiteLayout>
    )
}

export default ProblemList