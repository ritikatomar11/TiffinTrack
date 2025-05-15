import { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubscriptionPlanAsync } from "../SubscriptionSlice";
import { selectSubscriptionPlanAddStatus , selectNewPlan , selectSubscriptionErrors  , resetPlanAddStatus} from "../SubscriptionSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddSubscriptionPlan (){
    const navigate = useNavigate(); 
    const status = useSelector(selectSubscriptionPlanAddStatus)
    const errors = useSelector(selectSubscriptionErrors)
    const dispatch = useDispatch()
    // const newPlan = useSelector(selectNewPlan)
    const [newPlanData , setNewPlanData]  = useState({
        name: "",
        description: "",
        planType: "",
        foodType: "",
        price: "",
    })
    const [planImage , setPlanImage] = useState(null); 

    useEffect(()=>{
        if(errors)toast.error(errors)
    } , [errors])

    useEffect(()=>{
        if(status==='fulfilled'){
            navigate("/allPlans")
            dispatch(resetPlanAddStatus())
            toast.success("Plan added successfully"); 
        }
    } , [status])
    
  const handleFileChange = (e) => {
    setPlanImage(e.target.files[0]);
  };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPlanData({
          ...newPlanData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

       
    const handleAddSubscription = (e)=>{
        e.preventDefault(); 
        if(!planImage){
            toast.error("Please add plan image")
        }
        const data = new FormData();
        for (let key in newPlanData) {
          data.append(key, newPlanData[key]);
        }
        data.append("planImage", planImage);
        
        dispatch(addSubscriptionPlanAsync(data));
    }

    
    return (
      <form
      onSubmit={handleAddSubscription}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Add Subscription Plan</h2>

      <input
        type="text"
        name="name"
        placeholder="Plan Name"
        value={newPlanData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={newPlanData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="planType"
        placeholder="Plan Type"
        value={newPlanData.planType}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="foodType"
        placeholder="Food Type"
        value={newPlanData.foodType}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newPlanData.price}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Plan Image</label>
        <input
          type="file"
          name="planImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Creating..." : "Create Plan"}
      </button>
    </form>
        
      

    )

}

export default AddSubscriptionPlan ; 