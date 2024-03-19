import usersStore from '@/app/zustand/users/usersStore'
import React from 'react'

const AllFollowersBtn = () => {
    const {setFollowers, setFollowerss} = usersStore()
    const handleClick = ()=>{
        setFollowers()
    }
  return (
    <>
    <button className="min-w-[100px] py-2 border rounded-lg active:scale-95 brounded-lg border-white border-opacity-20  flex justify-center items-center active:bg-white active:text-black"
    onClick={handleClick}
    > Followers </button>
    </>
  )
}

export default AllFollowersBtn
