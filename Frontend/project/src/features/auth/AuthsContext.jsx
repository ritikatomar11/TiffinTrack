import { createContext , useState , useEffect , useContext} from 'react'
import { signup , login , logout } from "./authApi";

const AuthContext = createContext(

); 


export const AuthProvider =({children})=>{
    const [user , setUser] = useState(null); 
    const [loading , setLoading] = useState(true);

    const handleSignup = async(userData)=>{
        setLoading(true); 
        try{
            const data = await signup(userData); 
            console.log("SignUp Data:"  , data);
            setUser(data);  
        }catch(error){
            console.error("Signup Error" , error.message); 
        }finally{
            setLoading(false)
        }
    }

    const handleLogin = async(credentials)=>{
        setLoading(true); 
        try{
            const data = await login(credentials); 
            setUser(data); 
        }catch(error){
            console.error("Login Error" , error.message); 
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async()=>{
        try{
            await logout(); 
            alert("user logged out successfully")
            setUser(null); 
        }catch(error){
            console.log("Logout failed" , error.message);
        }
    }


    return (
        <AuthContext.Provider value={{user , loading , signup:handleSignup , login:handleLogin , logout:handleLogout}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = ()=>{
    return useContext(AuthContext)
}