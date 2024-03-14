"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi"; 
import { HiUser } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const NavigationBar = () => {
  const router=useRouter()

  const [user,setUser]=useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true); 
    }
  }, []);

  const { theme, setTheme } = useTheme(); 
  const handleToggleTheme = () => {
    console.log("Current theme:", theme);
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleLogout=()=>{
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  }
  return (
    <div
      className={`w-full h-auto mt-0 p-5 flex  justify-between items-center sticky top-0 bg-opacity-90 bg-black text-white`}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="text-xs  font-thin w-full md:w-auto flex justify-center">
        {" "}
        <div
          className={`md:h-14 md:w-14 h-8 w-8 bg-black text-3xl`}
          style={{
            backgroundImage: `url("https://seeklogo.com/images/T/threads-logo-1ABBA246BE-seeklogo.com.png")`,
            backgroundSize: "contain",
          }}
        ></div>
        <div className="dropdown dropdown-end text-3xl absolute right-0 md:hidden">
      <Dropdown  >
        <DropdownTrigger>
          <div tabIndex={0} role="button">
            <MdOutlineSort />
          </div>
        </DropdownTrigger>
        <DropdownMenu className="p-2 shadow menu dropdown-content font-bold z-[1] bg-stone-900 rounded-lg w-52 text-md">
          <DropdownItem className="py-1">
            <a>Switch Appearance</a>
          </DropdownItem>
          {isLoggedIn ? (
                <DropdownItem className="py-1"> 
                  <a onClick={handleLogout}>Log out</a>
                </DropdownItem>
              ) : (
                <DropdownItem className="py-1">
                  <a onClick={() => router.push("/page/login")}>Sign up</a>
                </DropdownItem>
              )}
        </DropdownMenu>
      </Dropdown>
    </div>
    </div>
      <div className=" text-white font-thin h-auto md:flex hidden  ">
        <button
          className={`btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center '} `}
         onClick={()=>router.push('/')}
        >
          <GrHomeRounded
            className={`text-3xl text-white text-opacity-50 hover:text-opacity-90`}
          />
        </button>
        <button
          className={` btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center `}
          onClick={()=>router.push('/page/search')}
        >
          <FiSearch className="text-3xl text-white text-opacity-50  hover:text-opacity-90" />
        </button>

       

        <button
          className="btn h-auto  py-n px-7 bg-transparent hover:bg-stone-800 border-none rounded-lg  flex flex-col justify-center items-center"
         onClick={()=>router.push('/page/create')}
        >
          <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className={`btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800  rounded-lg  border-none flex flex-col justify-center items-center`}
         
        >
          <GoHeart className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className={`btn h-auto px-7  py-5 bg-transparent hover:bg-stone-800  rounded-lg flex border-none flex-col justify-center items-center `}
          onClick={()=>router.push('/page/profile')}
        >
          <HiUser className={`text-3xl text-white text-opacity-50 hover:text-opacity-90 ` } />
        </button>
      </div>
      <div className="text-3xl text-white text-opacity-50 bg-black font-thin md:flex hidden">
      <Dropdown  className="md:flex justify-end ">
        <DropdownTrigger>
          <div tabIndex={0} role="button">
            <MdOutlineSort />
          </div>
        </DropdownTrigger>
        <DropdownMenu className="p-4   shadow menu dropdown-content font-bold z-[1] bg-stone-900 rounded-lg w-52 text-md">
          <DropdownItem className="py-1">
            <a onClick={handleToggleTheme}>Switch Appearance</a>
          </DropdownItem>
          {isLoggedIn ? (
                <DropdownItem className="py-1"> 
                  <a onClick={handleLogout}>Log out</a>
                </DropdownItem>
              ) : (
                <DropdownItem className="py-1">
                  <a onClick={() => router.push("/page/login")}>Sign up</a>
                </DropdownItem>
              )}
        </DropdownMenu>
      </Dropdown>
    </div>
    </div> 
     );
};

export default NavigationBar;
