import {create} from 'zustand';

const usersStore = create ((set) => ({
    
    followerss:[],
    setFollowerss: (userData) => set({followerss: userData}),

    followings:[],
    setFollowings:(userData) => set({followings:userData})

 }))

 export default usersStore