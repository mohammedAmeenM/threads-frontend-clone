"use client";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import PostHeads from "./PostHeads";
import axios from "axios";
import Like from "./Like";
import Comment from "./Comment";
import Repost from "./Repost";
import Share from "./Share";
import { useRouter } from "next/navigation";

const Posts = () => {
  
  const router=useRouter();
  const [post, setPost] = useState([]);
  const [user,setUser]=useState(null)


  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userId = user ? user._id : null;

  const handleProfile=(userId)=>{

     router.push(`/page/user/${userId}`);
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/users/post"
        );
        // const listPostById=response.data.posts.map((item)=>item.postById)
        setPost(response.data.posts);  
       
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <>
    <PostHeads />
    <div className="w-full md:w-[580px] h-screen md:p-2 p-3 flex flex-col justify-between items-center mb-10">
      {post.map((item,index) => ( 
        <div
          key={index}
          className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2"
        >
          <div className="h-auto w-fit">
            <div className="w-fit h-full flex flex-col items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-white box-border "
                style={{
                  backgroundImage: `url(${
                    item?.postById?.profilePic
                      ? item?.postById?.profilePic
                      : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <button className="relative top-5 left-5 ">
                  <MdAddCircle className="text-2xl hover:scale-100 " />
                </button>
              </div>
              <div
                className={`md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg cross-line`}
              ></div>

              <div className="w-10 h-10 relative flex justify-center">
                <div
                  className={`rounded-full`}
                  style={{
                    backgroundImage: `url(${"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className=" w-full h-full bg-black flex flex-col">
            <div className="w-full flex m-3 justify-between gap-3 items-center">
              <span
                className="font-medium text-white hover:underline cursor-pointer"
                onClick={() => handleProfile(item?.postById?._id)}
              >
              {item?.postById?.username}
              </span>

              <div className="flex justify-between gap-3 items-center ">
                <span className="text-xs text-opacity-40 text-white">
                  14 h
                </span>

                <button className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center">
                  <IoIosMore className="text-white" />
                </button>
              </div>
            </div>
            <div className="h-fit w-auto md:h-[400px] m-2">
              <p className="my-2 mx-2">{item.text}</p>
              <div className=" w-auto h-auto md:h-full md:w-full rounded-xl ">
               
                  <img
                    className="rounded-xl w-auto h-full"
                    src={item.image}
                    alt="...." />
               
              </div>
            </div>
            <div className="flex gap-1 mx-2 mt-10 items-center">
            <Like userId={userId} postId={item._id} />
            <Comment postId={item._id} />
              <Repost />
               <Share />

            </div>
           
            <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3">
              {/* <span>{item.replies.length} replies .</span> */}
              <span>{item.likes.length} likes</span>
            </div>
          </div>
        </div>
         ))
        }

    </div>
  </>
  );
};

export default Posts;
