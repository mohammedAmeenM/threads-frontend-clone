import React from "react";
import { usePosts } from "../zustand/posts/posts";

const Replies = () => {
    const {setRepliPost} = usePosts()

    const handleClick = async () => {
        try {  
          setRepliPost() 
      } catch (error) {
         console.log(error)
      }
    }
  return (
    <>
      <div className="w-full h-10  active:border-b-[1px]">
        <button className="w-full h-full font-bold" onClick={handleClick}>
          Replies
        </button>
      </div>
    </>
  );
};

export default Replies;
