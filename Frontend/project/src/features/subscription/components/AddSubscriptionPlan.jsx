import { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubscriptionPlanAsync } from "../SubscriptionSlice";
import { selectSubscriptionPlanAddStatus , selectNewPlan , selectSubscriptionErrors } from "../SubscriptionSlice";
import { toast } from "react-toastify";

function AddSubscriptionPlan (){
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
        toast.error(errors)
    } , [errors])

    useEffect(()=>{
        if(status==='fulfilled'){
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
        <form onSubmit={handleAddSubscription} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Plan Name"
          value={newPlanData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newPlanData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="planType"
          placeholder="Plan Type"
          value={newPlanData.planType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="foodType"
          placeholder="Food Type"
          value={newPlanData.foodType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newPlanData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="file"
          name="planImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Plan
        </button>
        
      </form>

    )

}

export default AddSubscriptionPlan ; 