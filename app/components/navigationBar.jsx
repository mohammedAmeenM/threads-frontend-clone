"use client";
import React from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiUser } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";

const NavigationBar = () => {
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
          className={`md:h-14 md:w-14 h-8 w-8 bg-black`}
          style={{
            backgroundImage: `url("https://seeklogo.com/images/T/threads-logo-1ABBA246BE-seeklogo.com.png")`,
            backgroundSize: "contain",
          }}
        ></div>
        <div className="dropdown dropdown-end text-3xl absolute right-0 md:hidden">
          <div tabIndex={0} role="button">
            <MdOutlineSort />
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content z-[1] bg-stone-900 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Log out</a>
            </li>
          </ul>
        </div>{" "}
      </div>
      <div className=" text-white font-thin h-auto md:flex hidden  ">
        <button
          className={`btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center `}
        >
          <HiHome
            className={`text-3xl text-white text-opacity-50 hover:text-opacity-90`}
          />
        </button>
        <button
          className={` btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center `}
        >
          <FiSearch className="text-3xl text-white text-opacity-50  hover:text-opacity-90" />
        </button>

        <button className="btn h-auto  py-n px-7 bg-transparent hover:bg-stone-800 border-none rounded-lg  flex flex-col justify-center items-center">
          <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className={`btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800  rounded-lg  border-none flex flex-col justify-center items-center `}
        >
          <GoHeart className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className={`btn h-auto px-7  py-5 bg-transparent hover:bg-stone-800  rounded-lg flex border-none flex-col justify-center items-center `}
        >
          <HiUser
            className={`text-3xl text-white text-opacity-50 hover:text-opacity-90 `}
          />
        </button>
      </div>
      <div className="text-3xl text-white text-opacity-50 font-thin md:flex hidden ">
        {" "}
        <div className="dropdown dropdown-end md:flex justify-end ">
          <div tabIndex={0} role="button">
            {" "}
            <MdOutlineSort />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
