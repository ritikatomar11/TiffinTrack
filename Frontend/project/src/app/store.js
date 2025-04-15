import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "../features/auth/AuthSlice"
import UserSlice from "../features/user/UserSlice"
import AddressSlice from "../features/address/AddressSlice"
import SubscriptionSlice from "../features/subscription/SubscriptionSlice"
export const store = configureStore({
    reducer : {
        AuthSlice ,
        UserSlice , 
        AddressSlice , 
        SubscriptionSlice
    }
})