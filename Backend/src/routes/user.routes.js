import Router from "express"
import { 

        updateCurrentPassword , 
        deleteUser, 
        getUserDetails, 
    
    } from '../controllers/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/deleteUser").delete(verifyJWT , deleteUser)


router.route("/getUserDetails/:id").get(verifyJWT , getUserDetails)



router.route("/updatePassword").post(verifyJWT , updateCurrentPassword); 

export default router 