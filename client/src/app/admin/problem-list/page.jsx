'use client'

import { useEffect, useRef, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import authAdmin from '@utils/authAdmin'
import config from '@config/serverConfig'
import ProblemCard from '@components/ProblemCard'

import Search from '@assets/images/search.png'

import '@assets/styles/ActionBtns.css'
import Image from 'next/image'

const ProblemList = () => {
    const [admin, setAdmin] = useState()    //varibale to store the login admin details
    const [complaints, setComplaints] = useState([])  //varibale to store the login admin details

    const [search, setSearch] = useState('')
    const [pending, setPending] = useState(false)
    const [onProgress, setOnProgress] = useState(false)

    const filterBtnPendingRef = useRef()
    const filterBtnOnProgrssRef = useRef()

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
            .then((res) => {setComplaints(res.data)})
        }

        auth()
        loadComplaints()
    }, [])

    //funtion to handle the filter of complaint which has status pending
    const handlePendingFilter = () => {
        setPending((pre) => !pre)

        //adding active filter style to pending filter btn
        if (!pending) {
            filterBtnPendingRef.current.classList.add(`action-btn-active-1`)
            filterBtnPendingRef.current.classList.remove(`action-btn-1`)
        } else {
            filterBtnPendingRef.current.classList.remove(`action-btn-active-1`)
            filterBtnPendingRef.current.classList.add(`action-btn-1`)
        }
    }

    //funtion to handle the filter of complaint which has status on progress
    const handleOnProgressFilter = () => {
        setOnProgress((pre) => !pre)

        //adding active filter style to on progrss filter btn
        if (!onProgress) {
            filterBtnOnProgrssRef.current.classList.add(`action-btn-active-2`)
            filterBtnOnProgrssRef.current.classList.remove(`action-btn-2`)
        } else {
            filterBtnOnProgrssRef.current.classList.remove(`action-btn-active-2`)
            filterBtnOnProgrssRef.current.classList.add(`action-btn-2`)
        }
    }

    //function to filter the complaints according to the filters added by the admin
    const filter = (data) => {
        if (!data.description.includes(search))
            return false
        
        if (!(pending ^ onProgress) && (data.status != "pending" && data.status != "on progress"))
            return false

        if (pending && onProgress)
            return true

        if ((pending && data.status != "pending") || (onProgress && data.status != "on progress"))
            return false

        return true
    }

    return (
        <WebsiteLayout>
            <div className='grid sm:p-5 p-3 gap-7'>
                {/* heading  */}
                <header className='text-[2em] font-bold'>Problems</header>
                {/* filter options and search bar  */}
                <div className='grid sm:grid-cols-[1fr_auto] gap-5'>
                    <div className='grid relative'>
                        <Image
                            src={Search}
                            alt="search"
                            width={"40"}
                            className="scale-[0.5] absolute bg-white"
                        />
                        <input 
                            rows={5}
                            className="border border-slate-300 rounded-[5px] py-2 ps-10 focus:outline-none focus:ring focus:border-blue-500"
                            id="action-description"
                            placeholder="Search complaints here"
                            autoComplete="off"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-5'>
                        <div className='action-btn-1 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handlePendingFilter} ref={filterBtnPendingRef}>Pending</div>
                        <div className='action-btn-2 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handleOnProgressFilter} ref={filterBtnOnProgrssRef}>On Progress</div>
                    </div>
                </div>
                {/* complaint list  */}
                <div className='sm:h-[calc(100vh-17rem)] h-[calc(100vh-19.5rem)] overflow-scroll shadow-inner rounded-lg'>
                    {
                        complaints.length ?
                        complaints.map((data) => (
                            filter(data) ?
                            <ProblemCard 
                                data={data}
                                key={data._id}
                            /> : null
                        )) :
                        <div className='text-center text-[1.75em] font-bold mt-10'>No complaints to display !!!</div>
                    }
                </div>
            </div>
        </WebsiteLayout>
    )
}

export default ProblemList