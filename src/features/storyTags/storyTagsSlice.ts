import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStoryTagsApi } from "./storyTagsApi";
import type { StoryTagsState } from "./storyTagsTypes";

const initialState: StoryTagsState = {
  status: "idle",
  error: null,
  items: [],
};

export const fetchStoryTags = createAsyncThunk<
  Awaited<ReturnType<typeof fetchStoryTagsApi>>,
  void,
  { rejectValue: string }
>("storyTags/fetchStoryTags", async (_, { rejectWithValue }) => {
  try {
    return await fetchStoryTagsApi();
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const storyTagsSlice = createSlice({
  name: "storyTags",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStoryTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStoryTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchStoryTags.rejected, (state, action) => {
        state.status = "failed";
        state.items = [];
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export default storyTagsSlice.reducer;
