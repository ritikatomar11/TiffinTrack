import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"; 
import { SubscriptionPlan } from "../models/subscriptionPlan.model.js";
import { uploadOnCloudinary } from "../server.js"


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

    const {name , description , planType ,price,foodType } = req.body; 
    console.log(req.body)

    console.log(name , description  ,planType , price , foodType);
    if([name  ,description , planType , price , foodType].some((field)=>field.trim() === "")){
        throw new ApiError(400 , "All fields are required");
    }
    
    console.log(req.files)
    const planImageLocalPath =  req.files?.planImage[0]?.path; 

    if(!planImageLocalPath){
        throw new ApiError(400 , "Plan file is required")
    }
    console.log(planImageLocalPath)
    // upload the files to cloudinary
    const planImage = await uploadOnCloudinary(planImageLocalPath); 
    console.log(planImage)
    if(!planImage){
        throw new ApiError(400 , "Error uploading  file to the cloudinary")
    }

    const newSubPlan = await SubscriptionPlan.create(
        {name , 
        description , 
        planType ,
        foodType,
        price , 
        AddedBy : req.user._id , 
        planImage : planImage?.url 
     }
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
    console.log(allPlans)
    if (allPlans.length === 0) {
        throw new ApiError(404, "No subscription plans found");
    }
    
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
    console.log(plan)

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
    const {id} = req.params; 
    const plan = await SubscriptionPlan.findById(id); 
    if(!plan){
        throw new ApiError(404 , "The plan you are searching for is not there in db"); 
    }

    const updates = {...req.body}; 
    // console.log(updates); 
    
    if(req.files){
        updates.planImage = req.files.planImage[0].path; 
    }
    console.log(updates); 
    
    
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
        id ,
        {
            $set:updates
        } , 
        {
            new:true 
        }
    )
    
    return res
    .status(200)
    .json(
        new ApiResponse(200 , updatedPlan , "Plan is updated successfully")
    )

})
export {
    newSubscriptionPlan,
    allSubscriptionPlan,
    deleteSubscriptionPlan,
    subscriptionPlanDetails,
    editSubscriptionPlan

}
