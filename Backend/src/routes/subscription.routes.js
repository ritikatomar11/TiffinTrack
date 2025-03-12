import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/authorizeRoles.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { newSubscriptionPlan ,deleteSubscriptionPlan ,allSubscriptionPlan ,subscriptionPlanDetails , editSubscriptionPlan} from "../controllers/subscriptionPlan.controller.js";
const router = Router(); 

//to add subscription
//public routes
router.route("/").get(allSubscriptionPlan)
router.route("/:id").get(subscriptionPlanDetails)
router.route("/").post(
   verifyJWT , authorizedRoles ,
   upload.fields([
    {
        name:"planImage" , 
        maxCount:1 
    }
]), newSubscriptionPlan); 
router.route("/deleteSubscriptionPlan/:id").delete(verifyJWT , authorizedRoles , deleteSubscriptionPlan)
router.route("/editSubscriptionPlan/:id").patch(
    verifyJWT , authorizedRoles ,
    upload.fields([
    {
        name:"planImage" , 
        maxCount:1 
    }
]), editSubscriptionPlan)

export default router