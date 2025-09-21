import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  // if (!userInfo?.data)
  //   return (
  //     <Typography align="center" sx={{ mt: 5, color: "gray" }}>
  //       Loading user data...
  //     </Typography>
  //   );

  // useEffect(()=>{
  //   dispatch()
  // } , [errors])



  const {
    fullName,
    email,
    phoneNumber,
    role,
    salary,
    staffType,
    joiningDate,
    address,
  } = userInfo.data;

  return (
     <Box maxWidth={600} mx="auto" mt={8}>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            User Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography><strong>Name:</strong> {fullName}</Typography>
            <Typography><strong>Email:</strong> {email}</Typography>
            <Typography><strong>Phone:</strong> {phoneNumber}</Typography>
            <Typography><strong>Role:</strong> {role}</Typography>
            {salary && <Typography><strong>Salary:</strong> ₹{salary}</Typography>}
            {staffType && <Typography><strong>Staff Type:</strong> {staffType}</Typography>}
            {joiningDate && (
              <Typography>
                <strong>Joining Date:</strong>{" "}
                {new Date(joiningDate).toLocaleDateString()}
              </Typography>
            )}
          </Stack>

          <Stack spacing={2} mt={4}>
            {address ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditLocationAltIcon />}
                onClick={() => navigate("/updateAddress")}
              >
                Edit Your Address
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<AddLocationAltIcon />}
                onClick={() => navigate("/addAddress")}
              >
                Add Your Address
              </Button>
            )}

            {role === "worker" && ["manager", "admin"].includes(staffType) && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddBoxIcon />}
                onClick={() => navigate("/newPlan")}
              >
                Add Subscription Plan
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
