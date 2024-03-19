"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "./Like";
import Repost from "./Repost";
import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Comment from "./Comment";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import getElapsedTime from "./Timeset/time";

const UserProfileReposts = ({ userId,logUserId }) => {
  const [repost, setRepost] = useState([]);

  useEffect(() => {
    const getReposts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/users/post/repost/${userId}`
        );
        console.log(response.data.posts);
        if (response.status === 200) {
          setRepost(response.data.posts);
        }
      } catch (error) {
        console.log("error get replay ", error);
      }
    };
    getReposts();
  }, []);

  return (
    <>
      {repost.length === 0 ? (
        <>
        <div className="flex w-full justify-center items-center  text-white text-opacity-30 h-screen ">
          <h1 className="flex justify-center items-center ">
            No Posts yet
          </h1>
        </div>
        </>
      ) : (
        repost.map((item, index) => (
          <div
            className="w-full md:w-[580px] h-auto md:p-2 p-3 flex flex-col relative top-[-27px] justify-between items-center mb-10"
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
                          : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <button className="relative top-5 left-5 ">
                      <MdAddCircle className="text-2xl hover:inset-5 " />
                    </button>
                  </div>
                  <div className="h-fit md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>
                </div>
              </div>
              <div className="w-full h-full bg-black flex flex-col">
                <div className="w-full flex m-3 justify-between gap-3 items-center">
                  <span className="font-medium text-white hover:underline">
                    {item?.postById?.username}
                  </span>
                  <div className="flex justify-between gap-3 items-center ">
                    <span className="text-xs text-opacity-40 text-white">
                    {getElapsedTime(item.createdOn)}
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
                        <DropdownItem key="follow" className="p-2">
                          Unfollow
                        </DropdownItem>
                        {/* <DropdownItem key="save" className="p-2" >Save</DropdownItem> */}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="h-fit w-auto md:h-[400px] m-2">
                  <p className="my-2 mx-2">{item.text}</p>
                  <div className="w-fit h-fit md:h-full md:w-full rounded-xl ">
                    <img
                      className="rounded-xl  w-full h-full "
                      src={item.image}
                      alt="Post images"
                    />
                  </div>
                </div>
                <div className="flex gap-1 mx-2 mt-10 items-center">
                  <Like userId={logUserId} postId={item._id}/> <Comment postId={item._id}/> <Repost postId={item._id}/>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default UserProfileReposts;
