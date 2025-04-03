import axiosInstance from "../../config/axios"; 

export const signup = async(userData) => {
    try{
        const res = await axiosInstance.post("/users/signUp"  ,userData); 
        return res.data ; 
    }catch(error){
        console.error("Signup Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"Signup failed")
    }
}

export const login = async(credentials) =>{
    try{
        const res = await axiosInstance.post("/users/login" , credentials); 
        console.log("Login Successful:", res.data); // Log API response instead of userData
        return res.data; 
    }catch(error){
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message ||"Login Failed")
    }
}

export const logout = async()=>{
    try{
        const res = await axiosInstance.post("/users/logout"); 
        return{success:true , message:"Logout successful"} ;
    }
    catch(error){
        console.error("Logout Failed" , error); 
        throw new Error(error.response?.data?.message ||"Logout failed")
    }
}