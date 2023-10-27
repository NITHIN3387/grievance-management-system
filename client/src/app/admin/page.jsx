'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import WebsiteLayout from '@layouts/WebsiteLayout'
import authAdmin from '@utils/authAdmin'

const Dashboard = () => {
  //varibale to store the login admin details
  const [admin, setAdmin] = useState(null)

  const router = useRouter()
  
  useEffect(() => {
    // fetching logged in  admin details
    const auth = async () => {
      await authAdmin()
      .then((data) => { data ? setAdmin(data) : router.replace("/login") })   // checking whether admin is authorized or not 
      .catch((err) => { console.log("fail to fetch admin details\n", err) })
    }

    auth()
  }, [])

  return (
    <WebsiteLayout>
      {admin ? "Welcome " + admin.name : "processing....."}
    </WebsiteLayout>
  )
}

export default Dashboard