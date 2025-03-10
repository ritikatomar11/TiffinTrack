import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authorizedRoles = asyncHandler(async(req , res , next)=>{
    //fetch user 
    //check if it is a worker
    //check if it is a manager or admin
    try {
        const user = await User.findById(req.user?._id); 
        if(!user){
            return next(new ApiError(404 , "Please login first ")) 
        }
    
    
        if(user.role === "customer"){
            return next(new ApiError(403, "You are not allowed to make any changes"));
        }
    
        if(user.staffType === "cook" || user.staffType === "delivery" || user.staffType === "cleaner"){
            return  next(new ApiError(401 , "Only authorized staff can make changes"))
        }
    
        next()
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid access token")
    }
})