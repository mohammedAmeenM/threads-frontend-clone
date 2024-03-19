"use client";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Like from "./Like";
import Repost from "./Repost"; 
import Comment from "./Comment";
import axios from "axios";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import getElapsedTime from "./Timeset/time";

const UserProfilePost = ({ userId }) => {
    const [post,setPost]=useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [logUserId, setLogUserId] = useState(false);
    const [username,setUsername] = useState(false)

    const [isFollowing, setIsFollowing] = useState({});
  
    useEffect(() => {
      const userData = window.localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    useEffect(() => {
      if (user) {
        setLogUserId(user._id);
        setUsername(user.username)
      }
    }, [user]);
  
    useEffect(() => {
      if (logUserId) {
        const getUsers = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9000/api/users/all"
            );
            if (response.status === 200) {
              const userMap = {};
              response.data.users.forEach((user) => {
                userMap[user._id] = user.followers.includes(logUserId);
              });
              setIsFollowing(userMap);
            }
          } catch (error) {
            console.log("get users followers ", error);
          }
        };
        getUsers();
      }
    }, [logUserId]);
  
    const handleFollow = async (userId) => {
      try {
        const followingState = { ...isFollowing };
  
        if (followingState[userId]) {
          await axios.post(
            `http://localhost:9000/api/users/unfollow/${logUserId}`,
            { userUnfollowId: userId }
          );
          followingState[userId] = false;
        } else {
          await axios.post(
            `http://localhost:9000/api/users/follow/${logUserId}`,
            { userFollowId: userId ,username:username}
          );
          followingState[userId] = true;
        }
        setIsFollowing(followingState);
      } catch (error) {
        console.error(error, "follow");
      }
    };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    const getUserPost=async()=>{
        try {
            const response=await axios.get(`http://localhost:9000/api/users/post/${userId}`)
            setPost(response.data.post)
        } catch (error) {
            console.log('error get user post',error)
        }
    }
    getUserPost()
  },[])
  return (
    <>
    {post.length === 0 ? (
     <>
     <div className="flex w-full justify-center items-center  text-white text-opacity-30 h-screen ">
       <h1 className="flex justify-center items-center ">
         No Posts yet
       </h1>
     </div>
     </>
    ) : (
      <>
        {post.map((item,index)=>(
            <>
          <div
          key={index}
            className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col relative top-[-27px]  justify-between items-center mb-10 "
          >
            <div  className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
              <div className="h-ful w-fit">
                <div className="w-fit h-full  flex flex-col items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full bg-white box-border "
                    style={{
                      backgroundImage: `url(${ " https://cdn-icons-png.flaticon.com/512/6596/6596121.png "})`,
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

                  <div className="w-10 h-10 relative flex justify-center">
                    
                  </div> 
                </div>
              </div>
              <div className=" w-full h-full bg-black flex flex-col">
                <div className="w-full flex m-3 justify-between gap-3 items-center">
                  <span className="font-medium text-white hover:underline">
                    {item?.postById?.username}{" "}
                  </span>
                  <div className="flex justify-between gap-3 items-center ">
                    <span className="text-xs text-opacity-40 text-white">
                    {getElapsedTime(item.createdOn)}
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
                      <DropdownItem key="follow" className="p-2" onClick={() => handleFollow(item?.postById?._id)}>  
                      {isFollowing[item?.postById?._id] ? "Following" : "Follow"}
                    </DropdownItem>
                      
                      
                    </DropdownMenu>
                  </Dropdown>
                  </div>
                </div>

                <div className="h-fit w-auto  md:h-[400px] m-2">
                  <p className="my-2 mx-2">{item.text}</p>
                  <div className=" w-fit h-fit md:h-full md:w-full rounded-xl ">
                    <img
                      className="rounded-xl  w-fit h-full "
                      src={item.image}
                      alt="Post images"
                    />
                  </div>
                </div>

                <div className="flex gap-1 mx-2 mt-10 items-center">
                  <Like userId={logUserId} postId={item._id} /> <Comment postId={item._id} />{" "}
                  <Repost postId={item._id}/> 
                </div>
                <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3">
                  <span>{item?.replies?.length} replies</span>
                  <span>{item?.likes?.length} likes</span>
                </div>
              </div>
            </div>
          </div>
          </>
      ))}
      </>
    )}
  </>
  )
}

export default UserProfilePost
