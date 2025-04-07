import { useSelector } from "react-redux";
import {selectLoggedInUser} from "../AuthSlice"
import { Navigate } from "react-router-dom";

function Protected({children}){
    const loggedInUser = useSelector(selectLoggedInUser); 
    if(loggedInUser){
        return children
    }
    return <Navigate to={'/login'} replace={true}/>
}

export default Protected ;