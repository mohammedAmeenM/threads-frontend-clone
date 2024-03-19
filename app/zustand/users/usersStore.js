import {create} from 'zustand';

const usersStore = create ((set) => ({
    
    followerss:[],
    setFollowerss: (userData) => set({followerss: userData}),

    followings:[],
    setFollowings:(userData) => set({followings:userData}),

    all: true,
    setAll: () => set({all: true , selected: "all"}) ,
 

    followers:false,
    setFollowers: () => set({followers: true, selected: "followers"}),
    setOutFollowers: () => set({followers: false, selected: null}),
    
    likes: false,
    setLikes: () => set({likes: true, selected: "likes"}),
    setOutLikes: () => set({likes: false, selected: null}),


 }))

 export default usersStore