import React from 'react'
import { LiaTelegram } from "react-icons/lia";
import { FiRepeat } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";


const ReplyList = ({userProfilePic,username,text}) => {
  return (
    <div className="w-full   h-auto flex flex-col mt-10 p-2">
    <div className="h-full w-aout  flex gap-2 ">
      <div className="w-10 h-10 rounded-full bg-white">
        {userProfilePic && (
      <img
        src={userProfilePic}
        alt={`${username}'s profile`}
        className="w-full h-full rounded-full object-cover"
      />
    )}
      </div>

      <span className="mt-1 hover:underline">{username}</span>
    </div>

    <div className="w-full h-auto  mt-1 ms-10 p-2">
      <p className="">{text}</p>
    </div>

    <div className="flex items-center gap-3 mx-10 mt-1">
      <button className="flex items-center gap-1">
        <GoHeart />
      </button>
      <button className="flex items-center gap-1">
        <TbMessageCircle />
      </button>
      <button className="flex items-center gap-1">
        <FiRepeat />
      </button>
      <button className="flex items-center gap-1">
        <LiaTelegram />
      </button>
    </div>
  </div>
  )
}

export default ReplyList
