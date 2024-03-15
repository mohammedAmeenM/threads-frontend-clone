"use client";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Like from "./Like";
import Repost from "./Repost";
import Share from "./Share";
import Comment from "./Comment";
import axios from "axios";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import EditPost from "./Models/EditPost";

const ProfilePosts = () => {
  const [post, setPost] = useState([]);
  const [isOpenn, setIsOpenn] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpenn(!isOpenn);
  };

  const fetchUserPost = async () => {
    try {
      const userData = JSON.parse(window.localStorage.getItem("user"));
      const userId = userData ? userData._id : null;
      if (userId) {
        const response = await axios.get(
          `http://localhost:9000/api/users/post/${userId}`
        );
        setPost(response.data.post);
      } else {
        console.log("User ID is null");
      }
    } catch (error) {
      console.log("Error fetching user post", error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUserPost();
    }
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSave = async (editedPost) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/users/post/${editedPost._id}`,
        editedPost
      );
      if (response.status === 200) {
        fetchUserPost();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("Error editing post", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/users/post/${postId}`
      );
      if (response.status === 200) {
        fetchUserPost();
      }
    } catch (error) {
      console.log("error delete product", error);
    }
  };

  return (
    <>
      {post.length === 0 ? (
        <>
          <div className="flex w-full justify-center items-center  text-white text-opacity-30 h-screen ">
            <h1 className="flex justify-center items-center ">No Posts yet</h1>
          </div>
        </>
      ) : (
        <>
          {post.map((item, index) => (
            <>
              <div
                className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col relative top-[-27px]  justify-between items-center mb-10 "
                key={index}
              >
                <div className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
                  <div className="h-ful w-fit">
                    <div className="w-fit h-full  flex flex-col items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full bg-white box-border "
                        style={{
                          backgroundImage: `url(${
                            item?.postById?.profilePic
                              ? item?.postById?.profilePic
                              : " https://cdn-icons-png.flaticon.com/512/6596/6596121.png "
                          })`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <button className=" relative top-5 left-5  ">
                          <MdAddCircle className="text-2xl hover:inset-5 " />
                        </button>
                      </div>
                      <div className="  h-fit md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>

                      <div className="w-10 h-10 relative flex justify-center">
                        {/* {item.replies.slice(0, 3).map((reply, index) => (
                      <div
                        key={index}
                        className={`w-${5 - index} h-${
                          5 - index
                        } bg-black absolute ${
                          index === 0
                            ? "top-0 right-0"
                            : index === 1
                            ? "top-2 left-1"
                            : "bottom-1 left-4"
                        } rounded-full`}
                        style={{
                          backgroundImage: `url(${
                            reply.userProfilePic
                              ? reply.userProfilePic
                              : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                          })`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                    ))} */}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full h-full bg-black flex flex-col">
                    <div className="w-full flex m-3 justify-between gap-3 items-center">
                      <span className="font-medium text-white hover:underline">
                        {item?.postById?.username}{" "}
                      </span>
                      <div className="flex justify-between gap-3 items-center ">
                        <span className="text-xs text-opacity-40 text-white">
                          14 h
                        </span>

                        <Dropdown className="bg-black">
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center"
                            >
                              <IoIosMore className="text-white" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            style={{
                              backgroundColor: "black",
                              padding: "8px",
                              tableLayout: "-moz-initial",
                              borderRadius: "10px",
                            }}
                          >
                            <DropdownItem
                              key="edit"
                              className="p-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem key="save" className="p-2">
                              Save
                            </DropdownItem>
                            <DropdownItem
                              key="block"
                              style={{ color: "red" }}
                              className="p-2 text-danger"
                              onClick={() => handleDelete(item._id)}
                              color="danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                    {isModalOpen && (
                      <EditPost
                        post={selectedPost}
                        onSave={handleSave}
                        onClose={handleCloseModal}
                      />
                    )}
                    <div className="h-fit w-auto  md:h-[400px] m-2">
                      <p className="my-2 mx-2">{item.text}</p>
                      <div className=" w-fit h-fit md:h-full md:w-full rounded-xl ">
                        <img
                          className="rounded-xl  w-fit h-full "
                          src={item.image}
                          alt="Post images"
                        />
                      </div>
                    </div>

                    <div className="flex gap-1 mx-2 mt-10 items-center">
                      <Like /> <Comment /> <Repost /> <Share />
                    </div>
                    <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3">
                      <span>10 replies</span>
                      <span>14 likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default ProfilePosts;
