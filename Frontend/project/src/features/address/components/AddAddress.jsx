import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import {
  selectAddressErrors,
  selectAddressStatus,
  addAddressAsync,
} from "../AddressSlice";

function AddAddress() {
  const dispatch = useDispatch();
  const error = useSelector(selectAddressErrors);
  const status = useSelector(selectAddressStatus);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Address added successfully")
      setAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    }
  }, [status]);

  useEffect(()=>{
    toast.error(error.message)
  } , [error])


  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.pincode) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(addAddressAsync(address));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Add Address
      </h1>

      <input
        type="text"
        name="street"
        placeholder="Enter Street"
        value={address.street}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="city"
        placeholder="Enter City"
        value={address.city}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="state"
        placeholder="Enter State"
        value={address.state}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="country"
        placeholder="Enter Country"
        value={address.country}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="pincode"
        placeholder="Enter Pincode"
        value={address.pincode}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>

      {error && (
        <p className="text-red-500 text-center text-sm mt-2">{error}</p>
      )}
    </form>
  );
}

export default AddAddress;
