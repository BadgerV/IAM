import apiCalls from "../../utils/apiCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FileData, FileInitialState } from "../../utils/types";

const initialState: FileInitialState = {};

export const CreateFile = createAsyncThunk(
  "file/create-file",
  async (filedata: FileData, { getState, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", filedata.file);
    formData.append("file_name", filedata.file_name);
    formData.append("file_size", String(filedata.file_size)); // Convert file_size to string
    formData.append("folder_id", String(filedata.folder_id));
    formData.append("category_id", String(filedata.category_id));
    formData.append("description", String(filedata.description));

    try {
      const response = await apiCalls.createFileCall(formData, getState);

      console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
});

export default fileSlice.reducer;
