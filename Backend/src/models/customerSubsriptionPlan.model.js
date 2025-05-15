import mongoose from "mongoose"

const customerSubscriptionPlanSchema = new mongoose.Schema({

    startDate:{
        type:Date , 
        default:Date.now  ,
        required:true
    }, 
    endDate : {
        type:Date ,//must be after start date , use some validator
    } , 
    customer : {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User" , 
        required:true
    } , 
    subscriptionPlan:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"SubscriptionPlan",
        required:true
    } , 
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }
} , {timestamps:true})

export const CustomerSubscriptionPlan = mongoose.model("CustomerSubscriptionPlan" , customerSubscriptionPlanSchema); 