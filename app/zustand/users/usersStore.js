import {create} from 'zustand';

const usersStore = create ((set) => ({
    
    followerss:[],
    setFollowerss: (userData) => set({followerss: userData}),

 }))

 export default usersStore