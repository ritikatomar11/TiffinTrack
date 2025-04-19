import React , {useEffect} from "react"

import { fetchSubscriptionPlanDetailsAsync } from "../SubscriptionSlice"
import { useSelector , useDispatch } from "react-redux"
import {selectSubscriptionPlanDetails , selectSubscriptionPlanDetailsFetchStatus , selectSubscriptionErrors} from "../SubscriptionSlice"
import { useParams } from "react-router-dom"

export const SubscriptionPlanDetails = ()=>{

    const { id } = useParams()
    const details  = useSelector(selectSubscriptionPlanDetails)
    const errors = useSelector(selectSubscriptionErrors); 
    const status  = useSelector(selectSubscriptionPlanDetailsFetchStatus)
    const dispatch  = useDispatch(); 
    useEffect(()=>{
        console.log(id)
        dispatch(fetchSubscriptionPlanDetailsAsync(id))
        console.log("plan details"  ,details)
    } , [dispatch , id])

    useEffect(()=>{
        if(status ==='rejected'){
            alert("Error fetching Subscription Details , Please try again later")
        }
    } , [status])



    return (
        <div>
            {/* todo : add tiffin folder and work on details  */}
            {console.log("pd" , details)}
            <p key ={123}>{details?.tiffins}</p>
        </div>
    )
}