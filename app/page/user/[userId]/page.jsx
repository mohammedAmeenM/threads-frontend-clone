
"use client"
import BottomBar from "@/app/components/BottomBar";
import NavigationBar from "@/app/components/NavigationBar";
import Replies from "@/app/components/Replies";
import Reposts from "@/app/components/Reposts";
import Threads from "@/app/components/Threads";
import { usePosts } from "@/app/zustand/posts/posts";
import { FaInstagram } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import UserProfileReply from "@/app/components/UserProfileReply";
import UserProfileReposts from "@/app/components/UserProfileReposts";
import UserProfilePost from "@/app/components/UserProfilePosts";


const Page = () => {
  const users = JSON.parse(window.localStorage.getItem('user'))
  const logUserId =users._id
  console.log(logUserId)
  const router=useRouter()
  const {userId}=useParams()
  const {selected}=usePosts()
  const [user,setUser]=useState([])
  const [isFollowing, setIsFollowing] = useState(false); 


  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/users/profile/${userId}`);
      if (response.status === 200) {
        setUser(response.data.user);
        setIsFollowing(response.data.user.followers.includes(logUserId));
      }
    } catch (error) {
      console.error(error, "get user by id");
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.post(`http://localhost:9000/api/users/unfollow/${logUserId}`, {
          userUnfollowId: userId,
        });
        setIsFollowing(false);
      } else {
        await axios.post(`http://localhost:9000/api/users/follow/${logUserId}`, {
          userFollowId: userId,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error, "follow");
    }
  };
  return (
    <>
    <NavigationBar />
    <div style={{display:"flex",justifyContent:'center'}}>
    <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center   ">
      <div className="h-auto w-full flex justify-between   p-2">
        <div className=" w-1/2 h-auto flex flex-col justify-start">
          <span className="font-bold text-lg">{user.username} </span>

          {/* user name and btn */}

          <div className="flex gap-6">
            <span>{user.name}</span>
            <button className="bg-stone-900 w-[100px] rounded-xl text-white text-opacity-20 ">
              threas.net
            </button>
          </div>
          <span className='  mt-6'>{user.bio}</span>
          <div className="flex justify-stretch ">
            <div
              className="w-4 h-4 rounded-full bg-white mt-5"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                backgroundSize: "contain",
              }}
            ></div>
            <div
              className="w-4 h-4 rounded-full bg-white mt-5 "
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                backgroundSize: "contain",
              }}
            ></div>
            <span className="mt-4 text-white text-opacity-20 ms-5 hover:underline">
              {" "}
             {user?.following?.length} following
            </span>
          </div>
        </div>
        <div className="flex justify-end flex-col ">
          <div
            className="h-16 w-16 rounded-full bg-white box-border md:h-20 md:w-20"
            style={{
              backgroundImage: `url(${
                  user.profilePic?user.profilePic:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                   
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
      <div className="w-full flex justify-evenly gap-2">

      <button className="w-1/2 h-10 bg-white border border-opacity-20 border-white text-black text-center rounded-lg mt-3"
      onClick={handleFollow}
      >
         {isFollowing ? "Following" : "Follow"}
      </button>
      <button className="w-1/2 h-10 bg-transparent border border-opacity-20 border-white text-center rounded-lg mt-3">
        Mention
      </button>
      </div>
      <div className="w-full h-full  flex justify-evenly items-center  text-white text-center mt-2 p-3">
        <Threads />
        <Replies />
        <Reposts />
      </div>
    {selected === "profileRepliPost" && <UserProfileReply userId={userId} />}
    {selected === "repost" && <UserProfileReposts userId={userId}/>}
    {!selected && <UserProfilePost userId={userId}/>}
    </div>

  </div>
  <BottomBar />
  </>
  )
}

export default Page
