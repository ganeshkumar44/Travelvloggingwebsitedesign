import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import registerReducer from "../features/register/registerSlice";
import verifyRegistrationOtpReducer from "../features/verifyRegistrationOtp/verifyRegistrationOtpSlice";
import forgotPasswordReducer from "../features/forgotPassword/forgotPasswordSlice";
import verifyForgotPasswordOtpReducer from "../features/verifyForgotPasswordOtp/verifyForgotPasswordOtpSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    register: registerReducer,
    verifyRegistrationOtp: verifyRegistrationOtpReducer,
    forgotPassword: forgotPasswordReducer,
    verifyForgotPasswordOtp: verifyForgotPasswordOtpReducer,
    resetPassword: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
