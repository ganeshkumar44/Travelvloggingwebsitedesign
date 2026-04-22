import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChangePasswordRequest, ChangePasswordState } from "./changePasswordTypes";
import { changePasswordApi } from "../auth/authApi";

const initialState: ChangePasswordState = {
  status: "idle",
  error: null,
};

export const changePassword = createAsyncThunk<
  Awaited<ReturnType<typeof changePasswordApi>>,
  { accessToken: string; body: ChangePasswordRequest },
  { rejectValue: string }
>("changePassword/changePassword", async ({ accessToken, body }, { rejectWithValue }) => {
  try {
    return await changePasswordApi(accessToken, body);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    clearChangePasswordError(state) {
      state.error = null;
    },
    resetChangePasswordState() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export const { clearChangePasswordError, resetChangePasswordState } =
  changePasswordSlice.actions;
export default changePasswordSlice.reducer;
