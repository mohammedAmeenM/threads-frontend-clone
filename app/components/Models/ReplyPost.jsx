import React from 'react'
import { IoIosMore } from "react-icons/io";

const ReplyPost = () => {
  return (
    <dialog id="my_modal_4" className="modal">
    <div className="modal-box md:w-full md:h-full w-screen h-screen bg-black overflow-scroll">
      <div
        className=" w-auto  h-auto  md:p-2 p-3 flex flex-col  justify-between items-center mb-10 "
        //   key={index}
      >
        <div className="h-auto w-full bg-black border-white flex border-opacity-30 p-2">
          <div className="h-auto  w-fit">
            <div className="w-fit h-full  flex flex-col items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-white box-border "
                style={{
                  backgroundImage: `url(${              
                    "https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704585600&semt=sph"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className={` md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg cross-line `}
              ></div>

              <div className="w-10 h-10 relative flex justify-center"></div>
            </div>
          </div>
          <div className=" w-full h-full bg-black flex flex-col">
            <div className="w-full flex m-3 justify-between gap-3 items-center">
              <span className="font-medium text-white hover:underline"></span>

              <div className="flex justify-between gap-3 items-center ">
                <span className="text-xs text-opacity-40 text-white">
                  14 h
                </span>

                <button className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center">
                  <IoIosMore className="text-white" />
                </button>
              </div>
            </div>
            <div className="h-fit w-auto  m-2">
              <p className="my-2 mx-2">asdfghjkl;❤️❤️❤️❤️ </p>
              <div className=" w-fit h-fit  rounded-xl ">
                <img
                  className="rounded-xl w-full h-full"
                  src={"https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"}
                  alt="...."
                />
              </div>
            </div>
            <div className="flex gap-1 mx-2 mt-10 items-center">
              <div className="flex-grow">
                {" "}
          
                <textarea
                  className="bg-transparent border-b border-gray-300 focus:outline-none placeholder:text-white placeholder:text-opacity-20"
                  placeholder="Reply to name..."
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                 
                ></textarea>
              </div>
              <button
                className="px-5 py-2 rounded-full bg-white text-black font-medium bg-opacity-40"
                
              >
                Post
              </button>
            </div>

            <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3"></div>
          </div>
        </div>
      </div>
      <button
        className="sm:hidden"
        onClick={() => document.getElementById("my_modal_4").close()}
      >
        Cansel
      </button>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  )
}

export default ReplyPost
