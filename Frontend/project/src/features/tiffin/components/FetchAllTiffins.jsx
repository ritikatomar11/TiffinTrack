import { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  selectTiffinErrors,
  selectTiffinStatus,
  selectTiffins,
  fetchAllTiffinsAsync,
  resetStatus,
  cleanUpErrors,
} from "../TiffinSlice";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import { selectLoggedInUser } from "../../auth/AuthSlice";
import { getAddressByIdAsync , selectAddress} from "../../address/AddressSlice";

function FetchAllTiffins() {
  const { id } = useParams();
  const status = useSelector(selectTiffinStatus);
  const error = useSelector(selectTiffinErrors);
  const tiffins = useSelector(selectTiffins);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const address = useSelector(selectAddress) ;

  const [addressData , setAddressData ] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  })

  useEffect(() => {
    dispatch(fetchAllTiffinsAsync(id));
  }, [id]);

  
  useEffect(() => {
    if (loggedInUser) {
     console.log("l" , loggedInUser);
      dispatch(getAddressByIdAsync(loggedInUser._id));
       console.log("a" , address); 
    }
  }, [loggedInUser, dispatch]);

   useEffect(() => {
    if (address?.data?.address) {
      setAddressData(address.data.address);
    }
  }, [address]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Fetched all tiffins under this subscription plan");
      dispatch(resetStatus());
    } else if (status === "rejected") {
      toast.error(error?.message || "Something went wrong");
      dispatch(cleanUpErrors());
    }
  }, [status, error]);

 

  return (
    <div className="p-6">
      


      <Box p={4}>
      {/* Greeting and Address */}
      {(loggedInUser? <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Hello, {loggedInUser?.data?.fullName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Delivery Address: {`${addressData.street}, ${addressData.city}, ${addressData.state} - ${addressData.pincode}`}
        </Typography>
        {/* Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={6}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/${id}/addNewTiffin`)}
        >
          Add New Tiffin
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/${id}/addOrder`)}
        >
          Place Order
        </Button>
      </Stack>
      </Paper>: "" )}

      {/* Heading */}
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Tiffin Plans
      </Typography>

       {status === "loading" ? (
        <div className="text-center text-lg text-gray-500 animate-pulse">Loading tiffins...</div>
      ) : tiffins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tiffins.map((tiffin) => (
            <div
              key={tiffin._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={tiffin.tiffinImage}
                alt={tiffin.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {tiffin.name}
                </h3>
                <p className="text-gray-600 mt-2">{tiffin.description}</p>
                <p className="text-gray-600 mt-2">{tiffin.day}</p>
                <p className="text-sm text-gray-400 mt-4"> {tiffin.mealType}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500 mt-10">
          No tiffins found for this plan.
        </div>
      )} 



      
    </Box>


     
    </div>
  );
}

export default FetchAllTiffins;
