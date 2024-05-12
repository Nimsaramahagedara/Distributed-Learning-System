import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userId:Cookies.get('uid'),
        role:Cookies.get('role'),
        token:Cookies.get('token')
    },
    reducers:{
        storeUser:(state, action)=>{
            state.userId = action.payload.userId; 
            state.role = action.payload.role;

            Cookies.set('role',action.payload.role)
            Cookies.set('uid',action.payload.userId)
            Cookies.set('token',action.payload.token)
        },
    }
})

export const {
    updateUser
} = userSlice.actions

export default userSlice.reducer