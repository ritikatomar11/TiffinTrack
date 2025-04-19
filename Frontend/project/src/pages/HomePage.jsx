import React from "react";
import { SubscriptionPlanPage } from "./SubscriptionPlanPage";
import Footer from "../features/Footer/components/Footer";
import Navbar from "../features/navbar/components/Navbar";
export const  HomePage = ()=>{

    return(
        <>
            <Navbar/>
            <SubscriptionPlanPage/>
            <Footer/>
        </>
    )
}
