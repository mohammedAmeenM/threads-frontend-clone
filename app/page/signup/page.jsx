"use client"
import useAuthStore from "@/app/zustand/users/authStore";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";



let userData

const Signup = () => {
  
  const router = useRouter();

  // ERROR 

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //input reff

  const nameRef=useRef(null);
  const usernameRef=useRef(null);
  const emailRef=useRef(null);
  const phoneNORef=useRef(null);
  const passwordRef=useRef(null);

  //signUp button

  const handleSignUp= async(e)=>{
    e.preventDefault();
    const inputName=nameRef.current.value;
    const inputUsername=usernameRef.current.value;
    const inputEmail=emailRef.current.value;
    const inputPhoneNo=phoneNORef.current.value;
    const inputPassword=passwordRef.current.value;



    if (!inputName) {
      setNameError('Name is required');
      return;
    } else {
      setNameError('');
    }
    if (!inputUsername) {
      setUsernameError('Username is required');
      return;
    } else {
      setUsernameError('');
    }
    if (!inputEmail) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError('');
    }
    if (!inputPhoneNo) {
      setPhoneNoError('Phone Number is required');
      return;
    } else {
      setPhoneNoError('');
    }
    if (!inputPassword) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const data={
        name:inputName,
        username:inputUsername,
        email:inputEmail,
        phoneNumber:inputPhoneNo,
        password:inputPassword
      }
      const response= await axios.post('http://localhost:9000/api/users/signup',data)
      console.log(response.data._id);
      if(response.status===201){
        localStorage.setItem("user",JSON.stringify(response.data))
        toast.success('created')
        return  router.push('/')
      }
    } catch (error) {
      console.log(error,'signupppp')
      toast.error('error')
    }
  }


  const {data:session,mutate}=useSession()
  const {
    googleUserName,
    setGoogleUserName,
    setGoogleEmail,
    googleEmail,
    setGoogleProfile,
    googleProfile,
  }=useAuthStore();

  useEffect(() => {
    if (session && session.user) {
      setGoogleUserName(session.user.name);
      setGoogleEmail(session.user.email);
      setGoogleProfile(session.user.image);
    }
  }, [session, setGoogleEmail, setGoogleProfile, setGoogleUserName]);
     
  const handleGoogleSign = async () => {
  
    try {
      await signIn('google',{callbackUrl:'/'});
      const userData = {
        username: googleUserName,
        email: googleEmail,
        profilePic: googleProfile
      };
  
      const response = await axios.post('http://localhost:9000/api/users/signup-google', userData);
      console.log(response);
  
      if (response) {
        mutate(null);  
        toast.success('created')
        router.push("/");
      } else {
        console.log("Unexpected response:", response);
      }
  
    } catch (error) {
      console.log(error);
      toast.error('error')
    }
  };
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-between gap-3">
          <div className="w-80 gap-2 h-auto flex">
            <input
              type="text"
              placeholder="Name"
              ref={nameRef}
              name="name"
              required
              className="w-1/2 placeholder:ps-2 h-12 rounded-lg p-3 bg-stone-700"
            />
             {nameError && <span className="text-red-500">{nameError}</span>}
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              name="username"
              required
              className="w-1/2 placeholder:ps-2 h-12 p-3 rounded-lg bg-stone-700"
            />
            {usernameError && <span className="text-red-500">{usernameError}</span>}
          </div>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            name="email"
            required
            className="w-full placeholder:ps-2 h-12 rounded-lg bg-stone-700 p-3"
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
          <input
            type="phonenumber"
            placeholder="Phone Number"
            ref={phoneNORef}
            name="phonenumber"
            required
            className="w-full placeholder:ps-2 h-12 rounded-lg bg-stone-700 p-3"
          />
          {phoneNoError && <span className="text-red-500">{phoneNoError}</span>}
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            name="password"
            required
            className="w-full placeholder:ps-2 h-12 rounded-lg bg-stone-700 p-3"
          />
           {passwordError && <span className="text-red-500">{passwordError}</span>}
          <button
            className="bg-white text-black w-80 h-12 rounded-lg"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <span className="text-center text-stone-400 text-sm hover:text-white">
            <a href="#" onClick={() => router.push("/page/login")} className="">
              Already have an account?
            </a>
          </span>
          <span className="text-center text-stone-700 text-sm hover:text-white"></span>
          <div className="flex items-center gap-3">
            <hr className="w-full border-t-[1px] border-gray-500" />
            <span className="text-gray-500">or</span>
            <hr className="w-full border-t-[1px] border-gray-500" />
          </div>
          <span className="text-center my-3">

              <button
                className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-lg border border-white flex items-center justify-center"
                onClick={handleGoogleSign}
              >
                <FcGoogle className="mx-5" /> Signup with Google
              </button>
            
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
