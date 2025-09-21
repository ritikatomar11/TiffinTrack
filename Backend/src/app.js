import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//reusable code
// server pr already file aa chuki hai
// goal - server pr jo file upload hogai hai ,
// localfile path dega aur cloudinary usse apne server pr daal dega 
// then humein apne server se uss file ko delete krna hai - 2step process

//for now i am allowing any origin to access my backend
const allowedOrigins = process.env.NODE_ENV === "production" 
  ? process.env.FRONTEND_URL
  : ["http://localhost:5173"];
app.use(cors({
    origin:allowedOrigins, // Allow frontend URL
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true, // Allow cookies if needed
  }));
  


//middleware for parsing json data  and setting the limit 
app.use(express.json({limit:"16kb"}))

//for parsing urlencoded data coming from form submissions of post requests
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import addressRouter from "./routes/address.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import tiffinRouter from "./routes/tiffin.routes.js"
import orderRouter from "./routes/order.routes.js"

app.use("/api/v1/address" , addressRouter)
app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscription-plans" , subscriptionRouter)
app.use("/api/v1/subscription/tiffins" , tiffinRouter)
app.use("/api/v1/order" , orderRouter)

app.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

app.get("/test-cookie", (req, res) => {
  console.log("Incoming cookies:", req.cookies); // logs all cookies
  res.json({ receivedCookies: req.cookies });
});


export { app }