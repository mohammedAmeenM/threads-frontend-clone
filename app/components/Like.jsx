import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoHeart } from "react-icons/go";
import { IoHeart } from "react-icons/io5";

const Like = ({ userId, postId  }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/users/postId/${postId}`);
        if (response.data && response.data.post) { 
          const { post } = response.data;
          setLiked(post.likes.includes(userId));
          setLoading(false); 
        } else {
          setLoading(false); 
        }
      } catch (error) {
        console.error('Error checking like status:', error);
        setLoading(false); 
      }
    };
  
    checkLikedStatus();
  }, []);
  
  const handleLikeClick = async () => {
    try {
      if (!loading) {
        if (liked) {
          const response = await axios.post(`http://localhost:9000/api/users/post/unlike/${postId}`, { userId  });
          if (response.status === 200) {
            setLiked(false);
          } else {
            console.log('error unliking');
          }
        } else {
          await axios.post(`http://localhost:9000/api/users/post/like/${postId}`, { userId  });
          setLiked(true);
        }
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div
      className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center"
      onClick={handleLikeClick}
    >
      {liked ? <IoHeart className="text-2xl text-red-700" /> : <GoHeart className="text-2xl" />}
    </div>
  );
}

export default Like;
