"use client";
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import Like from './Like';
import Comment from './Comment';
import Repost from './Repost';
import axios from 'axios';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import ReplyList from './ReplyList';

const ProfileReplyPosts = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const userId=user._id

  const [reply,setReply]=useState([])

  useEffect(()=>{
    const getReply= async ()=>{
      try {
        const response = await axios.get(`http://localhost:9000/api/users/post/user/reply/${userId}`)
        console.log(response.data.posts)
        if(response.status===200){
          setReply(response.data.posts)
        }
      } catch (error) {
        console.log('error get replay ',error)
      }
    }
    getReply()
  },[])
  return (
    
  <> 
        {reply.map((item, index)=>(

       <>
          <div
            className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col relative top-[-27px]  justify-between items-center mb-10 "
           key={index}
          >
            <div className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
              <div className="h-ful w-fit">
                <div className="w-fit h-full  flex flex-col items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full bg-white box-border "
                    style={{
                      backgroundImage: `url(${ 
                        item?.postById?.profilePic?item?.postById?.profilePic:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png "
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <button className=" relative top-5 left-5  ">
                      <MdAddCircle className="text-2xl hover:inset-5 " />
                    </button>
                  </div>
                  <div className="  h-fit md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>
                </div>
              </div>
              <div className=" w-full h-full bg-black flex flex-col">
                <div className="w-full flex m-3 justify-between gap-3 items-center">
                  <span className="font-medium text-white hover:underline">
                    {item?.postById?.username}
                  </span>
                  <div className="flex justify-between gap-3 items-center ">
                    <span className="text-xs text-opacity-40 text-white">
                      14 h
                    </span>

                    <Dropdown className="bg-black">
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center"
                      >
                        <IoIosMore className="text-white" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      style={{ backgroundColor: "black" ,padding:'8px',tableLayout:"-moz-initial", borderRadius:'10px'}}
                    >
                      <DropdownItem key="follow" className="p-2">Unfollow</DropdownItem>
                      {/* <DropdownItem key="save" className="p-2" >Save</DropdownItem> */}
                      
                    </DropdownMenu>
                  </Dropdown>
                  </div>
                </div>
                <div className="h-fit w-auto md:h-[400px] m-2">
                  <p className="my-2 mx-2">{item.text}</p>
                  <div className=" w-fit h-fit md:h-full md:w-full rounded-xl ">
                    <img
                      className="rounded-xl  w-full h-full "
                      src={item.image}
                      alt="Post images"
                    />
                  </div>
                </div>
                <div className="flex gap-1 mx-2 mt-10 items-center">
                  <Like /> <Comment /> <Repost /> 
                </div>

                {item.replies.map((reply) => (
                  <ReplyList
                    key={reply._id}
                    userProfilePic={reply.userProfilePic}
                    username={reply.username}
                    text={reply.text}
                  />
                ))}
              </div>
            </div>
          </div>
          </>
        ))}
      </>
   

  )
}

export default ProfileReplyPosts
