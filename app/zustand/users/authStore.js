import {create} from 'zustand'

const useAuthStore=create ((set)=>({
    googleUserName:"",
    setGoogleUserName:(userData)=>set({googleUserName:userData}),

    googleEmail:"",
    setGoogleEmail:(userData)=>set({googleEmail:userData}),

    googleProfile:"",
    setGoogleProfile:(userData)=>set({googleProfile:userData}),

    isUser:false,
    setIsUser:(userData)=>set({isUser:userData})
}))

export default useAuthStore