'use client'

import AdminNavbar from '@components/AdminNavbar'
import DialogBoxGrievance from '@components/DialogBoxGrievance'
import UserNavbar from '@components/UserNavbar'
import React, { useState } from 'react'

const WebsiteLayout = ({children}) => {
  //variable to describe the display state of the dialog box of problem submit form
  const [displayDialogBox, setDisplayDialogBox] = useState(false)

  //function to handle the dialog box display state 
  const handleDialogBoxState = (state) => (setDisplayDialogBox(state))

  return (
    <div>
      {!window.location.href.includes("/admin") ? <UserNavbar display={handleDialogBoxState}/> : <AdminNavbar />}

      {/* dialog box for submiting the grievance */}
      <div className=''>
        <DialogBoxGrievance display={displayDialogBox} hide={handleDialogBoxState}/>
      </div>

      {children}
    </div>
  )
}

export default WebsiteLayout