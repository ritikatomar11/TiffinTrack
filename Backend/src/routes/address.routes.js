import Router from "express"

import { 
    addAddress,
    getAddress, 
    editAddress , 
    deleteAddress
} from '../controllers/address.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router  = Router()

//address routes
router.route("/addAddress").post(verifyJWT , addAddress)
router.route("/getAddress").get(verifyJWT , getAddress)
router.route("/updateAddress").put(verifyJWT ,editAddress)
router.route("/deleteAddress").delete(verifyJWT , deleteAddress); 

export default router 