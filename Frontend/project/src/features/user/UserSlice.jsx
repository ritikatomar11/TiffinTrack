import {createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { getUserDetails } from "./UserApi"

const initialState = {
    status : "idle" , 
    userInfo : null , 
    errors : null , 
    successMessage : null 
}

export const getUserDetailsAsync = createAsyncThunk('user/getUserDetails' , async(id)=>{
    console.log(id)
    const userInfo = await getUserDetails(id); 
    console.log("userInfo" , userInfo)
    return userInfo
})

const userSlice = createSlice({
    name:"userSlice" , 
    initialState:initialState, 
    reducers:{} , 
    extraReducers:(builder)=>{
        builder
            .addCase(getUserDetailsAsync.pending , (state)=>{
                state.status = 'pending'
            })
            .addCase(getUserDetailsAsync.fulfilled , (state , action)=>{
                state.status = 'fulfilled'
                console.log(action.payload)
                state.userInfo = action.payload
            })
            .addCase(getUserDetailsAsync.rejected , (state , action)=>{
                state.status = 'rejected'
                state.errors = action.error
            })
    }
})


// exporting selectors
export const selectUserStatus=(state)=>state.UserSlice.status
export const selectUserInfo=(state)=>state.UserSlice.userInfo
export const selectUserErrors=(state)=>state.UserSlice.errors
export const selectUserSuccessMessage=(state)=>state.UserSlice.successMessage

export default userSlice.reducer
