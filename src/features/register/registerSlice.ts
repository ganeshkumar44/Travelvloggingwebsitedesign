import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  RegisterFieldErrors,
  RegisterFieldKey,
  RegisterRequest,
  RegisterResponse,
  RegisterState,
} from "./registerTypes";
import { registerApi } from "./registerApi";
import { setRegisterPendingOtpEmail } from "./registerSession";

const initialState: RegisterState = {
  status: "idle",
  apiError: null,
  fieldErrors: {},
  registeredEmail: null,
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>("register/registerUser", async (payload, { rejectWithValue }) => {
  try {
    return await registerApi(payload);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Registration failed. Please try again.";
    return rejectWithValue(message);
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterFieldErrors(state, action: PayloadAction<RegisterFieldErrors>) {
      state.fieldErrors = action.payload;
      state.apiError = null;
    },
    clearRegisterErrors(state) {
      state.fieldErrors = {};
      state.apiError = null;
    },
    clearRegisterFieldError(state, action: PayloadAction<RegisterFieldKey>) {
      const key = action.payload;
      if (key in state.fieldErrors) {
        delete state.fieldErrors[key];
      }
      state.apiError = null;
    },
    resetRegisterState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.apiError = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiError = null;
        state.fieldErrors = {};
        state.registeredEmail = action.payload.email;
        setRegisterPendingOtpEmail(action.payload.email);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.apiError =
          typeof action.payload === "string"
            ? action.payload
            : "Registration failed";
      });
  },
});

export const {
  setRegisterFieldErrors,
  clearRegisterErrors,
  clearRegisterFieldError,
  resetRegisterState,
} = registerSlice.actions;

export default registerSlice.reducer;
