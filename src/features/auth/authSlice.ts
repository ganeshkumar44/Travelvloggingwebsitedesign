import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AuthState,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
} from "./authTypes";
import {
  clearAuthSession,
  readAuthFromSession,
  writeAuthToSession,
  writeProfileToSession,
} from "./authSession";
import { fetchProfileApi, loginApi } from "./authApi";

const persisted = readAuthFromSession();

const initialState: AuthState = {
  accessToken: persisted.accessToken,
  tokenType: persisted.tokenType,
  userEmail: persisted.userEmail,
  firstname: persisted.firstname,
  lastname: persisted.lastname,
  fullName: persisted.fullName,
  role: persisted.role,
  status: "idle",
  error: null,
};

function capitalize(value: string | undefined): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
}

function makeFullName(firstname: string | undefined, lastname: string | undefined): string {
  return `${capitalize(firstname)} ${capitalize(lastname)}`.trim();
}

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

export const fetchUserProfile = createAsyncThunk<
  ProfileResponse,
  string,
  { rejectValue: string }
>("auth/fetchUserProfile", async (accessToken, { rejectWithValue }) => {
  try {
    return await fetchProfileApi(accessToken);
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
      state.role = null;
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
        state.firstname = null;
        state.lastname = null;
        state.fullName = email;
        state.role = null;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Login failed";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const profileEmail = (action.payload.email ?? "").trim();
        const fallbackEmail = profileEmail || state.userEmail || "";
        const fullName = makeFullName(
          action.payload.firstname,
          action.payload.lastname,
        );
        const displayName = fullName || fallbackEmail;

        state.firstname = capitalize(action.payload.firstname) || null;
        state.lastname = capitalize(action.payload.lastname) || null;
        state.fullName = displayName || null;
        state.userEmail = fallbackEmail || null;
        state.role = action.payload.role ?? null;

        if (state.userEmail) {
          writeProfileToSession({
            firstname: state.firstname,
            lastname: state.lastname,
            fullName: state.fullName ?? state.userEmail,
            email: state.userEmail,
            role: state.role,
          });
        }
      });
  },
});

export const { logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
