import axiosInstance from "../../config/axios"

export const addAddress = async(address)=>{
    try{
        const res = await axiosInstance.post("/address/addAddress" , address)
        return res.data
    }catch(error){
        throw error.response.data 
    }
}

export const getAddressById = async(id)=>{
    try{
        const res = await axiosInstance.get("/address/getAddress" , id)
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const updateAddressById = async(address)=>{
    try{
        const res = await axiosInstance.put("/address/updateAddress" , address)
        return res.data
    }catch(error){
        throw error.response.data
    }
}