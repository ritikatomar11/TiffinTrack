import { useState , useEffect } from "react";
import {useDispatch , useSelector } from 'react-redux'
import {selectLoggedInUser, loginAsync,selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus} from '../AuthSlice'
import { useNavigate } from "react-router-dom";


function Login(){

    const dispatch = useDispatch(); 

    const error = useSelector(selectLoginError)
    const status = useSelector(selectLoginStatus)
    const loggedInUser = useSelector(selectLoggedInUser)
    const navigate = useNavigate()
    const isLoading = status === 'pending'

     // handles user redirection
    useEffect(()=>{
        if(loggedInUser){
        navigate("/")
        }
    },[loggedInUser])

    useEffect(()=>{
        if(error){
          alert(error.message)
        }
      },[error])


      // handles login status and dispatches reset actions to relevant states in cleanup
    useEffect(()=>{
        if(status==='fullfilled' && loggedInUser){
            alert(`Login successful`)
            // reset()
        }
        return ()=>{
        dispatch(clearLoginError())
        dispatch(resetLoginStatus())
        }
  },[status])
    
    
    const [credentials , setCredentials] = useState({
        email:"" , 
        password:""
    })

    const handleChange = (e)=>{
        setCredentials({...credentials , [e.target.name] :e.target.value}); 
    }


    const handleLogin = (e)=>{
        e.preventDefault() 
        dispatch(loginAsync(credentials))
        console.log(credentials , loggedInUser)
    }

    return(
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
            <input
            type="text"
            name="email"
            value={credentials.email}
            placeholder="Enter email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            />

            <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            />

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
             {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
        </div>
     </div>
    )
}

export default Login ;