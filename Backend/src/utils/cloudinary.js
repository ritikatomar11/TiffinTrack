//reusable code
// server pr already file aa chuki hai
// goal - server pr jo file upload hogai hai ,
// localfile path dega aur cloudinary usse apne server pr daal dega 
// then humein apne server se uss file ko delete krna hai - 2step process

import {v2 as cloudinary} from "cloudinary"

import fs from "fs"; 

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        console.log(localFilePath)
        if(!localFilePath){
            console.log("Not getting any path")
            return null
        } //could not find the path

        //upload the file
        console.log("error before")
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })
        console.log("error after")
        //file has been uploaded successfully

        console.log("File is uploaded on cloudinary")
        console.log(response.url); 
        // fs.unlinkSync(localFilePath)
        // console.log(response)
        return response

    }catch(error){
        //agr dikkat aayi aur file upload nhi hui toh 
        // fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation get failed
        console.log("not able to upload")
        return null ; 
    }
}

export {uploadOnCloudinary}