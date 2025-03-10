import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/authorizeRoles.middleware.js"
const router = Router(); 

//to add subscription

router.route("/addSubscripiton").post(); 

export default router