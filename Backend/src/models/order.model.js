import mongoose from "mongoose"

const orderSchema = new mongoose.Schema ({

    quantity: {
        type:Number , 
        required:true
    } , 
    dateTime:{
        type:Date , 
        default:Date.now ,
    } ,
    // payment:{
    //     type:mongoose.Schema.Types.ObjectId , 
    //     ref:"Payment"
    // } , 
    customer : {
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User"  ,
        required:true

    } , 
    plan:{
        type:mongoose.Schema.Types.ObjectId , 
        ref : "SubscriptionPlan"

    } , 
    status : {
        type: String,
        enum: ["Pending", "Completed", "Canceled"],
        default: "Pending",
    }


} , {timestamps:true}); 

export const Order = mongoose.model("Order" , orderSchema); 