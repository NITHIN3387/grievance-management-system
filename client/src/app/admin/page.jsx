'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import authAdmin from '@utils/authAdmin'

const Dashboard = () => {
  //varibale to store the login user details
  const [user, setUser] = useState(null)

  const router = useRouter()
  
  useEffect(() => {
    // fetching logged in  user details
    const auth = async () => {
      await authAdmin()
      .then((data) => {
        // checking whether user is authorized or not 
        if (data)
            // if (data.email.split("@")[1].includes("gov.in"))  //checking whether user has access right to this page or not
            setUser(data)
            // else
            //     router.replace("/login") 
        else
            router.replace("/login")
      })
      .catch((err) => {
        console.log("fail to fetch user details\n", err);
      })
    }

    auth()
  }, [])

  return (
    <WebsiteLayout>
      {user ? "Welcome " + user.name : "processing....."}
    </WebsiteLayout>
  )
}

export default Dashboard