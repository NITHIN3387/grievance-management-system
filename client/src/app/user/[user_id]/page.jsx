import WebsiteLayout from '@layouts/WebsiteLayout'
import React from 'react'

const Dashboard = ({params}) => {
  return (
    <WebsiteLayout>
      user id: {params.user_id}
    </WebsiteLayout>
  )
}

export default Dashboard