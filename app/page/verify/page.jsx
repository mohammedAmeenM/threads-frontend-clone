"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

const Verify = () => {
  const router = useRouter();
  const otpRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
  
    if (typeof window !== 'undefined') {
      const user = JSON.parse(window.localStorage.getItem('user'));
      if (user) {
        setPhoneNumber(user.phoneNumber);
      }
    }
  }, []);

  const handleOtp = async (e) => {
    e.preventDefault(); 
    const inputOtp = otpRef.current.value; 
    try {
      const otpData = {
        phoneNumber: phoneNumber,
        enterOTP: inputOtp
      };
      const response = await axios.post('http://localhost:9000/api/users/verifyOTP', otpData);
      if (response.status === 200) {
        return router.push('/');
      }
      console.log(response);
    } catch (error) {
      console.log(error, 'otp');
    }
  };

  if (!phoneNumber) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between gap-3">
        <h3 className="flex justify-center">Verify OTP</h3>
        <hr />
        <br />
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
  );
};

export default Verify;
