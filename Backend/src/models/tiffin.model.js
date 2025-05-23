import mongoose from "mongoose"

const tiffinSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true, 
        lowercase : true
    } , 
    description:{
        type:String , 
        required:true 
    } , 
   
    mealType:{
        type:[String] , 
        enum : ["LUNCH" , "DINNER"],
        required:true
    },
    day: {
        type: String,
        enum: [
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY'
        ], // Replace with appropriate values from WeekDayAndTime if needed
        required: true,
      },
      tiffinImage : {
        type:String ,
        required:true
      },

    subscriptionPlan:{
        type:mongoose.Schema.Types.ObjectId , 
        ref : "SubscriptionPlan"
    }
},{timestamps:true}
)

export const Tiffin = mongoose.model("Tiffin" , tiffinSchema)