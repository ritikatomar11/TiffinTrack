import mongoose from "mongoose"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
//base schema for customer
const userSchema = new mongoose.Schema(
{
    fullName : {
        type:String,
        required : true ,
        lowercase : true , 
        index:true 
    } , 
    email: {
        type:String , 
        required:true , 
        unique : true , 
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    
    } ,
    phoneNumber : {
        type:String , 
        required:true , 
        unique : true ,
        match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password:{
        type:String,
        required :[true , "Password is required"] , 
        index:true 
    },
    address:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Address" 
        
        
    }, 
    role : {
        type:String , 
        enum : ["customer" , "worker"],
        required:true 
    },


    refreshToken : {
        type:String , 
        
    }
} , 
{ timestamps:true }
)



userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10); 
    next()
}); 

//custom method
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

//for generating tokens - custom method
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id:this._id , 
            email : this.email , 
            fullname : this.fullname
        } , 
        process.env.ACCESS_TOKEN_SECRET , 
        //options
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id , 
            email : this.email , 
            fullname : this.fullname
        } , 
        process.env.REFRESH_TOKEN_SECRET , 
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)

