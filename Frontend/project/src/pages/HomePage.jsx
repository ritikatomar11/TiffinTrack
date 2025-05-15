import React from "react";
import { SubscriptionPlanPage } from "./SubscriptionPlanPage";
import {Footer} from "../features/Footer/components/Footer";
import Navbar from "../features/navbar/components/Navbar";
import {Home} from "../features/home/components/Home"
export const  HomePage = ()=>{

    return(
        <>
            <Navbar/>
            <Home/>
            <Footer/>
        </>
    )
}
