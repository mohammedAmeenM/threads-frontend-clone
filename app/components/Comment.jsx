"use client"
import axios from 'axios';
import React from 'react'
import { TbMessageCircle } from "react-icons/tb";

const Comment = ({userId}) => {  

  const handleClick=async (userId)=>{
    try {
      const response= await axios.get(`http://localhost:9000/api/users/postId/${userId}`)
      console.log(response.data.user,'amiiiiiwwiwiwiwiwiiwiwiwiwiwi')
      
    } catch (error) {
      
    }
  }
  return (
    <div className='w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center'
    onClick={() => handleClick(userId)}
    >

    <TbMessageCircle className='text-2xl transform scale-x-[-1]'/>

    </div>
  )
}

export default Comment
