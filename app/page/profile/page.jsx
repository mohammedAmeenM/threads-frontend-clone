"use client"
import NavigationBar from '@/app/components/NavigationBar';
import { usePosts } from '@/app/zustand/posts/posts';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { FaInstagram } from "react-icons/fa6";
import ProfileRepost from '@/app/components/ProfileRepost';
import ProfilePosts from '@/app/components/ProfilePosts';
import ProfileReplyPosts from '@/app/components/ProfileReplyPosts';
import Threads from '@/app/components/Threads';
import Replies from '@/app/components/Replies';
import Reposts from '@/app/components/Reposts';
import EditProfile from '@/app/components/Models/EditProfile';


const userId=localStorage.getItem('userId')
console.log(userId)

const Page = () => {
  const router=useRouter();
  const [profile,setProfile]=useState([])
  const [followers,setFollowers]=useState([])
  const {selected}=usePosts()

  const getProfile=async()=>{
    try {
      const response= await axios.get(`http://localhost:9000/api/users/profile/${userId}`)
      console.log(response.data.user)
      setProfile(response.data.user)
    } catch (error) {
      console.log('error profile',error)
    }
  }
  
  useEffect(()=>{
    getProfile();
  },[])

  return (
  <>
  <NavigationBar />
    <div  style={{display:'flex',justifyContent:'center'}} >
       <div className="w-full md:w-[580px] md:p-2 p-3 items-center  flex flex-col   mb-10">
        <div className="h-auto w-full flex justify-between   p-2">
          <div className=" w-1/2 h-auto flex flex-col ">
            <span className='font-bold text-xl'>{profile.username}</span>

            <div className="flex gap-1">
              <span >{profile.name}</span>
              <button className="bg-stone-900 w-[90px] text-xs rounded-xl text-white text-opacity-30 ">
                threads.net
              </button>
            </div>

            <div className="flex justify-stretch ">
             
                <div className="flex gap-1 mt-5 relative">
                  
                    <div
                      className={`w-4 h-4 bg-black absolute rounded-full`}

                      style={{
                        backgroundImage: `url(${
                          
                             "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                        })`,
                        backgroundSize: "contain",
                      }}
                      ></div>
                      
                </div>
              
           
                {" "}{" "}
              <span className="mt-4 text-white text-opacity-40 mx-8 hover:underline" 
              
              >
                
               {profile?.followers?.length}  followers
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col ">
            <div
              className="h-16 w-16 rounded-full bg-white box-border md:h-20 md:w-20"
              style={{
                backgroundImage: `url(${
                  profile.profilePic?profile.profilePic:
                    "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="text-2xl ml-12 mt-5">
              <FaInstagram />{" "}
            </div>
            
          </div>
        </div>
        <button className="w-full h-10 bg-transparent border border-opacity-20 border-white text-center rounded-md mt-3"
        onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          Edit Profile
        </button>
        <div className="w-full h-full  flex justify-evenly items-center  text-white text-center mt-2 p-3">
          <Threads />
          <Replies />
          <Reposts />
        </div> 
        <EditProfile />
      {selected === "profileRepliPost" && <ProfileReplyPosts />}
      {selected === "repost" && <ProfileRepost />}
      {!selected && <ProfilePosts />}
      </div>
    </div>
    </>
  )
}

export default Page
