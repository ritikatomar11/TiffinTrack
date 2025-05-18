import  axiosInstance from "../../config/axios"


export const createOrder = async(id , userId , quantity)=>{
    
    try {
        console.log(id , userId , quantity)
        const order = await axiosInstance.post("/order" , {
                quantity : quantity , 
                subscriptionId : id , 
                customerId : userId
            
        }); 
        return order.data
    } catch (error) {
        console.error("Error while placing order ", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"Error while  placing order")
    }
}

export const getOrdersById  = async()=>{
    try {
        const orders = await axiosInstance.get("/order"); 
        console.log(orders); 
        return orders.data ; 
        
    } catch (error) {
        throw new Error(error.response?.data?.message ||"Error while  fetching your orders")
        
    }
}