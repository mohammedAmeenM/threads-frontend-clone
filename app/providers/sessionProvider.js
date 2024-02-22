"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'

function SessionProvid ({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionProvid
