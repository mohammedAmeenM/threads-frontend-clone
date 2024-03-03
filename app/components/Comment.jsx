"use client"
import React from 'react'
import { TbMessageCircle } from "react-icons/tb";

const Comment = () => {
  return (
    <div className='w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center'
    
    >

    <TbMessageCircle className='text-2xl transform scale-x-[-1]'/>

    </div>
  )
}

export default Comment
