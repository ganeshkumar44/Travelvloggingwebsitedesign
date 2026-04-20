import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  VerifyRegistrationOtpRequest,
  VerifyRegistrationOtpResponse,
  VerifyRegistrationOtpState,
} from "./verifyRegistrationOtpTypes";
import { verifyRegistrationOtpApi } from "./verifyRegistrationOtpApi";

const initialState: VerifyRegistrationOtpState = {
  pendingEmail: null,
  status: "idle",
  apiError: null,
  otpFieldError: null,
};

export const verifyRegistrationOtp = createAsyncThunk<
  VerifyRegistrationOtpResponse,
  VerifyRegistrationOtpRequest,
  { rejectValue: string }
>(
  "verifyRegistrationOtp/verifyRegistrationOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyRegistrationOtpApi(payload);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Verification failed. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const verifyRegistrationOtpSlice = createSlice({
  name: "verifyRegistrationOtp",
  initialState,
  reducers: {
    setVerifyRegistrationPendingEmail(state, action: PayloadAction<string>) {
      const v = action.payload.trim();
      state.pendingEmail = v ? v : null;
    },
    clearVerifyRegistrationOtpErrors(state) {
      state.apiError = null;
      state.otpFieldError = null;
    },
    setVerifyRegistrationOtpFieldError(
      state,
      action: PayloadAction<string | null>,
    ) {
      state.otpFieldError = action.payload;
      state.apiError = null;
    },
    resetVerifyRegistrationOtpState: () => ({ ...initialState }),
  },
  extraReducers(builder) {
    builder
      .addCase(verifyRegistrationOtp.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
        state.otpFieldError = null;
      })
      .addCase(verifyRegistrationOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.apiError = null;
        state.otpFieldError = null;
      })
      .addCase(verifyRegistrationOtp.rejected, (state, action) => {
        state.status = "failed";
        state.apiError =
          typeof action.payload === "string"
            ? action.payload
            : "Verification failed";
      });
  },
});

export const {
  setVerifyRegistrationPendingEmail,
  clearVerifyRegistrationOtpErrors,
  setVerifyRegistrationOtpFieldError,
  resetVerifyRegistrationOtpState,
} = verifyRegistrationOtpSlice.actions;

export default verifyRegistrationOtpSlice.reducer;
