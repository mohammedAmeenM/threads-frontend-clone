"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { useRouter } from "next/navigation";
import BottomBar from "@/app/components/BottomBar";
import { toast } from "react-toastify";
import NavBarr from "@/app/components/NavBarr";
import Image from "next/image";

const Page = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setUserId(user._id);
      setProfilePic(user.profilePic);
      setUsername(user.username);
    }
  }, []);

  const router = useRouter();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!text || !image) {
      console.log("error");
      return;
    }
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("text", text);
    formData.append("image", image);
    try {
      const response = await fetch("https://www.api.poststream.site/api/users/post", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Post created successfully");
        router.push("/");
      } else {
        console.log("error uploading");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to create post");
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <NavBarr />
      <div className="fixed top-0 pt-16 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <form encType="multipart/form-data">
          <div className="w-full h-[400px] max-w-lg mx-auto p-8 bg-stone-900 rounded-3xl">
            <div className="w-full h-5 flex justify-between">
              <div className="w-3/4 mx-20 text-md font-bold text-white">
                New thread
              </div>
              <div className="w-auto items-end">
                <CgMoreO />
              </div>
            </div>
            <div className="w-full h-[400px]">
              <div className="w-full h-auto flex justify-start my-4">
                <div className="w-auto h-auto  flex justify-start  my-4 mx-3">
                  <div className="h-[100px] w-8  flex justify-center flex-col gap-1 ms-2 ">
                    <div
                      className="w-8 h-8 rounded-full bg-white"
                      style={{
                        backgroundImage: `url(${
                          profilePic
                            ? profilePic
                            : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        })`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="h-8 w-[1px] bg-opacity-20 bg-white ms-4   "></div>
                    <div className="w-3 h-3 rounded-full bg-white ms-[9px] "></div>
                  </div>
                  <div className="w-auto h-auto flex justify-start items-start flex-col ms-3 mt-3 relative">
                    <span className=" w-full h-9 text-white">{username}</span>
                    <textarea
                      type="text"
                      name="text"
                      placeholder="Start a thread..."
                      id=""
                      onChange={(e) => setText(e.target.value)}
                      className="border-none outline-none bg-transparent"
                    />
                    <button
                      className="h-auto px-2 py-3 bg-transparent border-none rounded-lg flex flex-col justify-center items-center"
                      onClick={handleImageClick}
                    >
                      <IoImagesOutline className="text-lg text-white text-opacity-50 hover:text-opacity-90" />
                    </button>
                    <input
                      type="file"
                      name="image"
                      id="fileInput"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-auto flex justify-end px-6">
                <button
                  className="w-16 h-10 rounded-3xl bg-stone-700 text-black font-medium"
                  type="submit"
                  onClick={handleAddPost}
                >
                  Post
                </button>
              </div>
              {previewImage && (
                <div className="relative mt-[-100px]   w-24 h-24">
                  <Image
                    src={previewImage}
                    alt="Image Preview"
                    className="w-full h-full rounded-md object-cover"
                    layout="fill"
                  />
                </div>
              )}
            </div>
            <div className="absolute  bottom-4 right-4 lg:bottom-auto lg:top-4 lg:right-4"></div>
          </div>
        </form>

        <div className="w-10 absolute bottom-32  ">
          <button
            className="text-white text-opacity-50 hover:text-opacity-90"
            onClick={() => router.push("/")}
          >
            Close
          </button>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Page;
