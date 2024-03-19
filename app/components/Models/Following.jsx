"use client";
import usersStore from "@/app/zustand/users/usersStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Following = () => {
  const router = useRouter();
  const { followings } = usersStore();
  const [user, setUser] = useState(null);
  const [logUserId, setLogUserId] = useState(false);
  const [username,setUsername] = useState(false)
  const [isFollowing, setIsFollowing] = useState({});

  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLogUserId(user._id);
      setUsername(user.username)
    }
  }, [user]);

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
          { userFollowId: userId ,username:username}
        );
        followingState[userId] = true;
      }
      setIsFollowing(followingState);
    } catch (error) {
      console.error(error, "follow");
    }
  };

  const handleProfile = (userId) => {
    router.push(`/page/user/${userId}`);
  };

  return (
    <>
      <div>
        <dialog id="my_modal_5" className="modal w-3/4">
          <div className="modal-box bg-stone-900 w-full p-5">
            {followings && followings.length === 0 ? (
              <div className="flex justify-center items-center h-screen text-white text-opacity-25">
                <p>No followers</p>
              </div>
            ) : (
              followings.map((user, index) => (
                <div
                  key={index}
                  className="w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3"
                >
                  <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                    <div className="w-12 h-12 bg-black rounded-full overflow-hidden">
                      <img
                        src={
                          user.profilePic ||
                          "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                        }
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-auto h-auto flex flex-col ms-2">
                      <span
                        className="hover:underline mb-3 md:mb-0 cursor-pointer"
                        onClick={() => handleProfile(user._id)}
                      >
                        {user.username}
                      </span>
                      <span>{user.followers.length} followers</span>
                    </div>
                  </div>
                  <div className="active:scale-95 w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
                    <button onClick={() => handleFollow(user._id)}>
                      {isFollowing[user._id] ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Following;
