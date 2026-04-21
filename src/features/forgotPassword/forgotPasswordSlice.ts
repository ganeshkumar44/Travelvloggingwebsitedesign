import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordState,
} from "./forgotPasswordTypes";
import { forgotPasswordApi } from "./forgotPasswordApi";

const initialState: ForgotPasswordState = {
  lockedEmail: null,
  status: "idle",
  apiError: null,
  successMessage: null,
};

export const sendForgotPasswordOtp = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: string }
>(
  "forgotPassword/sendForgotPasswordOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(payload);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Something went wrong. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    clearForgotPasswordError(state) {
      state.apiError = null;
    },
    resetForgotPasswordState: () => ({ ...initialState }),
  },
  extraReducers(builder) {
    builder
      .addCase(sendForgotPasswordOtp.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
      })
      .addCase(sendForgotPasswordOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiError = null;
        state.lockedEmail = action.meta.arg.email.trim();
        state.successMessage = action.payload.message;
      })
      .addCase(sendForgotPasswordOtp.rejected, (state, action) => {
        state.status = "failed";
        state.apiError =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export const { clearForgotPasswordError, resetForgotPasswordState } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
