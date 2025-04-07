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

//for adding address 
const addAddress = asyncHandler(async(req , res)=>{
    //get the data 
    //create address
    //add in user document
    //send response 
    
    const {street  , city , country , state, pincode }  = req.body ; 

    if([street , city , country , state , pincode ].trim ===""){
        throw new ApiError(400 , "All fields are requried"); 
    }
    console.log(req.body); 

    const user = await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(400 , "User does not exist")
    }
    if(user?.address){
        throw new ApiError(400 , "Address already exists")
    }

    const address = await Address.create ({
        street , city , country , state , pincode , user:req.user._id
    }); 
    console.log(address?._id)


    await User.findByIdAndUpdate(
        req.user?._id ,
        {
            $set:{
                address:address?._id
            }
        } , 
        {
            new : true 
        }
    )

    res
    .status(200)
    .json(
        new ApiResponse(200 , address , "Address saved")
    )


})

//get address 
const getAddress  = asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user?._id); 

    if(!user){
        throw new ApiError(400 , "User is not authorized to get the details"); 
    }

    if(user.address === ""){
        throw new ApiError(400 , "Please first add Address")
    }

    const address = await Address.findById(user.address).select("-user"); 
    if(!address){
        throw new ApiError(500 , "Sorry , Not able to fetch the address details")
    }
    console.log(address); 

    return res
    .status(200)
    .json(
        new ApiResponse(200 , {address} , "Here are the address details for the user")
    )
})

const editAddress = asyncHandler(async(req , res)=>{
    //check for if address is added before in the user details
    const user = await User.findById (req.user?._id) ; 

    if(!user){
        throw new ApiError(400 , "User is not authorized"); 
    }
    if(user.address === ""){
        throw new ApiError(400 , "Please first add Address")
    }

    const {street , city , state , country , pincode}  = req.body ; 
    console.log(street , city , state , country , pincode);
    
    if([street , city , state , country , pincode].some((field)=>field.trim()==="")){
        throw new ApiError(400 , "Please enter all details properly")
    }
   
    const address = await Address.findOne({user:req.user._id}); 
    if(!address){
        throw new ApiError(500 , "Something went wrong while fetching address")
    }
    console.log(address)

    const newAddress = await Address.findByIdAndUpdate(
        address._id,
        {
            $set :{
                street:street , city:city  ,state:state , country:country , pincode :pincode
            }
        } , 
        {
            new:true
        }
    )
    

    return res
    .status(200)
    .json(
        new ApiResponse(200 , newAddress , "address updated successfully")
    )
})

const deleteAddress = asyncHandler(async(req , res)=>{
    //get the user
    const user = await User.findById (req.user?._id) ; 

    if(!user){
        throw new ApiError(400 , "User is not authorized"); 
    }
    if(user?.address === undefined){
        throw new ApiError(400 , "Please first add Address")
    }

    //delete the address from its schema 
    const addressId =user.address
    await Address.findByIdAndDelete(addressId); 

    await User.findByIdAndUpdate(
        req.user._id , 
        {
            $unset:{address : ""}
        } 
    )
    console.log(user?.address)
    
    return res
    .status(200)
    .json(
        new ApiResponse(200 , {} ,"Address deleted successfully")
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
        addAddress ,
        updateCurrentPassword ,  
        getAddress ,
        editAddress ,
        deleteAddress,
        
     }