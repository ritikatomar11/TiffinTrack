import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import {
  selectAddressErrors,
  selectAddressAddStatus,
  addAddressAsync,
  resetAddressAddStatus
} from "../AddressSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function AddAddress() {
  const dispatch = useDispatch();
  const error = useSelector(selectAddressErrors);
  const status = useSelector(selectAddressAddStatus);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(resetAddressAddStatus()); 
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
    if(error) toast.error(error)
  } , [error])


  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.pincode) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addAddressAsync(address));
  };

  return (
     <Box maxWidth={500} mx="auto" mt={6}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Add Address
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
            value={address.street}
            onChange={handleChange}
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            value={address.city}
            onChange={handleChange}
          />
          <TextField
            name="state"
            label="State"
            variant="outlined"
            fullWidth
            value={address.state}
            onChange={handleChange}
          />
          <TextField
            name="country"
            label="Country"
            variant="outlined"
            fullWidth
            value={address.country}
            onChange={handleChange}
          />
          <TextField
            name="pincode"
            label="Pincode"
            variant="outlined"
            fullWidth
            value={address.pincode}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={status === "loading"}
            sx={{ mt: 2 }}
          >
            {status === "loading" ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddAddress;
