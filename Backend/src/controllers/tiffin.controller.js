import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tiffin } from "../models/tiffin.model.js";
import { SubscriptionPlan } from "../models/subscriptionPlan.model.js";

//create Tiffin -done
const addNewTiffin = asyncHandler(async(req , res)=>{
    //get subscription plan id , take the info , check for empty fields , check the tiffinImage file , create the tiffin docs , return response
    const {subscriptionId} = req.query ; 
    console.log(req.params , req.body)
    if(!subscriptionId){
        throw new ApiError(400 , "plan Id is required")
    }
    const {name , description , mealType , day }= req.body; 
    console.log(name , description , mealType , day); 

    if([name , description , mealType , day].some((field)=> field.trim() === "")){
        throw new ApiError(400 , "All fields are required"); 
    }

    const tiffingImageLocalPath = req.files?.tiffinImage[0].path ; 

    if(!tiffingImageLocalPath){
        throw new ApiError(400 , "Tiffin image is required"); 
    }

    const createdTiffin = await Tiffin.create(
        {name , 
        description , 
        mealType , 
        day , 
        tiffinImage: tiffingImageLocalPath , 
        subscriptionPlan : subscriptionId
    } 
    )

    if(!createdTiffin){
        throw new ApiError(500 , "Error while creating new docs for tiffin")
    }

    await SubscriptionPlan.findByIdAndUpdate(
        subscriptionId , 
        {
            $push : 
                {tiffins : createdTiffin._id}
                //store tiffinid
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200 , createdTiffin , "tiffin created successfully" )
    )
})

//delete Tiffin - done
const deleteTiffin = asyncHandler(async(req , res)=>{
    const {subscriptionId , id} = req.query ; 
    console.log(subscriptionId , id)
    if(!subscriptionId || !id){
        throw new ApiError( 400 , "PlanId and tiffinId are required"); 
    }

    const plan = await SubscriptionPlan.findById(subscriptionId)
    if(!plan){
        throw new ApiError(404 , "There is no such plan exist"); 
    }
    
    let tiffin = await Tiffin.findById(id); 
    if(!tiffin){
        throw new ApiError(404 , "this tiffin does not exist");
    }

    await SubscriptionPlan.findByIdAndUpdate(
        subscriptionId , 
        {
            $pull : {tiffins : id}
        }
    )

    tiffin = await Tiffin.findByIdAndDelete(id);
    
    if(!tiffin){
        throw new ApiError(500 , "not able to delete the tiffin docs"); 
    }

    return res
    .status(200)
    .json(200 , tiffin , "tiffin deleted successfully");

})

//done
const editTiffin = asyncHandler(async(req , res)=>{
    const {subscriptionId , id} = req.query ; 
    if(!subscriptionId || !id){
        throw new ApiError(400 , "planId and tiffinId are required"); 
    }

    const updates = {...req.body}; 
    // console.log(updates)

    if(req.files){
        updates.tiffinImage = req.files.tiffinImage[0].path; 
    }
    // console.log(updates); 

     const updatedTiffin = await Tiffin.findByIdAndUpdate(
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
            new ApiResponse(200 , updatedTiffin , "Tiffin Updated successfully")
        )
})

//get all tiffins related to subscription plan - done
const allTiffins = asyncHandler(async(req , res)=>{
    const {subscriptionId} = req.query ; 
    if(!subscriptionId){
        throw new ApiError(400 , "Plan Id is required"); 
    }

    const plan = await SubscriptionPlan.findById(subscriptionId).populate("tiffins"); 
    if(!plan){
        throw new ApiError(404 , "Plan doesn't exist in db"); 
    }

    const tiffins = plan.tiffins
    return res
    .status (200)
    .json(
        new ApiResponse(200 , tiffins , tiffins.length? "tiffins retrieved successfully " : "No tiffins for this subscription plan")
    )
})


//done
const tiffinDetails = asyncHandler(async(req ,res)=>{
    const {id} = req.query ; 

    if(!id){
        throw new ApiError ( 400 , "tiffinId is required"); 
    }

    const tiffin = await Tiffin.findById(id); 
    console.log(tiffin)
    if(!tiffin){
        throw new ApiError(404 , "tiffin Not found"); 
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , tiffin , "tiffin details fetched successfully"))
})

export {
    addNewTiffin , 
    deleteTiffin ,
    allTiffins ,
    tiffinDetails , 
    editTiffin
    
}