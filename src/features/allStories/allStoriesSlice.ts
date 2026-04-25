import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllStoriesApi } from "./allStoriesApi";
import type { AllStoriesState } from "./allStoriesTypes";

const initialState: AllStoriesState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchAllStories = createAsyncThunk<
  Awaited<ReturnType<typeof fetchAllStoriesApi>>,
  void,
  { rejectValue: string }
>("allStories/fetchAllStories", async (_, { rejectWithValue }) => {
  try {
    return await fetchAllStoriesApi();
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const allStoriesSlice = createSlice({
  name: "allStories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllStories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.status = "failed";
        state.data = [];
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export default allStoriesSlice.reducer;
