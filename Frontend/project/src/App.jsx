import { useSelector } from "react-redux";
import {
  Navigate , Route , RouterProvider , createBrowserRouter , createRoutesFromElements} from "react-router-dom"

import { selectIsAuthChecked , selectLoggedInUser } from "./features/auth/AuthSlice";
import  Protected from "./features/auth/components/Protected"
import { useAuthCheck  } from "./hooks/useAuthCheck";
import { useGetUserDetails } from "./hooks/useGetUserDetails";
import Logout from "./features/auth/components/Logout"

import { SignupPage , LoginPage , UserProfilePage } from "./pages/index"

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
        <Route path="/profile" element={<UserProfilePage/>}/>
      </>
    )
  )
  return isAuthChecked ?<RouterProvider router = {routes}/> : "" ;   
  
}

export default App
