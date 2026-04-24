import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import changePasswordReducer from "../features/changePassword/changePasswordSlice";
import deleteAccountReducer from "../features/deleteAccount/deleteAccountSlice";
import profileReducer from "../features/profile/profileSlice";
import registerReducer from "../features/register/registerSlice";
import verifyRegistrationOtpReducer from "../features/verifyRegistrationOtp/verifyRegistrationOtpSlice";
import forgotPasswordReducer from "../features/forgotPassword/forgotPasswordSlice";
import verifyForgotPasswordOtpReducer from "../features/verifyForgotPasswordOtp/verifyForgotPasswordOtpSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";
import storyUploadReducer from "../features/storyUpload/storyUploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    changePassword: changePasswordReducer,
    deleteAccount: deleteAccountReducer,
    profile: profileReducer,
    register: registerReducer,
    verifyRegistrationOtp: verifyRegistrationOtpReducer,
    forgotPassword: forgotPasswordReducer,
    verifyForgotPasswordOtp: verifyForgotPasswordOtpReducer,
    resetPassword: resetPasswordReducer,
    storyUpload: storyUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
