import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { createOrder } from "./OrderApi"


const initialState = {
    status : "idle" , 
    orderStatus : "idle" , 
    errors : null , 
    successMessage : null , 
    order: null 
    
}

export const createOrderAsync = createAsyncThunk("order/createOrderAsync" , async({id , userId})=>{
    console.log(id ,userId)
    const order = await createOrder(id , userId); 
    return order.data
})

const orderSlice = createSlice ({
    name : "orderSlice" ,
    initialState : initialState , 
    reducers: {
        cleanUpErrors : (state)=>{
            state.errors = null 
        } ,
        resetOrderStatus : (state)=>{
            state.orderStatus = "idle"
        }
        
    } , 
    extraReducers:(builder)=>{
        builder
        .addCase(createOrderAsync.pending,(state)=>{
                    state.status = 'pending'
                })
        .addCase(createOrderAsync.fulfilled,(state , action)=>{
                    state.orderStatus = 'fulfilled'
                    state.order = action.payload
        
                })
        .addCase(createOrderAsync.rejected,(state , action)=>{
                    state.status = 'rejected'
                    state.errors = action.error
                })
    }
})

export const selectOrderStatus = (state)=>state.OrderSlice.orderStatus 
export const selectOrder = (state)=>state.OrderSlice.order 
export const selectOrderErrors = (state)=>state.OrderSlice.errors 
export const selectOrderSuccessMessage = (state)=>state.OrderSlice.successMessage


export const {resetOrderStatus , cleanUpErrors } = orderSlice.actions
export default orderSlice.reducer 