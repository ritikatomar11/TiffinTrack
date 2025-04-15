import axiosInstance from "../../config/axios"

export const fetchSubscriptionPlans = async()=>{
    try{
        let res = await axiosInstance.get("/subscription-plans"); 
        console.log("plans" , res.data)
        return res.data
    }catch(error){
        console.error("subscription Plan Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"fetching plans Failed")
    }
}

export const fetchSubscriptionPlanDetails = async(id)=>{
    try{
        const res = await axiosInstance.get(`/subscription-plans/${id}`)
        return res.data
    }catch(error){
        console.error("Error fetching subscription plan details" , error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "fetching plan details unsuccessful"); 
    }
}