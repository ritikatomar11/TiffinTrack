import {createSlice , createAsyncThunk } from "@reduxjs/toolkit" 
import { addNewTiffin, fetchAllTiffins } from "./TiffinApi"

const initialState = {
    status : "idle" , 
    errors : null , 
    tiffinDetails : null , 
    tiffinAddStatus : "idle" , 
    tiffins : [] , 
    successMessage : null , 


}

export const fetchAllTiffinsAsync = createAsyncThunk("tiffins/fetchAllTiffinsAsync" , async(id)=>{
    const res = await fetchAllTiffins(id); 
    return res.data
})

export const addNewTiffinAsync = createAsyncThunk("tiffins/addNewTiffinAsync" , async({tiffinDetails , id})=>{
    const res = await addNewTiffin(tiffinDetails , id); 
    return res.data
})

const tiffinSlice = createSlice({
    name : "tiffinSlice" , 
    initialState : initialState , 
    reducers : {

        resetStatus :(state)=>{
            state.status = "idle"
        } ,
        cleanUpErrors : (state)=>{
            state.errors = null 
        } , 
        resetTiffinAddStatus :(state)=>{
            state.tiffinAddStatus = "idle"
        }


    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchAllTiffinsAsync.pending , (state)=>{
            state.status  ="pending"
        })
        .addCase(fetchAllTiffinsAsync.fulfilled , (state , action )=>{
            state.status  ="fulfilled"
            console.log(action.payload)
            state.tiffins = action.payload
        })
        .addCase(fetchAllTiffinsAsync.rejected , (state , action)=>{
            state.status  ="rejected" 
            state.errors = action.error 
        })
        .addCase(addNewTiffinAsync.pending , (state)=>{
            state.tiffinAddStatus  ="rejected" 
        }).addCase(addNewTiffinAsync.fulfilled , (state , action)=>{
            state.tiffinAddStatus  ="fulfilled" 
            state.tiffinDetails = action.payload
        }).addCase(addNewTiffinAsync.rejected , (state , action)=>{
            state.tiffinAddStatus  ="rejected" 
            state.errors = action.error 
        })

    }

})


//selectors 
export const selectTiffinStatus=(state)=>state.TiffinSlice.status
export const selectTiffins=(state)=>state.TiffinSlice.tiffins
export const selectTiffinErrors=(state)=>state.TiffinSlice.errors
export const selectTiffinAddStatus = (state)=>state.TiffinSlice.tiffinAddStatus
export const selectNewTiffinDetails = (state)=> state.TiffinSlice.tiffinDetails
 export const { resetStatus , cleanUpErrors , resetTiffinAddStatus } = tiffinSlice.actions

export default tiffinSlice.reducer
