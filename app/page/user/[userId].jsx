
import BottomBar from "@/app/components/BottomBar";
import NavigationBar from "@/app/components/NavigationBar";
import ProfilePosts from "@/app/components/ProfilePosts";
import ProfileReplyPosts from "@/app/components/ProfileReplyPosts";
import ProfileRepost from "@/app/components/ProfileRepost";
import Replies from "@/app/components/Replies";
import Reposts from "@/app/components/Reposts";
import Threads from "@/app/components/Threads";
import { usePosts } from "@/app/zustand/posts/posts";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa6";

const Page = () => {
    const router=useRouter();
    const {userId}=router.query;
    console.log(userId,'weds')
    const {selected}=usePosts()
  return (
    <>
    <NavigationBar />
    <div style={{display:"flex",justifyContent:'center'}}>
    <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center   ">
      <div className="h-auto w-full flex justify-between   p-2">
        <div className=" w-1/2 h-auto flex flex-col justify-start">
          <span className="font-bold text-lg">Amiiee.... </span>

          {/* user name and btn */}

          <div className="flex gap-6">
            <span>Ameeeeeeeeeeeen </span>
            <button className="bg-stone-900 w-[100px] rounded-xl text-white text-opacity-20 ">
              threas.net
            </button>
          </div>

          <div className="flex justify-stretch ">
            <div
              className="w-4 h-4 rounded-full bg-white mt-5"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                backgroundSize: "contain",
              }}
            ></div>
            <div
              className="w-4 h-4 rounded-full bg-white mt-5 "
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                backgroundSize: "contain",
              }}
            ></div>
            <span className="mt-4 text-white text-opacity-20 ms-5 hover:underline">
              {" "}
             16 following
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
            <FaInstagram />{" "}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-evenly gap-2">

      <button className="w-1/2 h-10 bg-white border border-opacity-20 border-white text-black text-center rounded-lg mt-3">
       Follow
      </button>
      <button className="w-1/2 h-10 bg-transparent border border-opacity-20 border-white text-center rounded-lg mt-3">
        Mention
      </button>
      </div>
      <div className="w-full h-full  flex justify-evenly items-center  text-white text-center mt-2 p-3">
        <Threads />
        <Replies />
        <Reposts />
      </div>
    {selected === "profileRepliPost" && <ProfileReplyPosts />}
    {selected === "repost" && <ProfileRepost />}
    {!selected && <ProfilePosts />}
    </div>

  </div>
  <BottomBar />
  </>
  )
}

export default Page
