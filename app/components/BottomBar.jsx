'use client'
import React, { useEffect } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { HiUser } from 'react-icons/hi2'
import { FiSearch } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import '../components/BottomBar.css'
import { useRouter } from 'next/navigation';

const BottomBar = () => {
  const router= useRouter()
  return (
    <div className="button-container ">
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800   border-none rounded-lg  "
    onClick={()=>router.push('/')}
    >
      <GrHomeRounded className="text-3xl text-white text-opacity-50 hover:text-opacity-90 " />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={()=>router.push('/page/search')}
    >
      <FiSearch className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={()=>router.push('/page/create')}
    >
      <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={()=>router.push('/page/notification')}
    >
      <FaRegHeart className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-4 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={()=>router.push('/page/profile')}
    >
      <HiUser className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
   
  </div>
  )
}

export default BottomBar
