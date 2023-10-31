import React, { useRef } from 'react'
import Logo from '../Logo'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logout from '@assets/images/logout.png'
import Profile from '@assets/images/profile-user.png'
import Navigation from '@assets/images/navigation.png'
import Dashboard from '@assets/images/dashboard.png'
import AddComplaint from '@assets/images/add-complaint.png'
import Complaints from '@assets/images/complaints.png'
import Solved from '@assets/images/solved-complaints.png'
import Cancel from '@assets/images/cancel.png'
import config from '@config/serverConfig'
import Link from 'next/link'

const Navbar = ({display}) => {
    // Dom refference for showing more option for profile while in desktop mode and navbar toggle when it is in mobile mode 
    const profileMoreOption = useRef()
    const mobileNavabr = useRef()

    const router = useRouter()

    //function to display the more option on hovering on profile icon
    const handleProfileMoreOptionDisplay = () => {
        const classList = profileMoreOption.current.classList

        //checking whether option is hidden or not
        if (classList.value.includes("hidden")){
            classList.remove("hidden")
            classList.add("grid")
        } else {
            classList.remove("grid")
            classList.add("hidden")
        }
    }

    //function to handle the logout of the user
    const handleLogout = async () => {
        //api to handle logout of the user
        await fetch(config.serverUrl + '/user/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(() => router.push('/login'))
        .catch((err) => console.log('internal server error\n', err) )
    }

    //function to toggle the navbar while in the mobile mode
    const handleNavabrDisplay = () => {
        const classList = mobileNavabr.current.classList
        
        //checking whether navbar is opened or closed
        if (classList.value.includes("flex")) {
            classList.remove("flex")
            classList.add("hidden")
        } else {
            classList.remove("hidden")
            classList.add("flex")
        }
    }

  return (
    <>
        {/* <----------------   desktop view    -------------------->  */}
        <div className='hidden md:flex justify-between pe-4 h-[5rem] items-center bg-blue-950'>
            {/* logo of the website  */}
            <Link href={'/'}>
                <Logo />
            </Link>

            {/* navigation links  */}
            <div className='flex xl:gap-[2rem] lg:gap-[1.75rem] gap-[1rem] items-center'>
                {/* Dashboard  */}
                <Link href={'/user'} className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-white'>Dashboard</Link>
                {/* Raise your complaint  */}
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-white cursor-pointer' onClick={() => display(true)}>Raise the problem</span>
                {/* problem Status  */}
                <Link href={'/user/problem-status'} className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-white'>Problem Status</Link>

                {/* profile  */}
                <span className='flex items-center border-s-2 border-s-white ps-4 cursor-pointer' onClick={handleProfileMoreOptionDisplay} onMouseOver={handleProfileMoreOptionDisplay} >
                    <Image 
                        src={Profile}
                        alt={'logout'}
                        width={30}
                        className='invert'
                    />
                </span>

                {/* more option onClick or hover profile option */}
                <div className='hidden absolute top-[4.5rem] right-1 border bg-white rounded-md shadow-lg before:absolute before:border-b-[0.75rem] before:border-l-[0.75rem] before:border-r-[0.75rem] before:border-transparent before:border-b-white before:right-4 before:top-[-0.75rem]' ref={profileMoreOption} onMouseLeave={handleProfileMoreOptionDisplay}>
                    {/* link for profile page  */}
                    <div className='flex gap-3 py-2 px-4 hover:bg-slate-200'>
                        <Image 
                            src={Profile}
                            alt='profile'
                            width={25}
                        />
                        <span className='text-[1.05em] cursor-pointer'>Profile</span>
                    </div>
                    {/* logout button  */}
                    <div className='flex gap-3 py-2 px-4 hover:bg-slate-200' onClick={handleLogout}>
                        <Image 
                            src={Logout}
                            alt='logout'
                            width={25}
                            className=' scale-[1.15]'
                        />
                        <span className='text-[1.05em] cursor-pointer'>Logout</span>
                    </div>
                </div>
            </div>
        </div>

        {/* <--------------------- mobile view ---------------------> */}
        <div className='md:hidden flex justify-between pe-6 h-[5rem] items-center bg-blue-950'>
            {/* logo of the website  */}
            <Link href={'/'}>
                <Logo />
            </Link>

            <div className='flex gap-[2rem]'>
                {/* navbar toggle button  */}
                <span onClick={handleNavabrDisplay}>
                    <Image 
                        src={Navigation}
                        alt={'navigation'}
                        width={35}
                        className='invert'
                    />
                </span>

                {/* bg blur effect  */}
                <div className='fixed hidden justify-end inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10' id='mbl-nav' ref={mobileNavabr} onClick={(e) => e.target.id == "mbl-nav" ? handleNavabrDisplay() : null}>
                    {/* navbar  */}
                    <div className='navbar-toggle-animation grid grid-rows-[4rem_1fr_3rem] w-[80%] bg-blue-950 p-5'>
                        <div className='flex justify-between items-center mb-5'>
                            {/* heading */}
                            <span className='text-white text-[1.75em]'>Menu</span>
                            <span className='text-white text-[1.75em]' onClick={handleNavabrDisplay}>
                                <Image 
                                    src={Cancel}
                                    alt='Cancel'
                                    width={25}
                                    className='invert'
                                />
                            </span>
                        </div>
                        {/* navigation links  */}
                        <div className='flex flex-col'>
                            {/* dashboard  */}
                            <Link href={'/user'} className='flex gap-5 py-5 text-white bg-black bg-opacity-25 border-s-[5px] ps-[20px]'>
                                <Image 
                                    src={Dashboard}
                                    alt='dashboard'
                                    width={25}
                                    className='invert'
                                />
                                <span>Dashboard</span>
                            </Link>
                            {/* raise your problem  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]' onClick={() => {display(true); handleNavabrDisplay()}}>
                                <Image 
                                    src={AddComplaint}
                                    alt='AddComplaint'
                                    width={25}
                                    className='invert'
                                />
                                <span>Raise the problem</span>
                            </div>
                            {/* problem status  */}
                            <Link href={'/user/problem-status'} className='flex gap-5 py-5 text-white ps-[20px]'>
                                <Image 
                                    src={Complaints}
                                    alt='Complaints'
                                    width={25}
                                    className='invert'
                                />
                                <span>Problem status</span>
                            </Link>
                            {/* profile  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]'>
                                <Image 
                                    src={Profile}
                                    alt='Profile'
                                    width={25}
                                    className='invert'
                                />
                                <span>Profile</span>
                            </div>
                        </div>
                        {/* logout button */}
                        <div className='flex gap-5 border-t-2 border-white items-end' onClick={handleLogout}>
                            <Image 
                                src={Logout}
                                alt='Logout'
                                width={35}
                                className='invert'
                            />
                            <span className='text-[1.25em] text-white'>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar