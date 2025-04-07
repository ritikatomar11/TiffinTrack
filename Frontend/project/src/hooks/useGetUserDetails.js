import React , {useEffect} from "react"; 
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { useDispatch , useSelector } from "react-redux";
import { getUserDetailsAsync } from "../features/user/UserSlice";

export const useGetUserDetails = (deps)=>{
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch(); 
    console.log("inside" , loggedInUser)

    useEffect(()=>{
        if(deps && loggedInUser){
            console.log("id" , loggedInUser.data._id)
            dispatch(getUserDetailsAsync(loggedInUser.data._id))
        }
    } , [deps , loggedInUser])
}