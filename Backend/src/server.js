
import dotenv from "dotenv"
dotenv.config({path:'./.env'})

import { connectDB } from "./db/index.js"; 
import { app } from "./app.js"

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


