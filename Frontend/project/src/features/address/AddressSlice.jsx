import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"; 
import { addAddress , getAddressById, updateAddressById , deleteAddress} from "./AddressApi";

const initialState = {
    status : "idle" , 
    addressAddStatus :"idle" ,
    addressDeleteStatus:"idle" ,
    addressUpdateStatus : "idle" , 
    address: null ,
    errors : null ,
    successMessage: null
}


export const addAddressAsync = createAsyncThunk("address/addAddressAsync" , async(address)=>{
    const createdAddress = await addAddress(address)
    return createdAddress
})

export const getAddressByIdAsync = createAsyncThunk("address/getAddressAsync" ,async(id)=>{
    const address = await getAddressById(id); 
    return address 
})

export const updateAddressByIdAsync = createAsyncThunk("address/updateAddressByIdAsync" ,async(address)=>{
    const updatedAddress = await updateAddressById(address); 
    return updatedAddress
})

export const deleteAddressAsync = createAsyncThunk("address/deleteAddressAsync" , async()=>{
    const deletedAddress = await deleteAddress() ;
    return deletedAddress; 
})

const addressSlice = createSlice({
    name:"addressSlice" , 
    initialState : initialState , 
    reducers : {
        resetAddressStatus : (state)=>{
            state.status = "idle"
        } , 
        resetAddressAddStatus :(state)=>{
            state.addressAddStatus = "idle"
        },
        resetAddressDeleteStatus : (state)=>{
            state.addressDeleteStatus = "idle"
        },
        resetAddressUpdateStatus : (state)=>{
            state.addressUpdateStatus="idle"
        }, 
        cleanUpErrors : (state)=>{
            state.errors = null 
        }
         

    },
    extraReducers:(builder)=>{
        builder
        .addCase(addAddressAsync.pending , (state)=>{
            state.addressAddStatus  = 'pending'
        })
        .addCase(addAddressAsync.fulfilled , (state , action )=>{
            state.addressAddStatus = 'fulfilled'
            state.address = action.payload
        } )
        .addCase(addAddressAsync.rejected , (state , action)=>{
            state.addressAddStatus = "rejected"
            state.errors = action.error
        })
        .addCase(getAddressByIdAsync.pending ,(state)=>{
            state.status = 'pending'
        })
        .addCase(getAddressByIdAsync.fulfilled , (state , action)=>{
            state.status ='fulfilled'
            state.address = action.payload
        })
        .addCase(getAddressByIdAsync.rejected , (state , action)=>{
            state.status = 'rejected'
            state.errors = action.error
        })
        .addCase(updateAddressByIdAsync.pending,(state)=>{
            state.addressUpdateStatus='pending'
        })
        .addCase(updateAddressByIdAsync.fulfilled,(state,action)=>{
            state.addressUpdateStatus='fulfilled'
            state.address = action.payload
        })
        .addCase(updateAddressByIdAsync.rejected,(state,action)=>{
            state.addressUpdateStatus='rejected'
            state.errors=action.error
        })
        .addCase(deleteAddressAsync.pending,(state)=>{
            state.addressDeleteStatus='pending'
        })
        .addCase(deleteAddressAsync.fulfilled,(state,action)=>{
            state.addressDeleteStatus='fulfilled'
            state.address = null ; 
        })
        .addCase(deleteAddressAsync.rejected,(state,action)=>{
            state.addressDeleteStatus='rejected'
            state.errors=action.error
        })
    }
})

//selectors
export const selectAddressStatus = (state)=>state.AddressSlice.status
export const selectAddress  = (state)=>state.AddressSlice.address 
export const selectAddressErrors = (state)=>state.AddressSlice.errors 
export const selectAddressSuccessMessge  = (state)=>state.AddressSlice.successMessage 
export const selectAddressAddStatus = (state)=> state.AddressSlice.addressAddStatus
export const selectAddressUpdateStatus = (state)=>state.AddressSlice.addressUpdateStatus
export const selectAddressDeleteStatus = (state)=>state.AddressSlice.addressDeleteStatus
export const { resetAddressStatus , resetAddressAddStatus , resetAddressDeleteStatus , resetAddressUpdateStatus , cleanUpErrors} = addressSlice.actions
export default addressSlice.reducer
