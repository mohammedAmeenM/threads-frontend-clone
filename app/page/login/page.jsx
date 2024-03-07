"use client"
import useAuthStore from "@/app/zustand/users/authStore";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const route=useRouter()

  const {data:session,mutate}=useSession();
  const {googleEmail,setGoogleEmail,isUser}=useAuthStore();

  useEffect(()=>{
    if(session && session.user){
      setGoogleEmail(session.user.email)
    }
  },[session])

  const handleGoogleLogin = async () => {
    try {
      await signIn('google',{
        callbackUrl:'/',
        onSuccess:async (session)=>{
          await mutate(null);
          await GoogleLogin()
        }
      })
    } catch (error) {
      console.error("Error in handleGoogleLogin", error);
    }
  };

  async function GoogleLogin(){
    try {
      const userData={
        email:googleEmail
      }
      const response= await axios.post('http://localhost:9000/api/users/google-login',userData);
      console.log(response);
      if(response){
        route.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const usernameRef=useRef(null);
  const passwordRef=useRef(null)

  const handleLogin=async(e)=>{
    e.preventDefault();
    const inputUsername=usernameRef.current.value;
    const inputPassword=passwordRef.current.value;

    
    try {
      const data={
        username:inputUsername,
        password:inputPassword
      }
       
      const response=await axios.post('http://localhost:9000/api/users/login',data)
      if(response.status===200){
        localStorage.setItem('user',JSON.stringify(response.data))
        return route.push('/')
      }

    } catch (error) {
      console.log(error,'login');
    }
  }
  return (
 
    <div>
     
    
      <div className="w-full h-screen flex justify-center items-center ">
      
          
        <div className="flex flex-col justify-between gap-3 ">
          <input
            type="text"
            placeholder="Username"
            name="username"
            ref={usernameRef}
            required
            className="w-80 placeholder:ps-3 h-12 rounded-lg bg-stone-700 p-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={passwordRef}
            required
            className="w-80 placeholder:ps-3 h-12 rounded-lg bg-stone-700 p-3"
          />

          <button
            className="bg-white text-black w-80 h-12 rounded-lg"
            onClick={handleLogin}
          >
            Log in
          </button>
          <span className="text-center text-stone-400 text-sm hover:text-white">
            <a href="#"  className="">
              Forgot Password?
            </a>
          </span>
          <span className="text-center text-stone-400 text-sm hover:text-white">
            <a   className="" onClick={()=>route.push('/page/signup')}>
              Create Account 
            </a>
          </span>
          
          <div className="flex items-center gap-3">
            <hr className="w-full border-t-2 border-gray-500" />
            <span className="text-gray-500">or</span>
            <hr className="w-full border-t-2 border-gray-500" />
          </div>

          <span className="text-center my-3">
            <button
              className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-lg border border-white flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mx-5" /> Continue with Google
            </button>
          </span>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-stone-900 flex justify-center items-center gap-x-7 ">
          
         <input type="text"placeholder="Enter you Email hete " name="email" id=""   className="w-[200px] h-[40px] rounded-md bg-transparent p-3  " 
         
         />
          <div className="modal-action">
            <form method="dialog" >
              <button type="submit" className="btn mb-4">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
      </div>
  )
}

export default Login
