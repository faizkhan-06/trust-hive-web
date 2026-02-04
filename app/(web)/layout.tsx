

import Navbar from '@/components/common/Navbar'
import React from 'react'

const WebRootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default WebRootlayout