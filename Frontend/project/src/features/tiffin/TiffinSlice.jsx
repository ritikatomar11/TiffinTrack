import {createSlice , createAsyncThunk } from "@reduxjs/toolkit" 
import { fetchAllTiffins } from "./TiffinApi"

const initialState = {
    status : "idle" , 
    errors : null , 
    tiffins : [] , 
    successMessage : null , 


}

export const fetchAllTiffinsAsync = createAsyncThunk("tiffins/fetchAllTiffinsAsync" , async(id)=>{
    const res = await fetchAllTiffins(id); 
    return res.data
})


const tiffinSlice = createSlice({
    name : "tiffinSlice" , 
    initialState : initialState , 
    reducers : {



    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchAllTiffinsAsync.pending , (state)=>{
            state.status  ="pending"
        })
        .addCase(fetchAllTiffinsAsync.fulfilled , (state , action )=>{
            state.status  ="pending"
            console.log(action.payload)
            state.tiffins = action.payload
        })
        .addCase(fetchAllTiffinsAsync.rejected , (state , action)=>{
            state.status  ="rejected" 
            state.errors = action.error 
        })
        

    }

})


//selectors 
export const selectTiffinStatus=(state)=>state.TiffinSlice.status
export const selectTiffins=(state)=>state.TiffinSlice.tiffins
export const selectTiffinErrors=(state)=>state.TiffinSlice.errors

export default tiffinSlice.reducer
