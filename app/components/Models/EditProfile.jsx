import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonFillAdd } from "react-icons/bs";
import { toast } from 'react-toastify';
import Image from 'next/image';

const EditProfile = () => {
  const router = useRouter();

  const user = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('user')) || {} : {};
  const userId = user._id;

  const [name, setName] = useState(user.name || '');
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://social-media-rest-apis.onrender.com/api/users/${userId}`);
        if (response.status === 200) {
          const userData = response.data.user;
          setName(userData.name);
          setUsername(userData.username);
          setEmail(userData.email);
          setBio(userData.bio);
          setProfilePic(userData.profilePic);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("profilePic", profilePic);

      const response = await axios.patch(`https://social-media-rest-apis.onrender.com/api/users/${userId}`, formData);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success('Successfully edited profile');
        return router.push('/page/profile');
      }
    } catch (error) {
      console.log('Error editing profile:', error);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal p-20 bg-black">
        <div className="modal-box bg-stone-1000 ">
          <form method="dialog" className="modal-content">
            <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 text-white">
              <div className="w-full h-full flex flex-col gap-y-2 text-white">
                <div className="w-full h-full flex justify-between ">
                  <div className="border-b-[1px] w-9/12">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="bg-transparent w-full p-2 focus:outline-none"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-16 h-16 bg-zinc-800 rounded-full flex justify-center items-center text-2xl text-center"
                    onClick={handleImageClick}
                  >
                    {previewImage ? (
                      <Image
                        src={previewImage} 
                        alt=""
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : profilePic ? (
                      <Image
                        src={profilePic}
                        alt="profile"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : (
                      <BsPersonFillAdd />
                    )}
                  </button>
                  <input
                    type="file"
                    name="img"
                    id="fileInput"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="border-b-[1px] w-full">
                  <label htmlFor="username">User Name</label>
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="bg-transparent w-full p-2 focus:outline-none"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="bio"
                    id="bio"
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                  />
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="bg-transparent w-full  p-2 focus:outline-none"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white rounded-2xl p-3 mt-5 text-black"
              onClick={handleSubmit}
            >
              Done
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop p-2">
          <button className='bg-stone-500 p-2 hover:bg-stone-700'>Close</button>
        </form>
      </dialog>
    </>
  )
}

export default EditProfile;
