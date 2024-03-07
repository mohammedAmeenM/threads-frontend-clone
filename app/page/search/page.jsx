import BottomBar from '@/app/components/BottomBar';
import NavigationBar from '@/app/components/NavigationBar';
import React from 'react'
import { RiSearchLine } from "react-icons/ri";

const page = () => {
  return (
    <>
    <NavigationBar />
    <div style={{display:'flex',justifyContent:'center'}}>
    <div className="w-full md:w-[580px] h-screen overflow-hidden md:p-2 p-3  flex flex-col relative justify-between items-center">
      <div className="h-auto w-full bg-black border-white flex flex-col justify-center items-center  border-opacity-30 p-2">
        <div className="h-full w-full flex justify-center items-center">
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full rounded-2xl h-14  pl-12 border border-stone-800 placeholder:opacity-30 "
              style={{ backgroundColor: "#0A0A0A" }}
            //   value={search}
            //   onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <RiSearchLine className="text-white text-opacity-20" />
            </div>
          </div>
        </div>
       
          <>
        
              <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
                <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
                  <div className="w-12 h-12 bg-black rounded-full overflow-hidden">
                    <img
                      src={
                        "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-auto h-auto flex flex-col ms-2">
                    <span className="hover:underline mb-3 md:mb-0"
                   
                    >
                     ameen{" "}
                    </span>
                    <span> 15 followers</span>
                  </div>
                </div>

                <div className=" active:scale-95 w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center"
               
                >
                  <button >
                    follow
                  </button>
                </div>
              </div>
          
          </>
       
      </div>
    </div>
    </div>
    <BottomBar />
  </>
  )
}

export default page
