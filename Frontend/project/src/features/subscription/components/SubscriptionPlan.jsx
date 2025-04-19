import React , {useState , useEffect, useDebugValue} from "react"
import {selectSubscriptionPlans} from "../SubscriptionSlice"
import { useSelector , useDispatch} from "react-redux"
import { fetchSubscriptionPlansAsync } from "../SubscriptionSlice"
import { useNavigate } from "react-router-dom"; 



export const SubscriptionPlan = ()=>{
    const plans = useSelector(selectSubscriptionPlans)
    const dispatch = useDispatch()
    const navigate = useNavigate(); 

    const handleClick = (id)=>{
      navigate(`/${id}/tiffins`)
    }

    useEffect(()=>{
        dispatch(fetchSubscriptionPlansAsync())
    } , [dispatch])

    
    return (
        <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">Subscription Plans</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              onClick= {()=>handleClick(plan._id)}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={plan.planImage}
                alt={`Image for ${plan.name}`}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                {/* Optional: Add price and a button */}
                {/* <p className="text-lg font-semibold mt-4 text-indigo-600">₹{plan.price}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                  Subscribe
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}