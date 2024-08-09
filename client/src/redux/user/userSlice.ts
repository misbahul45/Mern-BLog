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
    signOut:(state)=>{
        state.currentUser=null
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = userSlice.actions;
export default userSlice.reducer;
export type UserReducer = typeof userSlice.reducer;
