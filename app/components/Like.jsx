"use client"
import React, { useState } from 'react'
import { GoHeart } from "react-icons/go";
import { IoHeart } from "react-icons/io5";

const Like = () => {
    const [like,setLike]=useState(false)
    const handleClick=()=>{
        setLike(true)
    }
  return (
    <div
    className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center"
    onClick={handleClick}
  >
    { like?   <IoHeart className="text-2xl text-red-700" /> : <GoHeart className="text-2xl" />  }
  </div>
  )
}

export default Like
