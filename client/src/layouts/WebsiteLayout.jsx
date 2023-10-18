import Navbar from '@components/Navbar'
import React from 'react'

const WebsiteLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default WebsiteLayout