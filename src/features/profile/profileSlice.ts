import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProfileUpdateState, UpdateProfileRequest } from "./profileTypes";
import { updateProfileApi } from "../auth/authApi";

const initialState: ProfileUpdateState = {
  status: "idle",
  error: null,
};

export const updateProfile = createAsyncThunk<
  Awaited<ReturnType<typeof updateProfileApi>>,
  { accessToken: string; body: UpdateProfileRequest },
  { rejectValue: string }
>("profile/updateProfile", async ({ accessToken, body }, { rejectWithValue }) => {
  try {
    return await updateProfileApi(accessToken, body);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearUpdateError(state) {
      state.error = null;
    },
    resetUpdateState() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Update failed";
      });
  },
});

export const { clearUpdateError, resetUpdateState } = profileSlice.actions;
export default profileSlice.reducer;
