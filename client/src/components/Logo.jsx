import React from 'react'
import Image from 'next/image'

import LogoImg from '@assets/images/logo.png'

const Logo = () => {
  return (
    <div className='flex translate-x-[-1rem] scale-[0.6] invert'>
        {/* logo */}
        <Image
            src={LogoImg}
            alt='logo'
            width={60}
        />
        {/* title  */}
        <div className='grid ps-5 leading-3'>
            <span className='text-[1.25em] font-semibold tracking-wider text-blue-600'>Government</span>
            <span className='text-[1.35em] font-bold tracking-wider'>Grievance</span>
            <span className='text-[1.75em] font-semibold tracking-wider text-purple-600'>Management</span>
        </div>
    </div>
  )
}

export default Logo