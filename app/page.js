"use client"

import { useRouter } from 'next/navigation';
import NavigationBar from './components/NavigationBar';
import BottomBar from './components/BottomBar';
import Home from './page/home/page';

function MyApp({ Component, pageProps }) {
  const route=useRouter()
  return (
    <div className="bg-black w-full h-auto flex flex-col ">
      <NavigationBar />
      <Home />
      <BottomBar />
    </div>
  );
}

export default MyApp;

