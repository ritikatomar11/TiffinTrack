import { Order } from "../models/order.model.js"; 
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubscriptionPlan } from "../models/subscriptionPlan.model.js"
import { CustomerSubscriptionPlan } from "../models/customerSubsriptionPlan.model.js"



// Create Order
export const createOrder = asyncHandler(async (req, res) => {
    
        const { quantity } = req.body;
        const { customerId , subscriptionId } = req.body;

        console.log(quantity , customerId , subscriptionId)
        // Create a new order
        if([quantity , customerId , subscriptionId].some((field)=>field.trim()==='')){
            throw new ApiError(400 , "All fields are required") ;
        }


        const newOrder = await Order.create({
            quantity , customer:customerId , plan:subscriptionId
        })


        // Save the order to the database
        if(!newOrder){
            throw new ApiError(500 , "Error while creating order")
        }
        console.log(newOrder)

        const plan = await SubscriptionPlan.findById({_id : subscriptionId})
        if(!plan){
            throw new ApiError(500 ,"Error while fetching plan")
        }

        const planType = plan.planType 
        console.log(newOrder.dateTime)

        let endDate = new Date(newOrder.dateTime) ; 
        
        console.log(endDate)
        if(plan.planType === "Weekly"){
            endDate.setDate(endDate.getDate() + 7);
        }else{
            endDate.setDate(endDate.getDate() + 30);
        }

        const customerSubscription = await CustomerSubscriptionPlan.create({
            startDate : newOrder.dateTime , 
            endDate : endDate ,
            customer : customerId , 
            subscriptionPlan:subscriptionId ,
            order : newOrder._id
        })
        console.log(customerSubscription)

        return res
        .status(201)
        .json(new ApiResponse(200 ,  { newOrder , customerSubscription} , "Order created succssfully"));
    
})

export const getAllOrders = asyncHandler(async(req , res)=>{
  //find the user 
  //find in customerSubscriptionPlan if there is such user exists there and then find the details of the order placed

    const user = await User.findById(req.user?._id);
        if (!user) {
            throw new ApiError(500, "User not found");
    }

    const orders = await Order.find({customer:req.user?._id})
    .populate('plan')
  

    if(!orders){
      throw new ApiError(400 , "Do not find any order")
    }

    return res
    .status(201)
    .json(new ApiResponse(200 , orders , "Found Orders Successfully"));  
})


export const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.query;
    console.log(orderId)
  
    if (!orderId || orderId.trim() === "") {
      throw new ApiError(400, "Order ID is required");
    }
  
    const order = await Order.findById(orderId);
  
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
  
    if (order.status === "Canceled") {
      throw new ApiError(400, "Order is already canceled");
    }
  
    if (order.status === "Completed") {
      throw new ApiError(400, "Completed orders cannot be canceled");
    }
  
    order.status = "Canceled";
    await order.save();
  
  
    return res.status(200).json(
      new ApiResponse(200, order, "Order canceled successfully")
    );
  });

