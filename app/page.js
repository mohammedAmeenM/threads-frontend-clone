"use client"

import { useRouter } from 'next/navigation';
import NavigationBar from './components/navigationBar';

function MyApp({ Component, pageProps }) {
  const route=useRouter()
  return (
    <div className="bg-black w-full h-auto   flex flex-col ">
      <NavigationBar />
    </div>
  );
}

export default MyApp;

