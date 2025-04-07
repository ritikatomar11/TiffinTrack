import axiosInstance from "../../config/axios"

export const getUserDetails = async(id)=>{
    try{
        console.log("id" ,id)
        const res = await axiosInstance.get(`/users/getUserDetails/${id}`)
        console.log("res d" , res.data)
        return res.data 
    }catch(error){
        throw error.response.data 
    }
}