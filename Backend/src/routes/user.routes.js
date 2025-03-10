import Router from "express"
import {registerUser, 
        addAddress,
        loginUser ,
        logoutUser, 
        updateCurrentPassword , 
        deleteUser, 
        getUserDetails, 
        getAddress, 
        editAddress , 
        deleteAddress
    } from '../controllers/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()


router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/deleteUser").delete(verifyJWT , deleteUser)


router.route("/getUserDetails").get(verifyJWT , getUserDetails)

//address routes
router.route("/addAddress").post(verifyJWT , addAddress)
router.route("/getAddress").get(verifyJWT , getAddress)
router.route("/updateAddress").put(verifyJWT ,editAddress)
router.route("/deleteAddress").delete(verifyJWT , deleteAddress); 

router.route("/updatePassword").post(verifyJWT , updateCurrentPassword); 

export default router 