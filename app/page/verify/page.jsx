"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";


const userId = localStorage.getItem("userId")
const Verify = () => {
    const router=useRouter()

    const otpRef=useRef(null);

    const handleOtp=async (e)=>{
      e.preventDefault(); 
      const inputOtp=otpRef.current.value; 
      console.log(userId);
     try {
      const otpData={
        userId:userId,
        enterOTP:inputOtp
      }
      const response=await axios.post('http://localhost:9000/api/users/verifyOTP',otpData)
      if(response.status===200){
        return router.push('/page/login')
      }
      console.log(response);
     } catch (error) {
      console.log(error,'otp')
     }
    }

  return (
    <div>
        <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between gap-3">
       
       <h3 className="flex justify-center ">Verify OTP</h3><hr /><br />
     
      
        <input
          type="number"
          placeholder="Enter OTP"
          ref={otpRef}
          name="number"
          required

          className="w-full placeholder:ps-2 h-12 rounded-2xl bg-stone-800 p-3"
        />
     
        <button
          className="bg-white text-black w-80 h-12 rounded-2xl"
        onClick={handleOtp}
        >
          Verify
        </button>

       
      </div>
    </div>
    </div>
  )
}

export default Verify
