import React from 'react'
import { BsPersonFillAdd } from "react-icons/bs";

const EditProfile = () => {
  


  return (
    <>
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-stone-900">
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
                   
                  />
                </div>
                <button
                  className="w-16 h-16 bg-zinc-800 rounded-full flex justify-center items-center text-2xl text-center"

                >
                  
                
                    <img
                      src={'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                      alt=""
                      className="h-full w-full rounded-full"
                      style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                 
                    <BsPersonFillAdd />
                  
                </button>
                <input
                  type="file"
                  name="img"
                  id="fileInput"
                  
                  className="hidden"
                  
                />
              </div>

              <div className="border-b-[1px] w-full">
                <label htmlFor="profilePic">User Name</label>
                <div className="flex justify-between">
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="username"
                    id="username"
                   
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
                 
                />
              </div>
              <div className="border-b-[1px] w-full">
                <label htmlFor="bio">Email</label>
                <input
                  type="text"
                  className="bg-transparent w-full  p-2 focus:outline-none"
                  name="bio"
                  id="bio"
          
                />
              </div>
            </div>
          </div>

          <button
            type="submit "
            className="w-full bg-white rounded-2xl p-3 mt-5 text-black"
          >
            Done
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  </>
  )
}

export default EditProfile
