import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    order : {
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Order",
        required:true
    } ,
    amount : {
        type:Number , 
        required:true
    } , 
    paymentType:{
        type:String , 
        enum : ["UPI" ,"CARD" , "NETBANKING"] , 
        required:true
    },
    paymentId :{
        type:String , 
        required:true
    } , 
    status:{
        type:String , 
        enum : ["PENDING" ,"COMPLETED"] ,
        required:true
    }

} , {timestamps:true})

export const Payment = mongoose.model("Payment" , paymentSchema)
