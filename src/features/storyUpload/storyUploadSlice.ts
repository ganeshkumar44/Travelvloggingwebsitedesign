import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadStoryApi } from "./storyUploadApi";
import type { StoryUploadArgs, StoryUploadState } from "./storyUploadTypes";

const initialState: StoryUploadState = {
  status: "idle",
  error: null,
  data: null,
};

function buildFormData(args: StoryUploadArgs): FormData {
  const formData = new FormData();
  formData.append("title", args.title);
  formData.append("description", args.description);
  formData.append("location", args.location || "");
  formData.append("tags", args.tags.join(","));

  if (args.file) {
    formData.append("file", args.file);
  }
  if (args.fileUrl.trim()) {
    formData.append("file_url", args.fileUrl.trim());
  }
  return formData;
}

export const uploadStory = createAsyncThunk<
  Awaited<ReturnType<typeof uploadStoryApi>>,
  StoryUploadArgs,
  { rejectValue: string }
>("storyUpload/uploadStory", async (args, { rejectWithValue }) => {
  try {
    return await uploadStoryApi(args.accessToken, buildFormData(args));
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Network error. Please try again.";
    return rejectWithValue(message);
  }
});

const storyUploadSlice = createSlice({
  name: "storyUpload",
  initialState,
  reducers: {
    clearStoryUploadError(state) {
      state.error = null;
    },
    resetStoryUploadState() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadStory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadStory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(uploadStory.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Request failed";
      });
  },
});

export const { clearStoryUploadError, resetStoryUploadState } =
  storyUploadSlice.actions;
export default storyUploadSlice.reducer;
