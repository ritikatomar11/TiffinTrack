import Router from "express"
import {registerUser, 
    checkAuth ,
    loginUser ,
    logoutUser, 
} from '../controllers/auth.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router(); 


router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)


//secured routes
router.route("/check-auth").get(verifyJWT  , checkAuth)
router.route("/logout").post(verifyJWT , logoutUser)

export default router