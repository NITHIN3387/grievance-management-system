'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import auth from '@utils/authUser'

const Dashboard = ({params}) => {
  //varibale to store the login user details
  const [user, setUser] = useState(null)

  const router = useRouter()
  
  useEffect(() => {
    // fetching logged in  user details
    const authUser = async (id) => {
      await auth(id)
      .then((data) => {
        // checking whether user is authorized or not 
        if (data)
          setUser(data)
        else
          router.replace("/login")
      })
      .catch((err) => {
        console.log("fail to fetch user details\n", err);
      })
    }

    authUser(params.user_id)
  }, [])

  return (
    <WebsiteLayout>
      {user ? "Welcome " + user.name : "processing....."}
    </WebsiteLayout>
  )
}

export default Dashboard