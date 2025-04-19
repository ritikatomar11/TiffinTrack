import axiosInstance from "../../config/axios"; 

export const signup = async(userData) => {
    try{
        const res = await axiosInstance.post("/auth/signUp"  ,userData); 
        return res.data ; 
    }catch(error){
        console.error("Signup Error:", error || error.message);
        throw error.response.data
    }
}

export const login = async(credentials) =>{
    try{
        const res = await axiosInstance.post("/auth/login" , credentials); 
        // console.log("Login Successful:", res.data); // Log API response instead of userData
        return res.data; 
    }catch(error){
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"Login Failed")
    }
}

export const logout = async()=>{
    try{
        const res = await axiosInstance.post("/auth/logout"); 
        return{success:true , message:"Logout successful"} ;
    }
    catch(error){
        console.error("Logout Failed" , error); 
        throw new Error(error.response?.data?.message ||"Logout failed")
    }
}

export const checkAuth = async(cred)=>{
    try{
        const res = await axiosInstance.get("auth/check-auth")
        console.log("res" , res)
        return res.data 
    }catch(error){
        throw new Error(error.response?.data?.message ||"AuthCheck failed")
    }
}


export const forgotPassword = async()=>{
    try{
        const res = await axiosInstance
    }catch(error){

    }
}

export const deleteUser = async()=>{
    try{
        // const res = await axiosInstance.delete("/users/deleteUser"); 
        return {success : true , message : "User Deleted"}
    }catch(error){
        console.error("Not able to delete User" , error) ; 
        throw new Error(error.response?.data?.message ||"Delete User failed")
    }

}