import {createAsyncThunk  , createSlice} from "@reduxjs/toolkit"; 
import {checkAuth, login , logout , signup} from './AuthApi'

const initialState = {
  status : "idle" , 
  errors : null , 
  signupStatus : "idle" ,
  signupError : null , 
  loginStatus : "idle" , 
  loginError : null , 
  loggedInUser : null ,
  successMessage:null , 
  isAuthChecked : false 

}

export const signupAsync = createAsyncThunk('auth/signupAsync',async(userData)=>{
  const res = await signup(userData); 
  return res
})

export const loginAsync = createAsyncThunk('auth/loginAsync',async(cred)=>{
  const res = await login(cred)
  return res
})

export const logoutAsync = createAsyncThunk("auth/logoutAsync",async()=>{
  const res = await logout()
  return res
})

export const forgotPassword = createAsyncThunk("auth/forgotPasswordAsync" , async()=>{
  const res = await forgotPassword
})

export const checkAuthAsync = createAsyncThunk("auth/checkAuthAsync" , async()=>{
  const res = await checkAuth()
  return res
})

const authSlice = createSlice({
  name:"authSlice" , 
  initialState , 
  reducers:{
    clearAuthSuccessMessage:(state)=>{
        state.successMessage = null
    },
    clearAuthErrors:(state)=>{
        state.errors = null
    },
    resetAuthStatus:(state)=>{
        state.status = 'idle'
    },
    resetSignupStatus:(state)=>{
        state.signupStatus = 'idle'
    },
    clearSignupError:(state)=>{
        state.signupError = null
    },
    resetLoginStatus:(state)=>{
        state.loginStatus = 'idle'
    },
    clearLoginError:(state)=>{
        state.loginError = null
    },

  } , 
  extraReducers:(builder)=>{
    builder
      .addCase(signupAsync.pending , (state)=>{
        state.signupStatus = 'pending'
      })
      .addCase(signupAsync.fulfilled , (state , action)=>{
        state.signupStatus = 'fulfilled' 
      })
      .addCase(signupAsync.rejected , (state , action)=>{
        state.signupStatus = 'rejected' 
        state.signupError = action.error?.message || "SignUp failed" 
      })
      .addCase(loginAsync.pending,(state)=>{
        state.loginStatus='pending'
      })
      .addCase(loginAsync.fulfilled,(state,action)=>{
          state.loginStatus='fulfilled'
          state.loggedInUser=action.payload
      })
      .addCase(loginAsync.rejected,(state,action)=>{
          state.loginStatus='rejected'
          state.loginError=action.error?.message ||"Login Failed"
      })
      .addCase(logoutAsync.pending,(state)=>{
        state.status='pending'
      })
      .addCase(logoutAsync.fulfilled,(state)=>{
          state.status='fulfilled'
          state.loggedInUser=null
          state.errors = null 
      })
      .addCase(logoutAsync.rejected,(state,action)=>{
          state.status='rejected'
          state.errors=action.error
      })
      .addCase(checkAuthAsync.pending,(state)=>{
        state.status='pending'
    })
    .addCase(checkAuthAsync.fulfilled,(state,action)=>{
        state.status='fulfilled'
        state.loggedInUser=action.payload
        state.isAuthChecked=true
    })
    .addCase(checkAuthAsync.rejected,(state,action)=>{
        state.status='rejected'
        state.errors=action.error
        state.isAuthChecked=true
    })
  }

  
})

//selectors 
export const selectAuthStatus  = (state)=>state.AuthSlice.status 
export const selectAuthErrors =  (state)=>state.AuthSlice.errors
export const selectLoggedInUser = (state)=>state.AuthSlice.loggedInUser
export const selectAuthSuccessMessage = (state)=>state.AuthSlice.successMessage
export const selectIsAuthChecked = (state)=>state.AuthSlice.isAuthChecked
export const selectSignupStatus = (state)=>state.AuthSlice.signupStatus
export const selectSignupError = (state)=>state.AuthSlice.signupError
export const selectLoginStatus = (state)=>state.AuthSlice.loginStatus
export const selectLoginError = (state)=>state.AuthSlice.loginError


export const { clearAuthSuccessMessage ,clearLoggedInUserDetails ,  clearAuthErrors , resetAuthStatus , clearSignupError , resetSignupStatus , clearLoginError , resetLoginStatus} = authSlice.actions
export default authSlice.reducer 

