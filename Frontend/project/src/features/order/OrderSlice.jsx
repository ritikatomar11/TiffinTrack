import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { createOrder , getOrdersById } from "./OrderApi"


const initialState = {
    status : "idle" , 
    getOrderStatus :"idle" , 
    orderStatus : "idle" , 
    errors : null , 
    successMessage : null , 
    order: null  , 
    orders:[]
    
} 

export const createOrderAsync = createAsyncThunk("order/createOrderAsync" , async({id , userId , quantity})=>{
    console.log(id ,userId , " q" , quantity)
    const order = await createOrder(id , userId , quantity); 
    return order.data
})

export const getOrdersByIdAsync = createAsyncThunk("order/getOrdersByIdAsync" , async()=>{
    const orders = await getOrdersById(); 
    console.log(orders);
    return orders.data ;
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
        } , 
        resetGetOrderStatus : (state)=>{
            state.getOrderStatus = "idle"
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

        .addCase(getOrdersByIdAsync.pending,(state)=>{
                    state.getOrderStatus = 'pending'
                })
        .addCase(getOrdersByIdAsync.fulfilled,(state , action)=>{
                    state.getOrderStatus = 'fulfilled'
                    state.orders = action.payload
        
                })
        .addCase(getOrdersByIdAsync.rejected,(state , action)=>{
                    state.getOrderStatus = 'rejected'
                    state.errors = action.error
                })
    }
})

export const selectOrderStatus = (state)=>state.OrderSlice.orderStatus 
export const selectOrder = (state)=>state.OrderSlice.order 
export const selectOrderErrors = (state)=>state.OrderSlice.errors 
export const selectOrderSuccessMessage = (state)=>state.OrderSlice.successMessage
export const selectGetOrderStatus = (state)=>state.OrderSlice.getOrderStatus; 
export const selectOrders = (state)=>state.OrderSlice.orders
export const {resetOrderStatus , cleanUpErrors , resetGetOrderStatus } = orderSlice.actions
export default orderSlice.reducer 