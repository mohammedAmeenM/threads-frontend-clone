"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {

  const router=useRouter()

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
      console.log(response);
      if(response.status===200){
        return router.push('/')
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
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={passwordRef}
            required
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
          />

          <button
            className="bg-white text-black w-80 h-12 rounded-2xl"
            onClick={handleLogin}
          >
            Log in
          </button>
          <span className="text-center text-stone-700 text-sm hover:text-white">
            <a href="#"  className="">
              Forgot Password?
            </a>
          </span>
          <span className="text-center text-stone-700 text-sm hover:text-white">
            <a href="#"  className="">
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
              className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-2xl border border-white flex items-center justify-center"
             
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
