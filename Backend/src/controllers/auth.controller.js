import { User } from "../models/user.model.js"
import { Staff } from "../models/staff.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//for registration 
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;
    console.log(fullName, email, phoneNumber, password, role)
    if (
        [fullName, email, phoneNumber, password, role].some((field) =>
            field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    //check if user exist in db
    // const existedUser = await  User.findOne({email:email});
    // console.log(existedUser)
    // if(existedUser){
    //     throw new ApiError(409  , "User with this email already exist ")
    // }
    let user;
    if (role === "customer") {
        user = await User.create({
            fullName,
            email,
            phoneNumber,
            password,
            role
        });
    } else {
        const { joiningDate, isAvailable, staffType, salary } = req.body;
        console.log(joiningDate, isAvailable, staffType, salary);

        if ([joiningDate, isAvailable, staffType, salary].some((field) => field.trim === "")) {
            throw new ApiError(400, "All fields are required");
        }
        user = await Staff.create({
            fullName,
            email,
            phoneNumber,
            password,
            role,
            joiningDate,
            isAvailable,
            staffType,
            salary
        })
    }


    //dont send password phoneNumber in response 
    let createdUser;
    if (role === "customer") {
        createdUser = await User.findOne({ email: email }).select("-password -refreshToken")
    } else {
        createdUser = await Staff.findOne({ email: email }).select("-password -refreshToken")
    }
    console.log(createdUser);
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    return res.
        status(200)
        .json(new ApiResponse(200, createdUser, "User registered successfully"))

});


//for logging in
const loginUser = asyncHandler(async (req, res) => {
    //take info 
    //fetch user from db
    //match password 
    //generate accesstoken and refreshtoken 
    //update refreshtoken in db
    //send response with cookies as accesstoken and refreshtoken
    const { email, password } = req.body

    if ([email, password].some((field) => field.trim === "")) {
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
        throw new ApiError(401, "User not found.Please check your email");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(404, "Password incorrect");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    console.log(refreshToken, accessToken);
    if (!refreshToken || !accessToken) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    const loggedIn = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedIn, "LoggedIn successfully")
        )


})


//for logout
const logoutUser = asyncHandler(async (req, res) => {
    //cant make any query to db so use middleware
    await User.findByIdAndUpdate(

        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "user logout successfully")
        )


})



const checkAuth = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(500, "User not found");
    }
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, user, "Authenticated")
        )

})

const forgotPassword = asyncHandler(async(req , res)=>{
    const { email , newPassword} = req.body ; 
    if (!email) {
        throw new ApiError(500, "Enter valid email ");
    }
    console.log(email)
    const user =await  User.findOne({email:email})
    if (!user) {
        throw new ApiError(500, "User with this email does not exist");
    }
    // console.log(user)
    user.password = newPassword;
    await user.save();

    return res
    .status (200)
    .json(
        new ApiResponse(200 , user , "Password is updated successfully")
    )
    



    
})

export {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    forgotPassword 
}