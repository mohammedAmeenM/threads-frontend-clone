import { user } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoHeart } from "react-icons/go";
import { IoHeart } from "react-icons/io5";

const Like = ({ userId, postId  }) => {
  const [post , setPost]=useState([])
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await axios.get(`https://social-media-rest-apis.onrender.com/api/posts/post/${postId}`);
        if (response.data && response.data.post) { 
          const { post } = response.data;
          setPost(post);
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
  }, [postId,userId]);
  
  const handleLikeClick = async () => {
    try {
      if (!loading) {
        if (liked) {
          const response = await axios.post(`https://social-media-rest-apis.onrender.com/api/posts/unlike/${postId}`, { userId  });
          if (response.status === 200) {
            setLiked(false);
            setPost(prevPost => ({ ...prevPost, likes: prevPost.likes.filter(like => like !== userId) }));
          } else {
            console.log('error unliking');
          }
        } else {
          await axios.post(`https://social-media-rest-apis.onrender.com/api/posts/like/${postId}`, { userId  });
          setLiked(true);
          setPost(prevPost => ({ ...prevPost, likes: [...prevPost.likes, userId] }));
        }
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div className="flex items-center flex-col">
    <div
      className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center mt-3"
      onClick={handleLikeClick}
    >
      {liked ? <IoHeart className="text-2xl text-red-700" /> : <GoHeart className="text-2xl" />}
    </div>
    <div  className="w-auto h-3 text-white text-opacity-20 gap-2 flex ">{post?.likes?.length} likes</div>
  </div>
  );
}

export default Like;
