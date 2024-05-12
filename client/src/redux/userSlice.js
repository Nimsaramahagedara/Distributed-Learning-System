import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userId:Cookies.get('uid'),
    },
    reducers:{
        updateUser:(state, action)=>{
            state.userId = action.payload; // Update user with the payload
        },
    }
})

export const {
    updateUser
} = userSlice.actions

export default userSlice.reducer