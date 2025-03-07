import Router from "express"
import {registerUser, addAddress, loginUser ,logoutUser} from '../controllers/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()


router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/addAddress").post(verifyJWT , addAddress)

export default router 