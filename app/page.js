"use client"

import { useRouter } from 'next/navigation';
import NavigationBar from './components/navigationBar';

function MyApp({ Component, pageProps }) {
  const route=useRouter()
  return (
    <div className="bg-black w-full h-auto   flex flex-col ">
      <NavigationBar />
      <button className="bg-white text-black w-60 h-12 rounded-lg" onClick={()=>route.push('/page/login')}>Login</button>
    </div>
  );
}

export default MyApp;

