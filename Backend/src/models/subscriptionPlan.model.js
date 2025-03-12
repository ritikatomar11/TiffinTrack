import mongoose from "mongoose"
// import { Tiffin } from "./tiffin.model.js"
import { Staff } from "./staff.model.js"

const subscriptionPlanSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true ,
        lowercase : true 
    },
    description : {
        type:String , 
        required:true ,
        lowercase:true
    },
    planType:{
        type:String , 
        enum : ["Daily" , "Weekly" ,"Monthly"], 
        required:true 
    } , 
    price: {
        type:Number ,//price the user will pay according to planType
        required : true 
    } ,
    isAvailable : {
        type:Boolean ,
        default:true 
    }, 
    planImage : {
        type:String , 
        required:true 
    } , 
    tiffins:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:"Tiffin"
        }
    ], 
    AddedBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Staff",
        required:true
    } , 

})

export const SubscriptionPlan = mongoose.model("SubscriptionPlan" , subscriptionPlanSchema)