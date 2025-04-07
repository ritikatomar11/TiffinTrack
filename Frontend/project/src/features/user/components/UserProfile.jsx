import React , { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux"
import { getUserDetailsAsync, selectUserInfo } from "../UserSlice"


export const UserProfile =()=>{

    
    
    const userInfo = useSelector(selectUserInfo); 

    return (
        <div>
            <h1>User Details : </h1>
            <p>{userInfo?.data.fullName}</p>
            <p>{userInfo?.data.email}</p>
        </div>
    )


}
