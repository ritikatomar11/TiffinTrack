import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import {
  selectLoggedInUser,
} from "../../auth/AuthSlice";

import {
  getAddressByIdAsync,
  selectAddress,
  updateAddressByIdAsync,
  selectAddressUpdateStatus , 
  selectAddressErrors
} from "../AddressSlice";

function EditAddress() {
  const dispatch = useDispatch();
  const error = useSelector(selectAddressErrors)
  const loggedInUser = useSelector(selectLoggedInUser);
  const address = useSelector(selectAddress);
  const status = useSelector(selectAddressUpdateStatus); 

  const [data, setData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(()=>{
    if(status === 'fulfilled'){
      toast.success("Address updated successfully") ;
    }else if(status === 'rejected'){
      toast.error(error.message)
    }
  },[status , error])

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getAddressByIdAsync(loggedInUser._id));
    }
  }, [loggedInUser, dispatch]);

  useEffect(() => {
    if (address?.data?.address) {
      setData(address.data.address);
    }
  }, [address]);



  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.street || !data.city || !data.pincode) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(updateAddressByIdAsync({ userId: loggedInUser._id, address: data }))
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Update Address
      </h1>

      <input
        type="text"
        placeholder="Street"
        name="street"
        value={data.street}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="City"
        name="city"
        value={data.city}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="State"
        name="state"
        value={data.state}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Country"
        name="country"
        value={data.country}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Pincode"
        name="pincode"
        value={data.pincode}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
}

export default EditAddress;
