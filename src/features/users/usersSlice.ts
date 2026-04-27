import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsersApi } from "./usersApi";
import type { UsersState } from "./usersTypes";

const initialState: UsersState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchUsers = createAsyncThunk<
  Awaited<ReturnType<typeof fetchUsersApi>>,
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await fetchUsersApi();
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.data = [];
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export default usersSlice.reducer;
