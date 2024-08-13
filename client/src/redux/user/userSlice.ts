// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: any;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
    },
    signInSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading=true;
      state.error=null
    },
    updateSuccess:(state, action)=>{
      state.currentUser=action.payload;
      state.loading=false;
      state.error=null;
    },
    updateFailure:(state, action)=>{
      state.loading=false;
      state.error=action.payload
    },
    deleteUser:(state)=>{
      state.currentUser=null
    },
    signoutUser:(state)=>{
      state.currentUser=null
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, updateStart, updateFailure, updateSuccess, deleteUser, signoutUser } = userSlice.actions;
export default userSlice.reducer;
export type UserReducer = typeof userSlice.reducer;
