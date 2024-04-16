// import apiCalls from "../../utils/apiCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FileInitialState } from "../../utils/types";
import fileApiCalls from "../../services/fileApiCalls";

const initialState: FileInitialState = {
  files: null,
};

// export const CreateFile = createAsyncThunk(
//   "file/create-file",
//   async (filedata: FileData, { getState, rejectWithValue }) => {
//     const formData = new FormData();
//     formData.append("file", filedata.file);
//     formData.append("file_name", filedata.file_name);
//     formData.append("file_size", String(filedata.file_size)); // Convert file_size to string
//     formData.append("folder_id", String(filedata.folder_id));
//     formData.append("category_id", String(filedata.category_id));
//     formData.append("description", String(filedata.description));

//     try {
//       const response = await apiCalls.createFileCall(formData, getState);

//       console.log(response.data);

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const GetAllFiles = createAsyncThunk(
  "files/get-all-files",
  async (token: string) => {
    const response = await fileApiCalls.getAllFilesCall(token);

    return response.data;
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (buidlers) => {
    buidlers.addCase(GetAllFiles.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});

export default fileSlice.reducer;
