"use client";
import usersStore from '@/app/zustand/users/usersStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const LikesUsers = () => {
  const router = useRouter()
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = usersStore();

  useEffect(() => {
    const fetchLikeNotifications = async () => {
      try {
        const userId = user?._id;
        if (userId) {
          const response = await axios.get(`http://localhost:9000/api/users/notification/${userId}`);
          const likeNotifications = response.data.notifications.filter(notification => notification.type === 'like');
          setNotifications(likeNotifications);
        } else {
          console.error('User ID is undefined.');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikeNotifications();
  }, [user]);

  const handleProfile = (userId) => {
    if (user._id !== userId) {
      router.push(`/page/user/${userId}`);
    } else {
      router.push("/page/profile");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {notifications.length === 0 ? (
            <div className='flex justify-center items-center h-screen text-white text-opacity-25'>
              <p>No likes found</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="md:w-[620px] w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
                <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                  <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
                    <img src={notification.senderUserId?.profilePic || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="" className='h-full w-full' />
                  </div>
                  <div className="w-full md:w-auto h-auto flex flex-col ms-2">
                    <span className="hover:underline mb-3 md:mb-0" onClick={()=>handleProfile(notification.senderUserId?._id)}>{notification.senderUserId?.username}</span>
                    <span>{notification.description}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default LikesUsers;
