import axiosInstance from "../../config/axios";

export const fetchAllTiffins = async(id)=>{
    try {
        console.log(id)
        const res = await axiosInstance.get(`/subscription/tiffins` , {
            params : {
                subscriptionId : id
            }
        })
        return res.data 
    }catch(error){
        console.error("Not able to fetch tiffin details:", error || error.message);
        throw error.response.data
    }
}