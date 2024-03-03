import { create } from "zustand";

const usePosts= create ((set)=>({
    post: [], 

    
    repliPost:false, 
    setRepliPost: () => set({repliPost: true, selected:"profileRepliPost"}),
    setOutRepliPost: () => set({repliPost: false, selected:null}),

    repost:false,
    setRepost: () => set({ repost: true, selected: 'repost'}),
    setOutRepost: () => set({ repost: false, selected: null}),
    selected: null
 
}))

export {usePosts}