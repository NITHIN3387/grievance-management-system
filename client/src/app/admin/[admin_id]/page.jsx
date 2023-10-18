import WebsiteLayout from '@layouts/WebsiteLayout'
import React from 'react'

const Dashboard = ({params}) => {
  return (
    <WebsiteLayout>
      Admin Dashboard <br/> user id:{params.admin_id}
    </WebsiteLayout>

  )
}

export default Dashboard