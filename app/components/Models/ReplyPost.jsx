// ReplyPost.js
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";

const ReplyPost = ({ postId }) => {

 
  const [user,setUser]=useState(null)
  const [post,setPost]=useState([])
  const [reply,setReply]=useState('')

  const modalRef = useRef(null);

  const openModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (postId) {
      const getPostById = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/api/users/postId/${postId}`);
          setPost(response.data.post);
        } catch (error) {
          console.log('error, get post by Id', error);
        }
      };
      getPostById();
    }
  }, [postId]);



  const handlePost= async ()=>{
    const userId = user ? user._id : null;
    const username = user ? user.username : null;
    const profilePic = user ? user.profilePic : null;

    const data = {
      userId: userId,
      text: reply,
      userProfilePic: profilePic,
      username: username
    };

    try {
      const response = await axios.post(`http://localhost:9000/api/users/post/${postId}/reply`,data)
      modalRef.current.close()
      if(response.status===201){
        toast.success('success')
      }
    } catch (error) {
      console.log('error ,reply post ', error)
    }
  }

  return (
    <dialog ref={modalRef} id={`my_modal_${postId}`} className="modal">
    <div className="modal-box md:w-[80%] md:max-w-2xl w-full h-full bg-black ">
      <div className="w-auto h-auto md:p-2 p-3 flex flex-col justify-between items-center mb-10">
        <div className="h-auto w-full bg-black border-white flex border-opacity-30 p-2">
          <div className="h-auto w-fit">
            <div className="w-fit h-full flex flex-col items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-white box-border"
                style={{
                  backgroundImage: `url(${
                    post?.postById?.profilePic ? post?.postById?.profilePic : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className={`md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg cross-line`}
              ></div>
              <div className="w-10 h-10 relative flex justify-center items-center"></div>
            </div>
          </div>
          <div className="w-full h-full bg-black flex flex-col">
            <div className="w-full flex m-3 justify-between gap-3 items-center">
              <span className="font-medium text-white hover:underline">{post?.postById?.username}</span>
              <div className="flex justify-between gap-3 items-center ">
                <span className="text-xs text-opacity-40 text-white">
                  14 h
                </span>
                <button className="w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center">
                  <IoIosMore className="text-white" />
                </button>
              </div>
            </div>
            <div className="h-fit w-auto m-2">
              <p className="my-2 mx-2">{post.text} </p>
              <div className="w-fit h-fit rounded-xl ">
                <img
                  className="rounded-xl w-full h-full"
                  src={post.image }
                  alt="...."
                />
              </div>
            </div>
            <div className="flex gap-1 mx-2 mt-10 items-center">
              <div className="flex-grow">
                <textarea
                  className="bg-transparent border-b border-gray-300 focus:outline-none placeholder:text-white placeholder:text-opacity-20"
                  placeholder="Reply to name..."
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  onChange={(e)=>setReply(e.target.value)}
                ></textarea>
              </div>
              <button className="px-5 py-2 rounded-full bg-white text-black font-medium bg-opacity-40"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
            <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3"></div>
          </div>
        </div>
      </div>
    </div>
    <button
      className="sm:hidden"
      onClick={() => modalRef.current.close()}
    >
      Cancel
    </button>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  );
};

export default ReplyPost;
