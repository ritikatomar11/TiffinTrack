import { useState } from "react";
import { useAuth } from "../AuthsContext";


function Login(){
    const {login} = useAuth(); 

    const [credentials , setCredentials] = useState({
        email:"" , 
        password:""
    })

    const [error , setError] = useState(null)

    const handleChange = (e)=>{
        setCredentials({...credentials , [e.target.name] :e.target.value}); 
    }

  

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError(null); 
        try{
            await login(credentials); 
        }catch(err){
            setError(err); 
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="email"
            value={credentials.email}
            placeholder="Enter email"
            onChange={handleChange} 
            required        
            />

            <input 
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
             />

             <button
             type="submit">Login</button>

        </form>
    )
}

export default Login ;