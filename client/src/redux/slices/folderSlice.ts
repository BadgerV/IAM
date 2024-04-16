import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FolderInitialState } from "../../utils/types";
import folderApiCalls from "../../services/folderApiCalls";

const initialState: FolderInitialState = {
  fetchedFolders: null,
};

export const GetFolders = createAsyncThunk("folder/get-folders", async () => {
  const response = await folderApiCalls.getFoldersCall();

  return response.data;
});

export const CreateFolder = createAsyncThunk(
  "folder/create-folders",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await folderApiCalls.createFolderCall(
        name,
        description,
        getState
      );

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetFolders.fulfilled, (state, action) => {
      state.fetchedFolders = action.payload;
    });
  },
});

export default folderSlice.reducer;
