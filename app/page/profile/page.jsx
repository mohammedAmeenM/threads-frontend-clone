import React from 'react'

const page = () => {
  return (
    <>
       <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center   ">
        <div className="h-auto w-full flex justify-between   p-2">
          <div className=" w-1/2 h-auto flex flex-col justify-start">
            <span>Ameeen____ </span>

    

            <div className="flex gap-1">
              <span>Ameeennn..</span>
              <button className="bg-stone-900 w-[90px] text-xs rounded-xl text-white text-opacity-20 ">
                threads.net
              </button>
            </div>

            <div className="flex justify-stretch ">
             
                <div className="flex gap-1 mt-5 relative">
                  
                    <div
                      className={`w-4 h-4 bg-black absolute rounded-full`}

                      style={{
                        backgroundImage: `url(${
                          
                             "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                        })`,
                        backgroundSize: "contain",
                      }}
                      ></div>
                      
                </div>
              
           

              <span className="mt-4 text-white text-opacity-20 mx-8 hover:underline" 
              
              >
                {" "}
                followers
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col ">
            <div
              className="h-16 w-16 rounded-full bg-white box-border md:h-20 md:w-20"
              style={{
                backgroundImage: `url(${
                 
                    "https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg?fit=1024%2C576&ssl=1"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="text-2xl ml-12 mt-5">
  {" "}
            </div>
          </div>
        </div>
        <button className="w-full h-10 bg-transparent border border-opacity-20 border-white text-center rounded-md mt-3"
        >
          Edit Profile
        </button>
        <div className="w-full h-full  flex justify-evenly items-center  text-white text-center mt-2 p-3">
       
        </div> 
      </div>
    </>
  )
}

export default page
