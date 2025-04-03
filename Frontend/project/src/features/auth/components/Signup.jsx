import { useState } from "react"
import { useAuth } from "../AuthsContext.jsx"

function Signup(){
    const {signup} = useAuth(); 
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

    const [error , setError] = useState(null); 

    const handleChange = (e)=>{
        setUserData({...userData , [e.target.name] :e.target.value}); 
    }

    const handleSubmit  = async(e)=>{
        e.preventDefault(); 
        setError(null); 

        if (!userData.role) {
            setError("Please select a role before signing up.");
            return;
          }
        try{
            await  signup({
                ...userData,
                salary: userData.salary ? parseFloat(userData.salary) : 0, // Convert salary to number
              });
            alert("signup successful!"); 
        }catch(err){
            setError(err.message)
        }
    }
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={userData.fullName}
                    onChange={handleChange}
                    required
            />
            <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={userData.email}
                    onChange={handleChange}
                    required
            />
            <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userData.password}
                    onChange={handleChange}
                    required
            />
            <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter Phone number"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    required
            />
            <label>Role:</label>
            <select name="role" value={userData.role} onChange={handleChange} required>
                    <option value="customer">Customer</option>
                    <option value="worker">Worker</option>
            </select>
            
            {userData.role === "worker" && (
                    <>
                        <label>Joining Date:</label>
                        <input
                            type="date"
                            name="joiningDate"
                            value={userData.joiningDate}
                            onChange={handleChange}
                            required
                        />
                        
                        <label>Staff Type:</label>
                        <select name="staffType" value={userData.staffType} onChange={handleChange} required>
                            <option value="">Select Staff Type</option>
                            <option value="manager">Manager</option>
                            <option value="chef">Chef</option>
                            <option value="delivery">Delivery</option>
                        </select>

                        <label>Salary:</label>
                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={userData.salary}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Available:
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={userData.isAvailable}
                                onChange={handleChange}
                            />
                        </label>
                    </>
            )}
             <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;