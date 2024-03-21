"use client";
import usersStore from '@/app/zustand/users/usersStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Allusers = () => {
  const router = useRouter();
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = usersStore();

  useEffect(() => {
    const fetchAllNotification = async () => {
      try {
        const userId = user?._id;
        if (userId) {
          const response = await axios.get(`http://localhost:9000/api/users/notification/${userId}`);
          setNotification(response.data.notifications); 
        } else {
          console.error('User ID is undefined.');
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotification();
  }, [user]);

  const handleProfile = (userId) => {
  console.log('hiiiii')
    if (user._id !== userId) {
      router.push(`/page/user/${userId}`);
    } else {
      router.push("/page/profile");
    }
  };


  const [isFollowing, setIsFollowing] = useState({});

  const logUserId= user._id;

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
          { userFollowId: userId }
        );
        followingState[userId] = true;
      }
      setIsFollowing(followingState);
    } catch (error) {
      console.error(error, "follow");
    }
  };


  const renderNotificationType = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!notification || notification.length === 0) {
      return <p>No notifications found.</p>;
    }

    return notification.map((notif, index) => {
      switch (notif.type) {
        case 'like':
          return (
            <div key={index} className="md:w-[620px] w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
              <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
                  <img src={notif.senderUserId?.profilePic || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="" className='h-full w-full' />
                </div>
                <div className="w-full md:w-auto h-auto flex flex-col ms-2">
                  <span className="hover:underline mb-3 md:mb-0" onClick={()=>handleProfile(notif?.senderUserId?._id)}>{notif.senderUserId?.username}</span>
                  <span>{notif.description}</span>
                </div>
              </div>
            </div>
          );
        case 'follow':
          return (
            <div key={index} className="md:w-[620px] w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
              <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
                  <img src={notif?.senderUserId?.profilePic || 'default-profile-image.jpg'} alt="" className='h-full w-full' />
                </div>
                <div className="w-full md:w-auto h-auto flex flex-col ms-2">
                  <span className="hover:underline mb-3 md:mb-0"  onClick={() => handleProfile(notif?.senderUserId?._id)}>{notif?.senderUserId?.username}</span>
                  <span>{notif.description}</span>
                </div>
              </div>
              <div className="w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
                <button onClick={() => handleFollow(notif?.senderUserId?._id)}> {isFollowing[notif?.senderUserId?._id] ? "Following" : "Follow"}</button>
              </div>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return renderNotificationType();
};

export default Allusers;
