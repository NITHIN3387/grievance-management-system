'use client'

import { useEffect, useRef, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import config from '@config/serverConfig'
import authUser from '@utils/authUser'
import Search from '@assets/images/search.png'

import '@assets/styles/ActionBtns.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import UserProblemCard from '@components/UserProblemCard'

const page = () => {
    const [user, setUser] = useState()    //varibale to store the login user details
    const [complaints, setComplaints] = useState([])
    const [statusColl, setStatusColl] = useState([])

    const [search, setSearch] = useState('')
    const [poor, setPoor] = useState(false)
    const [pending, setPending] = useState(false)
    const [onProgress, setOnProgress] = useState(false)
    const [solved, setSolved] = useState(false)
    
    const filterBtnPoorRef = useRef()
    const filterBtnPendingRef = useRef()
    const filterBtnOnProgrssRef = useRef()
    const filterBtnSolvedRef = useRef()

    const router = useRouter()

    useEffect(() => {
        // fetching logged in  admin details
        const auth = async () => {
            await authUser()
            .then((data) => { data ? setUser(data) : router.replace("/login") })   // checking whether user is authorized or not 
            .catch((err) => { console.log("fail to fetch admin details\n", err) })
        }

        //fetching complaints related to the logged user department
        const loadComplaints = async () => {
            await fetch(config.serverUrl + '/action/get', {
                method: 'GET',
                credentials: 'include'
            })
            .then((res) => res.json())
            .then(async (res) => {
                setStatusColl(res.data)

                await Promise.all(
                    res.data.map(async (data) => (
                        await fetch(config.serverUrl + '/problems/get/' + data.complaintId, {
                            method: 'GET',
                        })
                        .then((res) => res.json())
                    ))
                )
                .then((val) => setComplaints(val))
            })
        }

        auth()
        loadComplaints()
    }, [])

    //funtion to handle the filter of complaint which has status pending
    const handlePoorFilter = () => {
        setPoor((pre) => !pre)

        //adding active filter style to poor filter btn
        if (!poor) {
            filterBtnPoorRef.current.classList.add(`action-btn-active-0`)
            filterBtnPoorRef.current.classList.remove(`action-btn-0`)
        } else {
            filterBtnPoorRef.current.classList.remove(`action-btn-active-0`)
            filterBtnPoorRef.current.classList.add(`action-btn-0`)
        }
    }

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

    //funtion to handle the filter of complaint which has status on progress
    const handleSolvedFilter = () => {
        setSolved((pre) => !pre)

        //adding active filter style to solved filter btn
        if (!solved) {
            filterBtnSolvedRef.current.classList.add(`action-btn-active-3`)
            filterBtnSolvedRef.current.classList.remove(`action-btn-3`)
        } else {
            filterBtnSolvedRef.current.classList.remove(`action-btn-active-3`)
            filterBtnSolvedRef.current.classList.add(`action-btn-3`)
        }
    }

    //function to filter the complaints according to the filters added by the admin
    const filter = (data, action) => {
        if (!data.description.toLowerCase().includes(search))
            return false

        if (!poor && !pending && !onProgress && !solved)
            return true
        
        return(
            poor && action.status == "poor" ? true :
            pending && action.status == "pending" ? true :
            onProgress && action.status == "on progress" ? true :
            solved && action.status == "solved" ? true :
            false
        )
    }

    return (
        <WebsiteLayout>
            <div className='grid sm:p-5 p-3 gap-7'>
                {/* heading  */}
                <header className='text-[2em] font-bold'>Problems</header>
                {/* filter options and search bar  */}
                <div className='grid gap-5'>
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
                    <div className='flex sm:gap-5 gap-3'>
                        <div className='action-btn-0 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handlePoorFilter} ref={filterBtnPoorRef}>Poor</div>
                        <div className='action-btn-1 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handlePendingFilter} ref={filterBtnPendingRef}>Pending</div>
                        <div className='action-btn-2 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handleOnProgressFilter} ref={filterBtnOnProgrssRef}>Progress</div>
                        <div className='action-btn-3 border py-2 px-3 rounded-md text-center cursor-pointer' onClick={handleSolvedFilter} ref={filterBtnSolvedRef}>Solved</div>
                    </div>
                </div>
                {/* complaint list  */}
                <div className='sm:h-[calc(100vh-21rem)] h-[calc(100vh-19.5rem)] overflow-scroll shadow-inner rounded-lg'>
                    {
                        complaints.length && statusColl.length ?
                        complaints.map((res, i) => (
                            filter(res.data, statusColl[i]) ?
                            <UserProblemCard 
                                data={res.data}
                                action={statusColl[i]}
                                key={res.data._id}
                            /> 
                            : null
                        )) :
                        <div className='text-center text-[1.75em] font-bold mt-10'>No complaints to display !!!</div>
                    }
                </div>
            </div>
        </WebsiteLayout>
    )
}

export default page