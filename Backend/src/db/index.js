import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"
export const connectDB = async()=>{
    try{
        let mongoReference = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) ; 
        // console.log(mongoReference)
        console.log("DB connected")
    }
    catch(error){
        throw Error("cant connect DBs" , error)
    }
}