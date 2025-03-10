import mongoose from "mongoose" 



const addressSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    street: {
         type: String,
          required: true
    },
    city: { 
        type: String, 
        required: true
    },
        
    state: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true, 
        default: "India" 
    },
    pincode : {
        type:String , 
        required:true
    } , 
})

export const Address = mongoose.model("Address" , addressSchema)