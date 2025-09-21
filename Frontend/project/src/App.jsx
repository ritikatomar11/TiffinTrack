import { useSelector } from "react-redux";
import {
  Navigate , Route , RouterProvider , createBrowserRouter , createRoutesFromElements} from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { selectIsAuthChecked , selectLoggedInUser } from "./features/auth/AuthSlice";
import  Protected from "./features/auth/components/Protected"
import { useAuthCheck  } from "./hooks/useAuthCheck";
import { useGetUserDetails } from "./hooks/useGetUserDetails";
import Logout from "./features/auth/components/Logout"

import { SignupPage , LoginPage , UserProfilePage ,HomePage } from "./pages/index"
import AddAddress from "./features/address/components/AddAddress";
import EditAddress from "./features/address/components/EditAddress";
import { SubscriptionPlanDetails } from "./features/subscription/components/SubscriptionPlanDetails";
import FetchAllTiffins from "./features/tiffin/components/FetchAllTiffins";
import AddSubscriptionPlan from "./features/subscription/components/AddSubscriptionPlan";
import AddTiffin from "./features/tiffin/components/AddTiffin";
import { AddOrder } from "./features/order/components/AddOrder";
import { SubscriptionPlanPage } from "./pages/SubscriptionPlanPage";
import { OrdersByUser } from "./features/order/components/OrdersByUser";
function App() {
  
  // const isAuthChecked = useSelector(selectIsAuthChecked)
  const loggedInUser = useSelector(selectLoggedInUser)
  console.log(loggedInUser)
  // useAuthCheck()
  useGetUserDetails(loggedInUser)

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/allPlans' element={<SubscriptionPlanPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/myOrders" element={<Protected><OrdersByUser/></Protected>}/>
        <Route path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route path='/addAddress' element={<Protected><AddAddress/></Protected>}/>
        <Route path='/updateAddress' element={<Protected><EditAddress/></Protected>}/>
        <Route path="/profile" element={<Protected><UserProfilePage/></Protected>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:id'>
          <Route path='tiffins' element={<FetchAllTiffins/>}/> 
          <Route path='addOrder' element= {<AddOrder/>}/> 
          <Route path='addNewTiffin' element={<AddTiffin/>}/>
            
        </Route>
        <Route path='/newPlan' element={<AddSubscriptionPlan/>}/>
               
        

      </>
    )
  )
  return (
    <>
      {<RouterProvider router = {routes}/>}
      <ToastContainer/>
    </>
  ) ;   
  
}

export default App
