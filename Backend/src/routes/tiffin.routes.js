import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/authorizeRoles.middleware.js";
import { addNewTiffin } from "../controllers/tiffin.controller.js"
const router = Router(); 

router.route("/").post(verifyJWT , authorizedRoles , addNewTiffin)

export default router ; 