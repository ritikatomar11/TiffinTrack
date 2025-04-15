import { User } from  "../models/user.model.js" 
import { Staff } from "../models/staff.model.js"
import { Address } from "../models/address.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendEmail } from "../utils/nodeMailer.js"



//for deleting User 
const deleteUser = asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user?._id)
    
    if(!user)
    {
        throw new ApiError(404 , "User is not authorized")
    }
    await User.findByIdAndUpdate(
    
        req.user?._id , 
        {
            $set:{
                refreshToken : undefined 
            }
        } , 
        {
            new : true 
        }
    )
    
    if (req.user?.address) {
        await Address.findByIdAndDelete(req.user.address);
    }

    await User.findByIdAndDelete(req.user?.id); 

    const cookieOptions = {
        httpOnly: true,
        secure: true,       // use HTTPS in production
        sameSite: "strict", // or "lax" if more flexibility needed
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res
    .status(200)
    .json(200 , user , "User deleted from db")
})

//to get user details 
const getUserDetails = asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user?._id); 
    if(!user){
        throw new ApiError(404 , "user is not Logged In")
    }

    const sendingDetails = await User.findById(req.user?._id).select("-password -refreshToken")

    return res
    .status(200)
    .json(
        new ApiResponse(200 , sendingDetails , "These are the details of the user")
    )
})




//changePassword 
const updateCurrentPassword = asyncHandler(async(req , res)=>{

    //get info 
    //check if user exists 
    //check if old password is valid 
    //update password in doc and save 
    const {currentPassword , newPassword} = req.body ; 
    if([currentPassword , newPassword].some((field)=>field.trim === "")){
        throw new ApiError(400 , "Both Fields are required"); 
    }
    console.log(currentPassword , newPassword);
    
    const user = await User.findById( req.user?._id); 
    if(!user){
        throw new ApiError(404 , "User is not authenticated to update password"); 
    } 

    const isPasswordValid = await  user.isPasswordCorrect(currentPassword); 

    if(!isPasswordValid){
        throw new ApiError(400 , "Enter correct Old password"); 
    }
    user.password = newPassword; //middleware is there to hash it 
    user.save({validateBeforeSave:false}); 

    return res
    .status(200)
    .json(200 , {} , "Password Updated Successfully"); 
})





//validate email 

const validateEmail = asyncHandler(async(req , res)=>{

}); 







export {
        deleteUser ,
        getUserDetails ,
        updateCurrentPassword ,  
        
     }