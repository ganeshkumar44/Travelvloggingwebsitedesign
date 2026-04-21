import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResetPasswordState,
} from "./resetPasswordTypes";
import { resetPasswordApi } from "./resetPasswordApi";

const initialState: ResetPasswordState = {
  status: "idle",
  apiError: null,
  successMessage: null,
};

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: string }
>("resetPassword/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    return await resetPasswordApi(payload);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Reset failed. Please try again.";
    return rejectWithValue(message);
  }
});

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearResetPasswordError(state) {
      state.apiError = null;
    },
    resetResetPasswordState: () => ({ ...initialState }),
  },
  extraReducers(builder) {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiError = null;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.apiError =
          typeof action.payload === "string"
            ? action.payload
            : "Reset failed";
      });
  },
});

export const { clearResetPasswordError, resetResetPasswordState } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
