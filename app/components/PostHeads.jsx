"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const PostHeads = () => {
    const router=useRouter()
  return (
    <>
    <div className="w-auto  md:w-[580px] h-auto md:flex hidden justify-between items-center ">
      <div className="w-auto md:flex hidden px-2 py-4 justify-center items-center">
        <div
          className="h-10 w-10 rounded-full bg-white box-border "
          style={{
            backgroundImage: `url(${
                "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
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
          Start thread ...
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
