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
  selectAddressErrors , 
  resetAddressUpdateStatus
} from "../AddressSlice";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

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
      dispatch(resetAddressUpdateStatus()); 
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
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateAddressByIdAsync({ userId: loggedInUser._id, address: data }))
    
  };

  return (
    <Box maxWidth={500} mx="auto" mt={6}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Update Address
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            name="street"
            label="Street"
            variant="outlined"
            fullWidth
            value={data.street}
            onChange={handleChange}
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            value={data.city}
            onChange={handleChange}
          />
          <TextField
            name="state"
            label="State"
            variant="outlined"
            fullWidth
            value={data.state}
            onChange={handleChange}
          />
          <TextField
            name="country"
            label="Country"
            variant="outlined"
            fullWidth
            value={data.country}
            onChange={handleChange}
          />
          <TextField
            name="pincode"
            label="Pincode"
            variant="outlined"
            fullWidth
            value={data.pincode}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={status === "loading"}
            sx={{ mt: 2 }}
          >
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditAddress;
