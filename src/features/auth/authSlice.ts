import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginRequest, LoginResponse } from "./authTypes";
import {
  clearAuthSession,
  readAuthFromSession,
  writeAuthToSession,
} from "./authSession";
import { loginApi } from "./authApi";

const persisted = readAuthFromSession();

const initialState: AuthState = {
  accessToken: persisted.accessToken,
  tokenType: persisted.tokenType,
  userEmail: persisted.userEmail,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    return await loginApi(credentials);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearAuthSession();
      state.accessToken = null;
      state.tokenType = null;
      state.userEmail = null;
      state.status = "idle";
      state.error = null;
    },
    clearLoginError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const email = action.meta.arg.email;
        writeAuthToSession(action.payload, email);
        state.accessToken = action.payload.access_token;
        state.tokenType = action.payload.token_type;
        state.userEmail = email;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Login failed";
      });
  },
});

export const { logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
