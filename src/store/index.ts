import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import registerReducer from "../features/register/registerSlice";
import verifyRegistrationOtpReducer from "../features/verifyRegistrationOtp/verifyRegistrationOtpSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    verifyRegistrationOtp: verifyRegistrationOtpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
