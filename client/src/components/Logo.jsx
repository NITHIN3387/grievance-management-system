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
            width={55}
        />
        {/* title  */}
        <div className='grid ps-5 leading-3'>
            <span className='text-[1.2em] font-semibold tracking-wider'>Government</span>
            <span className='text-[1.75em] font-bold tracking-wider'>Grievance</span>
            <span className='text-[1.35em] font-semibold tracking-wider'>Management</span>
        </div>
    </div>
  )
}

export default Logo