import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginRequest, LoginUserResult } from "./authTypes";
import {
  clearAuthSession,
  readAuthFromSession,
  writeAuthToSession,
} from "./authSession";
import { loginWithProfile } from "./authApi";

const persisted = readAuthFromSession();

const initialState: AuthState = {
  accessToken: persisted.accessToken,
  tokenType: persisted.tokenType,
  userEmail: persisted.userEmail,
  firstname: persisted.firstname,
  lastname: persisted.lastname,
  fullName: persisted.fullName,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  LoginUserResult,
  LoginRequest,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    return await loginWithProfile(credentials);
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
      state.firstname = null;
      state.lastname = null;
      state.fullName = null;
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
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.fullName = action.payload.fullName;
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
