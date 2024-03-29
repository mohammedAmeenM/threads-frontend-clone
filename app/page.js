"use client";

import { useRouter } from "next/navigation";
import BottomBar from "@/app/components/BottomBar";
import Home from "@/app/page/home/page";
import { useEffect, useState } from "react";
import NavigationBar from "@/app/components/NavigationBar"; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUser) {
      router.push("/");
    } else {
      router.push("/page/login");
    }
  }, []);

  return (
    <div className="bg-black w-full h-auto flex flex-col ">
      <NavigationBar />
      <Home />
      <BottomBar />
    </div>
  );
}

export default MyApp;
