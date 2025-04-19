import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { logoutAsync , selectLoggedInUser } from "../AuthSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch(); 
    const loggedInUser = useSelector(selectLoggedInUser); 
    const navigate = useNavigate(); 

    const handleLogout =  (e) => {
        e.preventDefault()    
        dispatch(logoutAsync());      
    };

    useEffect(() => {
        if (!loggedInUser) {
          navigate("/");
        }
      }, [loggedInUser, navigate]);
      
    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Logout
        </button>
    );
};

export default Logout;
