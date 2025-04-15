import { useSelector } from "react-redux";
import {
  Navigate , Route , RouterProvider , createBrowserRouter , createRoutesFromElements} from "react-router-dom"

import { selectIsAuthChecked , selectLoggedInUser } from "./features/auth/AuthSlice";
import  Protected from "./features/auth/components/Protected"
import { useAuthCheck  } from "./hooks/useAuthCheck";
import { useGetUserDetails } from "./hooks/useGetUserDetails";
import Logout from "./features/auth/components/Logout"

import { SignupPage , LoginPage , UserProfilePage ,HomePage } from "./pages/index"
import AddAddress from "./features/address/components/AddAddress";
import EditAddress from "./features/address/components/EditAddress";
import { SubscriptionPlanDetails } from "./features/subscription/components/SubscriptionPlanDetails";

function App() {
  
  const isAuthChecked = useSelector(selectIsAuthChecked)
  const loggedInUser = useSelector(selectLoggedInUser)
  console.log(loggedInUser)
  useAuthCheck()
  useGetUserDetails(loggedInUser)

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route path='/addAddress' element={<Protected><AddAddress/></Protected>}/>
        <Route path='/updateAddress' element={<Protected><EditAddress/></Protected>}/>
        <Route path="/profile" element={<UserProfilePage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:id' element ={<SubscriptionPlanDetails/>}/>

      </>
    )
  )
  return isAuthChecked ?<RouterProvider router = {routes}/> : "" ;   
  
}

export default App
