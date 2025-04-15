import { createAsyncThunk  , createSlice } from "@reduxjs/toolkit";
import {fetchSubscriptionPlans , fetchSubscriptionPlanDetails} from "./SubscriptionApi"

const initialState = {
    status : "idle" , 
    errors : null ,
    successMessage : null ,
    planAddStatus : "idle" , 
    planUpdateStatus : "idle" ,
    plansFetchStatus : "idle" , 
    plans : [] ,
    planDetailsFetchStatus: "idle",
    planDetails : null ,
    selectedPlan : null , 
    totalResults : 0 
}


export const fetchSubscriptionPlansAsync = createAsyncThunk("subscription/fetchSubscriptionPlansAsync" , async()=>{
    const plans = await fetchSubscriptionPlans(); 
    console.log("Plans" , plans.data )
    return plans.data ; 
})


export const fetchSubscriptionPlanDetailsAsync = createAsyncThunk("subscription/fetchSubscriptionPlanDetailsAsync" , async(id)=>{
    console.log(id)
    const planDetail = await fetchSubscriptionPlanDetails(id);
    console.log("Plan details " , planDetail)
    return planDetail.data; 
})

const subscriptionSlice = createSlice({
    name:'subscriptionSlice' , 
    initialState:initialState , 
    reducers:{

    } , 
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSubscriptionPlansAsync.pending,(state , action)=>{
            state.plansFetchStatus = 'pending'
        })
        .addCase(fetchSubscriptionPlansAsync.fulfilled,(state , action)=>{
            state.plansFetchStatus = 'fulfilled'
            state.plans = action.payload
            state.totalResults = action.payload.length

        })
        .addCase(fetchSubscriptionPlansAsync.rejected,(state , action)=>{
            state.plansFetchStatus = 'rejected'
            state.errors = action.error
        })
        .addCase(fetchSubscriptionPlanDetailsAsync.pending,(state , action)=>{
            state.planDetailsFetchStatus = 'pending'
        })
        .addCase(fetchSubscriptionPlanDetailsAsync.fulfilled,(state , action)=>{
            state.planDetailsFetchStatus = 'fulfilled'
            state.planDetails = action.payload
        })
        .addCase(fetchSubscriptionPlanDetailsAsync.rejected,(state , action)=>{
            state.planDetailsFetchStatus = 'rejected'
            state.errors = action.error
        })


    }

})


export const selectSubscriptionPlanStatus = (state)=>state.subscriptionSlice.status
export const selectSubscriptionPlans = (state)=>state.SubscriptionSlice.plans
export const selectSubscriptionTotalResults = (state)=>state.SubscriptionSlice.totalResults
export const selectSubscriptionErrors = (state)=>state.SubscriptionSlice.errors
export const selectSubscriptionSuccessMessage = (state)=>state.SubscriptionSlice.successMessage
export const selectSubscriptionFetchStatus = (state)=>state.SubscriptionSlice.planFetchStatus
export const selectSubscriptionPlanDetails = (state)=>state.SubscriptionSlice.planDetails
export const selectSubscriptionPlanDetailsFetchStatus = (state)=>state.SubscriptionSlice.planDetailsFetchStatus



export default subscriptionSlice.reducer 