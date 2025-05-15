import { useState , useEffect } from "react";
import { selectOrderErrors ,selectOrder , selectOrderStatus , selectOrderSuccessMessage} from "../OrderSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { useSelector , useDispatch } from "react-redux"
import { toast } from "react-toastify"; 
import { createOrderAsync } from "../OrderSlice";
import { useParams } from "react-router-dom" 
export function AddOrder (){
    const user = useSelector(selectLoggedInUser)
    const status = useSelector(selectOrderStatus)
    const errors = useSelector(selectOrderErrors)
    const dispatch = useDispatch()
    const {id} = useParams(); 
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        toast.error(errors)
    } , [errors])
    useEffect(()=>{
            if(status==='fulfilled'){
                toast.success("Order Placed successfully"); 
            }
    } , [status])


    const handleOrder = (e)=>{
        e.preventDefault()
        if (!quantity || Number(quantity) < 1) {
            ("Please enter a valid quantity (1 or more).");
            return;
        }
        console.log(id)
        console.log(user.data._id); 
        dispatch(createOrderAsync({id: id , userId: user.data._id} ))
    }

    return (
    <form onSubmit={handleOrder} className="max-w-sm mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Place New Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </form>
    )

}

  

