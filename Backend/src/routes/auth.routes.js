import Router from "express"
import {registerUser, 
    checkAuth ,
    loginUser ,
    logoutUser, 
    forgotPassword
} from '../controllers/auth.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router(); 


router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)


//secured routes
router.route("/check-auth").get(verifyJWT  , checkAuth)
router.route("/logout").post(verifyJWT , logoutUser)


export default router