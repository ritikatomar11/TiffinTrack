import mongoose from "mongoose"

const tiffinSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true, 
        lowercase : true
    } , 
    price : {
        type:Number , 
        required:true 
    }
    , 
    description:{
        type:String , 
        required:true 
    } , 
    TiffinImage :{
        type:String ,
        required:true
    }, 
    foodType:{
        type:String  ,
        enum : ["VEG" , "NON_VEG", "VEGAN"] ,
        required:true
    },
    mealType:{
        type:[String] , 
        enum : ["LUNCH" , "DINNER"],
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


    subscriptionPlan:{
        type:mongoose.Schema.Types.ObjectId , 
        ref : "SubsriptionPlan"
    }
},{timestamps:true}
)

export const Tiffin = mongoose.model("Tiffin" , tiffinSchema)