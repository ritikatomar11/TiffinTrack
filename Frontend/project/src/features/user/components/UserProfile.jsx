import React , { useEffect , useState } from "react";
import { useSelector } from "react-redux"
import { selectUserInfo } from "../UserSlice"
import { useNavigate } from "react-router-dom"
import { selectLoggedInUser } from "../../auth/AuthSlice";

export const UserProfile =()=>{

    const navigate = useNavigate()
    const loggedInUser = useSelector(selectLoggedInUser)
    
    const userInfo = useSelector(selectUserInfo); 
    useEffect(()=>{
        if(!loggedInUser){
            navigate("/login")
        }
    } ,[loggedInUser , navigate])

    return (
        <div>
            <h1>User Details : </h1>
            <p>{userInfo?.data.fullName}</p>
            <p>{userInfo?.data.email}</p>
            <p>{userInfo?.data.phoneNumber}</p>
            <p>{userInfo?.data.role}</p>
            <p>{userInfo?.data?.salary}</p>
            <p>{userInfo?.data?.staffType}</p>
            <p>{userInfo?.data?.joiningDate}</p>
            {
                userInfo?.data?.address ? <button onClick={()=>navigate('/updateAddress')}>Edit your Address</button>: <button onClick={()=>navigate('/addAddress')}>Add your Address</button>
            }
        </div>
    )


}
