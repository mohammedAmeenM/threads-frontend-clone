import React from 'react'
import { FiRepeat } from "react-icons/fi";

function Repost() {

  // on post body
  return ( 

    <div  className='w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center'>
       <FiRepeat  className="text-2xl" /> 
    </div>
  )
}

export default Repost