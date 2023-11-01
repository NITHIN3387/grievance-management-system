'use client'

import React, { useEffect, useState } from 'react'

import AdminNavbar from '@components/navbar/AdminNavbar'
import DialogBoxGrievance from '@components/dialogoBox/DialogBoxGrievance'
import UserNavbar from '@components/navbar/UserNavbar'
import { usePathname } from 'next/navigation'
import HomeNavbar from '@components/navbar/HomeNavbar'

const WebsiteLayout = ({children}) => {
  //variable to describe the display state of the dialog box of problem submit form
  const [displayDialogBox, setDisplayDialogBox] = useState(false)

  const path = usePathname()

  useEffect(() => {}, [displayDialogBox])


  //function to handle the dialog box display state 
  const handleDialogBoxState = (state) => {
    setDisplayDialogBox(state)
  }

  return (
    <div>
      {
        path.includes("/user") ? <UserNavbar display={handleDialogBoxState}/> : 
        path.includes("/admin") ? <AdminNavbar /> :
        <HomeNavbar />
      }

      {/* dialog box for submiting the grievance */}
      <div>
        <DialogBoxGrievance display={displayDialogBox} hide={handleDialogBoxState}/>
      </div>

      {children}
      </div>
  )
}

export default WebsiteLayout