"use client"
import usersStore from '@/app/zustand/users/usersStore';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Followers = () => {
  const router = useRouter()
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = usersStore();

  useEffect(() => {
    const fetchFollowNotifications = async () => {
      try {
        const userId = user?._id;
        if (userId) {
          const response = await axios.get(`http://localhost:9000/api/users/notification/${userId}`);
          setNotifications(response.data.notifications.filter(notification => notification.type === 'follow'));
        } else {
          console.error('User ID is undefined.');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowNotifications();
  }, [user]);

  const handleProfile = (userId) => {
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

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {notifications.length === 0 ? (
            <div className='flex justify-center items-center h-screen text-white text-opacity-25'>
              <p>No followers</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="md:w-[620px] w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
                <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                  <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
                    <img src={notification.senderUserId?.profilePic || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt='' />
                  </div>
                  <div className="w-full md:w-auto h-auto flex flex-col ms-2">
                    <span className="hover:underline mb-3 md:mb-0" onClick={()=>handleProfile(notification?.senderUserId?._id)}>{notification.senderUserId?.username}</span>
                    <span>{notification.description}</span>
                  </div>
                </div>
                <div className="w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
                <button onClick={() => handleFollow(notification?.senderUserId?._id)}> {isFollowing[notification?.senderUserId?._id] ? "Following" : "Follow"}</button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default Followers;
