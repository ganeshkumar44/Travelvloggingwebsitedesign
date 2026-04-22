import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DeleteAccountRequestBody, DeleteAccountState } from "./deleteAccountTypes";
import { deleteAccountApi } from "../auth/authApi";

const initialState: DeleteAccountState = {
  status: "idle",
  error: null,
};

export const deleteAccount = createAsyncThunk<
  Awaited<ReturnType<typeof deleteAccountApi>>,
  {
    accessToken: string;
    body: DeleteAccountRequestBody;
  },
  { rejectValue: string }
>("deleteAccount/deleteAccount", async ({ accessToken, body }, { rejectWithValue }) => {
  try {
    return await deleteAccountApi(accessToken, body);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState,
  reducers: {
    clearDeleteAccountError(state) {
      state.error = null;
    },
    resetDeleteAccountState() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export const { clearDeleteAccountError, resetDeleteAccountState } =
  deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
