import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiRepeat } from "react-icons/fi";
import { toast } from 'react-toastify';

function Repost({postId}) {

  const [user,setUser]=useState(null)
  

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 



  const handleRepost= async ()=>{
    const userId = user ? user._id : null;
    const username = user ? user.username : null;
    const profilePic = user ? user.profilePic : null;

    const data = {
      userId: userId,
      userProfilePic: profilePic,
      username: username
    };

    try {
      const response = await axios.post(`http://localhost:9000/api/users/post/repost/${postId}`,data)
    
      if(response.status===200){
        toast.success('success')
      }
    } catch (error) {
      console.log('error ,reply post ', error)
    }
  }
  return ( 

    <div  className='w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center' onClick={handleRepost}>
       <FiRepeat  className="text-2xl" /> 
    </div>
  )
}

export default Repost