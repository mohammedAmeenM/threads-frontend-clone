"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";


const Verify = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const phoneNumber=user.phoneNumber
  console.log(phoneNumber);
  const router=useRouter()
 
    const otpRef=useRef(null);

    const handleOtp=async (e)=>{
      e.preventDefault(); 
      const inputOtp=otpRef.current.value; 
     try {
      const otpData={
        phoneNumber:phoneNumber,
        enterOTP:inputOtp
      }
      const response=await axios.post('http://localhost:9000/api/users/verifyOTP',otpData)
      if(response.status===200){
        return router.push('/')
      }
      console.log(response);
     } catch (error) {
      console.log(error,'otp')
     }
    }

  return (
    <div >
        <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between gap-3">
       
       <h3 className="flex justify-center ">Verify OTP</h3><hr /><br />
     
      
        <input
          type="number"
          placeholder="Enter OTP"
          ref={otpRef}
          name="number"
          required

          className="w-full placeholder:ps-2 h-12 rounded-lg bg-stone-700 p-3"
        />
     
        <button
          className="bg-white text-black w-80 h-12 rounded-lg"
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
