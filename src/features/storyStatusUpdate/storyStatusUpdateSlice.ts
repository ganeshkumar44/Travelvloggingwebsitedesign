import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patchStoryStatusApi } from "./storyStatusUpdateApi";
import type {
  StoryStatusUpdateArgs,
  StoryStatusUpdateState,
} from "./storyStatusUpdateTypes";
import { fetchAllStories } from "../allStories/allStoriesSlice";

const initialState: StoryStatusUpdateState = {
  status: "idle",
  error: null,
  message: null,
  pendingStoryId: null,
};

export const updateStoryStatus = createAsyncThunk<
  Awaited<ReturnType<typeof patchStoryStatusApi>>,
  StoryStatusUpdateArgs,
  { rejectValue: string }
>(
  "storyStatusUpdate/updateStoryStatus",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      const result = await patchStoryStatusApi(args.accessToken, {
        story_id: args.storyId,
        status: args.status,
      });
      void dispatch(fetchAllStories());
      return result;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Network error. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const storyStatusUpdateSlice = createSlice({
  name: "storyStatusUpdate",
  initialState,
  reducers: {
    clearStoryStatusUpdateError(state) {
      state.error = null;
    },
    clearStoryStatusUpdateMessage(state) {
      state.message = null;
    },
    resetStoryStatusUpdateState() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateStoryStatus.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
        state.pendingStoryId = action.meta.arg.storyId;
      })
      .addCase(updateStoryStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.message =
          typeof action.payload.message === "string" &&
          action.payload.message.trim()
            ? action.payload.message.trim()
            : null;
        state.pendingStoryId = null;
      })
      .addCase(updateStoryStatus.rejected, (state, action) => {
        state.status = "failed";
        state.pendingStoryId = null;
        state.message = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export const {
  clearStoryStatusUpdateError,
  clearStoryStatusUpdateMessage,
  resetStoryStatusUpdateState,
} = storyStatusUpdateSlice.actions;

export default storyStatusUpdateSlice.reducer;
