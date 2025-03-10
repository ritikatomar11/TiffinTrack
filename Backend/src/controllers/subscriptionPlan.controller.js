import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"; 
import { SubscriptionPlan } from "../models/subscriptionPlan.model.js";


//create new Subscriptionplan 
const newSubscriptionPlan = asyncHandler(async(req , res)=>{
    //check if user is authorized 
    //check for roles for safety 
    // get the details from the body 
    // create new Schema 
    // save
    //return 
    const user = await User.findById(req.user?._id); 
    if(!user){
        throw new ApiError(401 , "User is not logged In")
    }

    const {name , description , planType ,price } = req.body; 


    if([name  ,description , planType , price ].some((field)=>field.trim==="")){
        throw new ApiError(400 , "All fields are required");
    }


    const newSubPlan = await SubscriptionPlan.create(
        {name , 
        description , 
        planType ,
        price , 
        AddedBy : req.user._id }
    )

    if(!newSubPlan){
        throw new ApiError(500 , "Error occurred while creating user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , newSubPlan , "Successfully created new sub plan ")
    )
})


//get all subscription plans 
const allSubscriptionPlan = asyncHandler(async(req , res)=>{
    const allPlans = await SubscriptionPlan.find() ;
    if(!allPlans){
        throw new ApiError()
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200 , allPlans , "All the available plans")
    )
})

//get details of one subscription plan
const subscriptionPlanDetails = asyncHandler(async(req , res)=>{
    const { id } = req.params; 
    const plan = await SubscriptionPlan.findById(id); 
    if(!plan){
        throw new ApiError(500 , "Not able to fetch subscription plan details")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , plan , "Plan details are here")
    )

})


//delete subscription plan
const deleteSubscriptionPlan = asyncHandler(async(req , res)=>{
    const {id} = req.params ; 
    const plan = await SubscriptionPlan.findByIdAndDelete(id);
    if(!plan){
        throw new ApiError(500 , "Plan is not deleted successfully ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200 , plan , "plan deleted successfully")
    )
})


//update subscription plan
const editSubscriptionPlan = asyncHandler(async(req , res)=>{

})
export {
    newSubscriptionPlan,
    allSubscriptionPlan,
    deleteSubscriptionPlan,
    subscriptionPlanDetails,
    editSubscriptionPlan

}
