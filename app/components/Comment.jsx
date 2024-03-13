"use client"
import React from "react";
import { TbMessageCircle } from "react-icons/tb";
import ReplyPost from "./Models/ReplyPost";


const Comment = ({ postId }) => {
  const openModal = () => {
    const modal = document.getElementById(`my_modal_${postId}`);
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div
      className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center"
      onClick={openModal}
    >
      <TbMessageCircle className="text-2xl transform scale-x-[-1]" />
      

      <ReplyPost postId={postId} />
    </div>
  );
};

export default Comment;
