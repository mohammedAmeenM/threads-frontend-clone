"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PostHeads = () => {

  const [profilePic,setProfilePic]=useState(null)
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user)
    if (user && user.profilePic) {
      console.log(user.profilePic)
      setProfilePic(user.profilePic);
    }
  }, []);
    const router=useRouter()
  return (
    <>
    <div className="w-auto  md:w-[580px] h-auto md:flex hidden justify-between items-center ">
      <div className="w-auto md:flex hidden px-2 py-4 justify-center items-center">
        <div
          className="h-10 w-10 rounded-full bg-white box-border "
          style={{
            backgroundImage:`url(${
              profilePic
                ? profilePic
                : "https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg?fit=1024%2C576&ssl=1"
            })`,
            backgroundSize: "contain",
            backgroundSize: "cover",
          }}
        >
          {" "}
        </div>

        <button
          className="w-3/2 mx-4 text-white text-opacity-40 text-md   h-full flex justify-center items-center "
          onClick={() => router.push("/page/create")}
        >
          Start threads ......
        </button>
      </div>
      <button className=" px-5 py-2 md:flex hidden  rounded-full bg-white text-black font-medium   bg-opacity-40">
        Post{" "}
      </button>
    </div>
    <div className="w-full h-10 flex md:hidden bg-black">
      
    </div>
  </>
  )
}

export default PostHeads
