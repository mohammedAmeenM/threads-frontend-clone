import React from "react";
import { usePosts } from "../zustand/posts/posts";

const Threads = () => {
    const {setOutRepliPost} = usePosts()

  const handleClick = async () => { 
    try {
      setOutRepliPost()
      
    } catch (error) {
       
    }
  }
  return (
    <>
      <div className="w-full h-10 active:border-b-[1px]">
        <button className="w-full h-full font-bold" onClick={handleClick}>
          Threads
        </button>
      </div>
    </>
  );
};

export default Threads;
