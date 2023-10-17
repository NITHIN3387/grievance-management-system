import React from 'react'

const Dashboard = ({params}) => {
  return (
    <div>User Dashboard <br/> user id: {params.user_id}</div>
  )
}

export default Dashboard