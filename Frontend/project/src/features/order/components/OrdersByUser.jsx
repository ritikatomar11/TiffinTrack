import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { getOrdersByIdAsync, selectGetOrderStatus, selectOrderErrors, selectOrders ,resetGetOrderStatus, cleanUpErrors  } from "../OrderSlice";
import { toast } from "react-toastify";


import {
   Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

export const OrdersByUser =  ()=>{
    const dispatch = useDispatch();
    const status = useSelector(selectGetOrderStatus); 
    const errors = useSelector(selectOrderErrors); 
    const orders = useSelector(selectOrders); 
    
    useEffect(() => {
        if(status === "fulfilled"){
            console.log("orders" , orders)
            toast.success("All orders"); 
            dispatch(resetGetOrderStatus); 
        }else if(status === "rejected"){
            toast.error(errors)
            dispatch(cleanUpErrors())
            
        }
    
    }, [status])

    useEffect(()=>{
        dispatch(getOrdersByIdAsync());     

    }, [dispatch])
    




    return(
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Orders
      </Typography>

      {status === "pending" && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === "fulfilled" && orders?.length === 0 && (
        <Typography>No orders found.</Typography>
      )}

      {status === "fulfilled" && orders?.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, idx) => (
                <TableRow key={order._id || idx}>
                  <TableCell>{order.plan.name}</TableCell>
                  <TableCell>{order.plan.price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    {new Date(order.dateTime).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    )



}

