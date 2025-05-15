import  axiosInstance from "../../config/axios"


export const createOrder = async(id , userId)=>{
    
    try {
        console.log(id , userId)
        const order = await axiosInstance.post("/order" , {
            params : {
                subscriptionId : id , 
                customerId : userId
            }
        }); 
        return order.data
    } catch (error) {
        console.error("Error while placing order ", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"Error while  placing order")
    }
}