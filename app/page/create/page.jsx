"use client"
import React, { useRef, useState } from 'react'
import { IoImagesOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import axios from 'axios';
const userId=localStorage.getItem('userId')

const page = () => {
    const router = useRouter();
    const [text,setText]=useState('');
    const [image,setImage]=useState(null);
    const fileInputRef = useRef(null);
    

    const handleAddPost= async(e)=>{
        e.preventDefault();
        if(!text||!image){
            console.log('error')
            return;
        }
        const formData= new FormData();
        formData.append("userId",userId);
        formData.append("text",text);
        formData.append("image",image)

        try {
            const response = await axios.post('http://localhost:9000/api/users/post',formData)
            console.log(response)
        } catch (error) {
            console.log(error,'add post')
        }
    }
    const handleImageClick = (e) => {
        e.preventDefault();
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <form
      encType="multipart/form-data"
     

    >
      <div className="w-full h-[400px] max-w-lg mx-auto  p-8 bg-stone-900 rounded-3xl">
        <div className="w-full h-5 flex justify-between">
          <div className="w-3/4 mx-20 text-md font-bold text-white">
            New thread
          </div>
          <div className="w-auto items-end">
            <CgMoreO />
          </div>
        </div>
        <div className="w-full h-[400px]">
          <div className="w-full h-auto flex justify-start my-4">
            <div className="w-auto h-auto  flex justify-start  my-4 mx-3">
              <div className="h-[100px] w-8  flex justify-center flex-col gap-1 ms-2 ">
                <div className="w-8 h-8 rounded-full bg-white"
                style={{
                  backgroundImage: `url(${
                       "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                ></div>
                <div className="h-8 w-[1px] bg-opacity-20 bg-white ms-4   "></div>
                <div className="w-3 h-3 rounded-full bg-white ms-[9px] "></div>
              </div>
              <div className="w-auto h-auto flex justify-start items-start flex-col ms-3 mt-3 relative">
                <span className=" w-full h-9 text-white">ameen</span>
                <textarea
                  type="text"
                  name="text"
                  placeholder="Start a thread..."
                  id=""
                  onChange={(e)=>setText(e.target.value)}  
                  // {...register("text")}
                  className="border-none outline-none bg-transparent"
                />
                <button
                  className="h-auto px-2 py-3 bg-transparent border-none rounded-lg flex flex-col justify-center items-center"
                  onClick={handleImageClick}
                  >
                    <IoImagesOutline className="text-lg text-white text-opacity-50 hover:text-opacity-90" />
                  </button>
                  <input
                    type="file"
                    name="image"
                    id="fileInput"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex justify-end px-6">
            <button
              className="w-16 h-10 rounded-3xl bg-stone-700 text-black font-medium"
              type="submit"
              onClick={handleAddPost}
            >
              Post
            </button>
          </div>
          {/* {img && (
      <div className="absolute   w-24 h-24">
        <img
          src={URL.createObjectURL(img)}
          alt="Image Preview"
          className="w-full h-full rounded-md object-cover"
        />
      </div>
    )} */}

        </div>
        <div className="absolute  bottom-4 right-4 lg:bottom-auto lg:top-4 lg:right-4"></div>
      </div>
    </form>

   
    <div className="w-10 absolute bottom-32  ">
      <button
        className="text-white text-opacity-50 hover:text-opacity-90"
        onClick={() => router.push("/")}
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default page
