import {
  AuthInitialState,
  LoginCredentials,
  SignupCredentials,
} from "../../utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//importing auth api calls
import apiCalls from "../../utils/apiCalls";

const initialState: AuthInitialState = {
  user: null,
  error: null,
};

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (cred: LoginCredentials) => {
    const response = await apiCalls.loginApiCall(cred);

    return response.data;
  }
);

export const SignupUser = createAsyncThunk(
  "auth/signup",
  async (cred: SignupCredentials) => {
    const response = await apiCalls.signupApiCall(cred);

    return response.data;
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
      })
      .addCase(LoginUser.rejected, (state, action) => {
        console.log("working");
        state.user = {
          username: "Foazy",
          email: "Segunfaozan112@gmail.com",
          token: "12345",
        };

        console.log(state.user);
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
