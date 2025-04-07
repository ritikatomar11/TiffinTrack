import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//for now i am allowing any origin to access my backend
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies if needed
  }));
  
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true 
}))

//middleware for parsing json data  and setting the limit 
app.use(express.json({limit:"16kb"}))

//for parsing urlencoded data coming from form submissions of post requests
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import tiffinRouter from "./routes/tiffin.routes.js"

app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscription-plans" , subscriptionRouter)
app.use("/api/v1/subscription/:subscriptionId/tiffins" , tiffinRouter)


export { app }