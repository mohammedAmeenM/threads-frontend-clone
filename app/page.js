"use client";

import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import Home from "./page/home/page";
import { useRouter } from "next/navigation";
import NavBarr from "./components/NavBarr";

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
  }, [router]);

  return (
    <div className="bg-black w-full h-auto flex flex-col ">
      <NavBarr />
      <Home />
      <BottomBar />
    </div>
  );
}

export default MyApp;
