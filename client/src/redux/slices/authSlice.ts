import {
  AuthInitialState,
  LoginCredentials,
  SignupCredentials,
} from "../../utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//importing auth api calls
import apiCalls from "../../utils/apiCalls";
import { RootState } from "../store";

const initialState: AuthInitialState = {
  user: null,
  loginError: null,
};

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (cred: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiCalls.loginApiCall(cred);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const SignupUser = createAsyncThunk(
  "auth/signup",
  async (cred: SignupCredentials, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).auth.user.token;
    try {
      const response = await apiCalls.signupApiCall(cred, token);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(action.payload);
        console.log(state.user);
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loginError = action.payload;
      });
  },
});

export default authSlice.reducer;