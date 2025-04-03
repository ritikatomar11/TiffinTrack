import { useState } from 'react'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import './App.css'
import Login from "./features/auth/components/Login"
import Logout from "./features/auth/components/Logout"
import { AuthProvider } from './features/auth/AuthsContext';



function App() {
  

  return (
    <AuthProvider>
      <Login/>
      <Logout/>
    </AuthProvider>
  )
}

export default App
