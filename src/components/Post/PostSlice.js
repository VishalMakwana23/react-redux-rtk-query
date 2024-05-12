import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
    },
    reducers : {
        getAllPosts:(state,action) => {
            state.posts = action.payload;
        }
    }
})

export default postSlice.reducer;
export const  {
    getAllPosts,
} = postSlice.actions