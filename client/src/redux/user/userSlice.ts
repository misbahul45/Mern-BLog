import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice{
    currentUser:null | User,
    error:null | string,
    loading:boolean
}

const initialState:UserSlice={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }
})

export const { signInStart, signInSuccess, signInFailure  }=userSlice.actions


export default userSlice.reducer;