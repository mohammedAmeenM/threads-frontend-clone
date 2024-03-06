import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BsPersonFillAdd } from "react-icons/bs";

const EditProfile = () => {

  const router=useRouter()

  const userId=localStorage.getItem('userId')
  const [name,setName]=useState('');
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [bio,setBio]=useState('');
  const [profilePic,setProfilePic]=useState(null);
  const [previewImage, setPreviewImage] = useState(null); 


//reff image-----
  const fileInputRef=useRef(null)

  
const handleImageClick= (e)=>{
  e.preventDefault();
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
}
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file)); 
  }
};


const fetchProfile=async()=>{
  try {
    console.log('hiiiii')
    const response= await axios.get(`http://localhost:9000/api/users/profile/${userId}`)
    if(response.status===200){
      setName(response.data.user.name)
      setUsername(response.data.user.username)
      setEmail(response.data.user.email)
      setBio(response.data.user.bio)
      setProfilePic(response.data.user.profilePic)
    }
    console.log(response.data.user.name,'helloo')
  } catch (error) {
    console.log('error fetch user profile',error)
  }
}
useEffect(()=>{
  fetchProfile()
},[])

const formdata= new FormData()
formdata.append("name",name)
formdata.append("username",username)
formdata.append("email",email)
formdata.append("bio",bio)
formdata.append("profilePic",profilePic)

const handleSubmit=async()=>{
  try {
    const response= await axios.patch(`http://localhost:9000/api/users/updateProfile/${userId}`,formdata)
    if(response.status===200){
      return router.push('/page/profile')
    }
  } catch (error) {
      console.log('error edit',error)
  }
}

  return (
    <>
    <dialog id="my_modal_3" className="modal p-20">
      <div className="modal-box bg-stone-1000">
        <form
          method="dialog"
          className="modal-content"
         
        >
          {/* {console.log(profile.user._id)} */}
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
                      <img
                        src={previewImage} // Display preview URL if available
                        alt=""
                        className="h-full w-full rounded-full"
                        style={{
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ) : profilePic ? (
                      <img
                        src={profilePic}
                        alt=""
                        className="h-full w-full rounded-full"
                        style={{
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
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
            type="submit "
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

export default EditProfile
