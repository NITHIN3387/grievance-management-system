import React from 'react'
import Logo from './Logo'
import Image from 'next/image'

import Logout from '@assets/images/logout.png'

const Navbar = ({display}) => {
  return (
    <>
        {/* desktop view  */}
        <div className='flex justify-between pe-8 h-[5rem] items-center bg-blue-950'>
            <Logo />

            {/* navigation links  */}
            <div className='flex gap-[2rem]'>
                {/* Raise your problem  */}
                <span className='text-[1.25em] text-white' onClick={() => display(true)}>Raise the problem</span>

                {/* profile and user name with logout button  */}
                <span className='flex gap-[0.7rem] border-s-2 border-s-white ps-5'>
                    <span className='text-[1.25em] text-white'>User 1</span>
                    <Image 
                        src={Logout}
                        alt={'logout'}
                        width={35}
                        className='invert'
                    />
                </span>
            </div>
        </div>
    </>
  )
}

export default Navbar