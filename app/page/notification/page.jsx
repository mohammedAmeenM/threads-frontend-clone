"use client"
import BottomBar from '@/app/components/BottomBar'
import NavigationBar from '@/app/components/NavigationBar'
import AllFollowersBtn from '@/app/components/NotificationBtns/AllFollowersBtn'
import AllLikesBtn from '@/app/components/NotificationBtns/AllLikesBtn'
import AllUsersBtn from '@/app/components/NotificationBtns/AllUsersBtn'
import Allusers from '@/app/components/Notifications/Allusers'
import Followers from '@/app/components/Notifications/Followers'
import LikesUsers from '@/app/components/Notifications/LikesUsers'
import usersStore from '@/app/zustand/users/usersStore'
import React from 'react'

const Page = () => {
    const { selected } = usersStore();
  return (
    <>
    <NavigationBar />
    <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="w-full md:w-[768px]  h-[900px] md:p-2 p-3 flex flex-col relative justify-between items-center">
    <div className="h-auto w-full  bg-black border-white flex flex-col justify-center items-center border-opacity-30 p-2">
      <div className="w-full flex gap-1 justify-between overflow-x-scroll">
        <AllUsersBtn />
        <AllFollowersBtn />
        <AllLikesBtn />
       
      </div>

      {!selected && <Allusers />}
      {selected === 'followers' && <Followers />}
      {selected === "likes" && < LikesUsers/>}
     
    </div>
  </div>
  </div>
  <BottomBar />
  </>
  )
}

export default Page
