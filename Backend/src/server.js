import path from "path"
import dotenv from "dotenv"
dotenv.config({path:path.resolve('./.env')})

import { connectDB } from "./db/index.js"; 
import { app } from "./app.js"

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"; 

connectDB()
.then(()=>{

    app.on("error" , (error)=>{
        console.log("ERRR: " , error); 
        throw error 
    })
    const port = process.env.PORT||8000
    app.listen(port , ()=>{
        console.log("app is listening on " ,port )    
    })
}  
)
.catch((err)=>{
    console.log("Db connection failed")
})


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            console.log("Not getting any path")
            return null
        } //could not find the path

        //upload the file
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })
        //file has been uploaded successfully

        console.log("File is uploaded on cloudinary")
        console.log(response.url); 
        fs.unlinkSync(localFilePath)
        return response

    }catch(error){
        //agr dikkat aayi aur file upload nhi hui toh 
        // fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation get failed
        console.log("not able to upload" , error)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
            console.log("local fiel deleted due to failed upload")
        }
        return null ; 
    }
}

export {uploadOnCloudinary}
