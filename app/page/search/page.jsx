"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import BottomBar from "@/app/components/BottomBar";
import { useRouter } from "next/navigation";
import NavBarr from "@/app/components/NavBarr";

const Page = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [senderId, setSenderId] = useState(false);
  const [isFollowing, setIsFollowing] = useState({});

  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (userData) {
      router.push("/page/search");
    } else {
      router.push("/page/login");
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      setSenderId(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (senderId) {
      const getUsers = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/api/users"
          );
          if (response.status === 200) {
            const userMap = {};
            response.data.users.forEach((user) => {
              userMap[user._id] = user.followers.includes(senderId);
            });
            setUsers(response.data.users);
            setFilteredUsers(response.data.users);
            setIsFollowing(userMap);
          }
        } catch (error) {
          console.log("get users followers ", error);
        }
      };
      getUsers();
    }
  }, [senderId]);

  const handleFollow = async (userId) => {
    try {
      const followingState = { ...isFollowing };
      if (followingState[userId]) {
        await axios.post(
          `http://localhost:9000/api/users/unfollow/${senderId}`,
          { userUnfollowId: userId }
        );
        followingState[userId] = false;
      } else {
        await axios.post(
          `http://localhost:9000/api/users/follow/${senderId}`,
          { userFollowId: userId }
        );
        followingState[userId] = true;
      }
      setIsFollowing(followingState);

      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === userId) {
            const updatedUser = {
              ...user,
              followers: followingState[userId] ? [...user.followers, senderId] : user.followers.filter(followerId => followerId !== senderId)
            };
            return updatedUser;
          }
          return user;
        });
      });
    } catch (error) {
      console.error(error, "follow");
    }
  };

  useEffect(() => {
    const filtered = users
      .filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      )
      .filter((user) => user._id !== senderId);
    setFilteredUsers(filtered);
  }, [search, users, senderId]);

  const handleProfile = (userId) => {
    router.push(`/page/user/${userId}`);
  };

  return (
    <>
      <NavBarr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="w-full md:w-[580px] h-screen overflow-hidden md:p-2 p-3 flex flex-col relative justify-between items-center">
          <div className="h-auto w-full bg-black border-white flex flex-col justify-center items-center border-opacity-30 p-2">
            <div className="h-full w-full flex justify-center items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="w-full rounded-2xl h-14 pl-12 border border-stone-800 placeholder:opacity-30 "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ backgroundColor: "#0A0A0A" }}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <RiSearchLine className="text-white text-opacity-20" />
                </div>
              </div>
            </div>

            {filteredUsers.map((item) => (
              <div
                key={item._id}
                className="w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3"
              >
                <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                  <div className="w-12 h-12 bg-black rounded-full overflow-hidden">
                    <div
                      className="h-10 w-10 rounded-full bg-white box-border "
                      style={{
                        backgroundImage:`url(${
                          item.profilePic
                            ? item.profilePic
                            : "https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg?fit=1024%2C576&ssl=1"
                        })`,
                        backgroundSize: "contain",
                        backgroundSize: "cover",
                      }}
                    >
                    </div>
                  </div>
                  <div className="w-auto h-auto flex flex-col ms-2">
                    <span
                      className="hover:underline mb-3 md:mb-0"
                      onClick={() => handleProfile(item._id)}
                    >
                      {item.username}
                    </span>
                    <span>{item.followers.length} followers</span>
                  </div>
                </div>

                <div className="active:scale-95 w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
                  <button onClick={() => handleFollow(item._id)}>
                    {isFollowing[item._id] ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Page;
