import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  VerifyForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpResponse,
  VerifyForgotPasswordOtpState,
} from "./verifyForgotPasswordOtpTypes";
import { verifyForgotPasswordOtpApi } from "./verifyForgotPasswordOtpApi";

const initialState: VerifyForgotPasswordOtpState = {
  status: "idle",
  apiError: null,
  otpFieldError: null,
  otpVerified: false,
};

export const verifyForgotPasswordOtp = createAsyncThunk<
  VerifyForgotPasswordOtpResponse,
  VerifyForgotPasswordOtpRequest,
  { rejectValue: string }
>(
  "verifyForgotPasswordOtp/verifyForgotPasswordOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyForgotPasswordOtpApi(payload);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Verification failed. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const verifyForgotPasswordOtpSlice = createSlice({
  name: "verifyForgotPasswordOtp",
  initialState,
  reducers: {
    clearVerifyForgotPasswordOtpErrors(state) {
      state.apiError = null;
      state.otpFieldError = null;
    },
    setVerifyForgotPasswordOtpFieldError(
      state,
      action: PayloadAction<string | null>,
    ) {
      state.otpFieldError = action.payload;
      state.apiError = null;
    },
    resetVerifyForgotPasswordOtpState: () => ({ ...initialState }),
  },
  extraReducers(builder) {
    builder
      .addCase(verifyForgotPasswordOtp.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
        state.otpFieldError = null;
      })
      .addCase(verifyForgotPasswordOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.apiError = null;
        state.otpFieldError = null;
        state.otpVerified = true;
      })
      .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
        state.status = "failed";
        state.apiError =
          typeof action.payload === "string"
            ? action.payload
            : "Verification failed";
      });
  },
});

export const {
  clearVerifyForgotPasswordOtpErrors,
  setVerifyForgotPasswordOtpFieldError,
  resetVerifyForgotPasswordOtpState,
} = verifyForgotPasswordOtpSlice.actions;

export default verifyForgotPasswordOtpSlice.reducer;
