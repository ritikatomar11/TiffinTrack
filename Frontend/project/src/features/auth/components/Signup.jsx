import { useEffect, useState } from "react"
import {useDispatch , useSelector } from 'react-redux'
import {selectLoggedInUser, signupAsync,selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus} from '../AuthSlice'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Signup(){
    const dispatch = useDispatch()
    const status = useSelector(selectSignupStatus)
    const error = useSelector(selectSignupError)
    const loggedInUser = useSelector(selectLoggedInUser)
    const navigate = useNavigate(); 
    const [userData , setUserData] = useState({
        fullName:"" , 
        email:"" , 
        phoneNumber:"" , 
        password:"" , 
        role:"customer" , 
        joiningDate: "",
        isAvailable: true,
        staffType: "",
        salary: "",
    })
    const reset = () => {
      setUserData({
        fullName: "", 
        email: "", 
        phoneNumber: "", 
        password: "", 
        role: "customer", 
        joiningDate: "",
        isAvailable: true,
        staffType: "",
        salary: "",
      });
    };

    useEffect(() => {
      if (status === "fulfilled") {
        toast.success("Welcome!");
        reset();
        navigate("/login")
      } else if (status === "rejected" && error) {
        toast.error(typeof error === "string" ? error : error?.message || "Signup failed");
      }
    }, [status, error]);

    useEffect(() => {
      return () => {
        dispatch(clearSignupError());
        dispatch(resetSignupStatus());
      };
    }, []);


      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
          ...userData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
      
    
    const handleSignup = (e)=>{
        e.preventDefault()
        dispatch(signupAsync(userData));
        
      }


    return (
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={userData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={userData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter Phone number"
          value={userData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <div>
          <label className="block mb-1 text-gray-700">Role:</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="customer">Customer</option>
            <option value="worker">Worker</option>
          </select>
        </div>

        {userData.role === "worker" && (
          <>
            <div>
              <label className="block mb-1 text-gray-700">Joining Date:</label>
              <input
                type="date"
                name="joiningDate"
                max={new Date().toISOString().split("T")[0]}
                value={userData.joiningDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Staff Type:</label>
              <select
                name="staffType"
                value={userData.staffType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Staff Type</option>
                <option value="manager">Manager</option>
                <option value="chef">Chef</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Salary:</label>
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={userData.salary}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={userData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-gray-700">Available</label>
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={status==="pending"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          {status === "pending" ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
    )
}

export default Signup;