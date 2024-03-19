import React from 'react'

const Followers = () => {
  return (
    <>
    {/* {followerss.length === 0 ? (
      <div className='flex justify-center items-center h-screen text-white text-opacity-25'>
        <p>No followers </p>

      </div>
    ) : ( */}
    
        <div className="md:w-[620px] w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
          <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
              <img src={ "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} alt='' />
            </div>
            <div className="w-full md:w-auto h-auto flex flex-col ms-2">
              <span className="hover:underline mb-3 md:mb-0">amiiiieee</span>
              <span>13 followers</span>
            </div>
          </div>

          <div className="w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
            <button>Follow Back</button>
          </div>
        </div>
     
    {/* )} */}
  </>
  )
}

export default Followers
