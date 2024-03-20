import usersStore from '@/app/zustand/users/usersStore'
import React from 'react'

const AllUsersBtn = ({userId}) => {
    const {setOutFollowers }  = usersStore()
    const handleClick =  () => {
      setOutFollowers()
      
    }
  return (
    <>
    <button className="min-w-[100px] py-2 border active:scale-95 brounded-lg border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black"
   onClick={handleClick}
   > All </button>
</>
  )
}

export default AllUsersBtn
