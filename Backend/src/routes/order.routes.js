import Router from "express"
import { cancelOrder, createOrder, getAllOrders } from "../controllers/order.controller.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/").post(verifyJWT , createOrder)
router.route("/cancel/:id").patch(verifyJWT ,cancelOrder); 
router.route("/").get(verifyJWT ,getAllOrders )
export default router; 