import { User } from './user.model.js'
import mongoose from "mongoose"
const staffSchema = new mongoose.Schema(
    {
        joiningDate : {
            type:Date , 
            required:true 
        },
        isAvailable : {
            type:Boolean ,
            
        } , 
        staffType:{
            type:String , 
            enum: ["admin" , "manager" , "cooking-staff" , "delivery"],
            required:true
        } , 
        salary : {
            type:Number , 
            required:true
        }
    }, 
    { 
        timestamps:true
    }
)

export const Staff  = User.discriminator("Staff" , staffSchema)