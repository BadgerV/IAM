import apiCalls from "../../utils/apiCalls";
import { CategoryAccessData, CategoryInitialState } from "../../utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CategoryInitialState = {
  fetchedCategories: [],
};

export const CreateCategory = createAsyncThunk(
  "category/create-category",
  async (
    { name, description }: { name: string; description: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await apiCalls.createCategoryCall(
        name,
        description,
        getState
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const GetCategories = createAsyncThunk(
  "category/get-categories",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await apiCalls.getCategoriesCall();

      console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const GetCategoryById = createAsyncThunk(
  "category/get-category-by-id",
  async (id: number, { rejectWithValue }: any) => {
    try {
      const response = await apiCalls.getCategoryByIDCall(id);

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const UpdateCategory = createAsyncThunk(
  "category/update/category",
  async (
    {
      id,
      name,
      description,
    }: { name: string; id: number; description: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await apiCalls.updateCategoryCall(
        id,
        name,
        description,
        getState
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const DeleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const response = await apiCalls.deleteCategoryCall(id, getState);

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const CreateCategoryAccess = createAsyncThunk(
  "category/create-category-access",
  async (
    {
      category_id,
      user_id,
      can_read,
      can_write,
      can_delete,
    }: CategoryAccessData,
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await apiCalls.createCategoryAccessCall(
        { category_id, user_id, can_read, can_write, can_delete },
        getState
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const GetCategoryAccessById = createAsyncThunk(
  "category/get-category-access-by-id",
  async (id: number) => {
    const response = await apiCalls.getCategoryAccessByCategoryIdCall(id);

    return response;
  }
);

export const GetCategoryAccessByCategoryId = createAsyncThunk(
  "category/get-category-by-category-id",
  async (id: number) => {
    const response = await apiCalls.getCategoryAccessByCategoryIdCall(id);
    return response;
  }
);

export const UpdateCategoryAccess = createAsyncThunk(
  "category/update-category-access",
  async (
    {
      category_id,
      user_id,
      can_read,
      can_write,
      can_delete,
    }: CategoryAccessData,
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await apiCalls.updateCategoryAccessCall(
        { category_id, user_id, can_read, can_write, can_delete },
        getState
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategories.fulfilled, (state, action) => {
      state.fetchedCategories = action.payload;
    });
  },
});

export default categorySlice.reducer;
