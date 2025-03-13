import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizedRoles } from "../middlewares/authorizeRoles.middleware.js";
import { addNewTiffin, deleteTiffin , editTiffin , allTiffins ,tiffinDetails } from "../controllers/tiffin.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router(); 

//secured routes
router.route("/").post(verifyJWT , authorizedRoles , 
    upload.fields([
        {
            name:"tiffinImage" , 
            maxCount:1 
        }]),
    addNewTiffin)
router.route("/:id").delete(verifyJWT , authorizedRoles , deleteTiffin)
router.route("/:id").patch(verifyJWT , authorizedRoles , verifyJWT , authorizedRoles ,
    upload.fields([
    {
        name:"tiffinImage" , 
        maxCount:1 
    }]) , editTiffin)

//public routes 
router.route("/").get(allTiffins); 
router.route("/:id").get(tiffinDetails)

export default router ; 