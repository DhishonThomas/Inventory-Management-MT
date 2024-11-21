import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    isAuthenticated:boolean;
    user:object|null;
    token:string|null
}


const initialState:AuthState={
    isAuthenticated:false,
    user:null,
    token:null,
}


const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess:(state,action:PayloadAction<{user:any; token:string}>)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        logout:(state)=>{
            state.isAuthenticated=false
            state.user=null
            state.token=null
        }
    }
})

const userReducer=authSlice.reducer

export const {loginSuccess,logout}=authSlice.actions

export default userReducer