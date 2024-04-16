//importing axios
import axios from "axios";
import {
  CategoryAccessData,
  // FileData,
  LoginCredentials,
  SignupCredentials,
} from "./types";
import { RootState } from "../redux/store";

const url = "http://localhost:8000/api/v1";

//AUTH CALLS
const signupApiCall = async ({
  username,
  email,
  password,
}: SignupCredentials) => {
  const response = await axios.post(`${url}/auth/register`, {
    username: username,
    password: password,
    email: email,
    role: "employee",
    is_active: true,
    is_admin: true,
  });

  return response;
};

const loginApiCall = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(`${url}/auth/signin`, {
    email,
    password,
  });

  return response;
};

//CATEGORY CALLS
const createCategoryCall = async (
  name: string,
  description: string,
  getState: any
) => {
  const token = (getState() as RootState).auth.user.token;
  const response = await axios.post(
    `${url}/category`,
    {
      name,
      description,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

const getCategoriesCall = async () => {
  const response = await axios.get(`${url}/category`);
  return response;
};

const getCategoryByIDCall = async (id: number) => {
  const response = axios.get(`${url}/category/${id}`);

  return response;
};

const updateCategoryCall = async (
  id: number,
  name: string,
  description: string,
  getState: any
) => {
  const token = (getState() as RootState).auth.user.token;

  const response = axios.put(
    `${url}/category/${id}`,
    {
      name,
      description,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};
const deleteCategoryCall = async (id: number, getState: any) => {
  const token = (getState() as RootState).auth.user.token;

  const response = axios.delete(
    `${url}/category/${id}`,

    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

//CATEGORY ACCESS CALLS
const createCategoryAccessCall = async (
  { category_id, user_id, can_read, can_write, can_delete }: CategoryAccessData,
  getState: any
) => {
  const token = (getState() as RootState).auth.user.token;
  const response = await axios.post(
    `${url}/category/access/`,
    {
      category_id,
      user_id,
      can_read,
      can_write,
      can_delete,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

const getCategoryAccessByIdCall = async (id: number) => {
  const response = await axios.get(`${url}/category/access/${id}`);

  return response;
};

const getCategoryAccessByCategoryIdCall = async (categoryId: number) => {
  const response = await axios.get(
    `${url}/category/access/getCategoryByID/${categoryId}`
  );

  return response.data;
};

const updateCategoryAccessCall = async (
  { category_id, user_id, can_read, can_write, can_delete }: CategoryAccessData,
  getState: any
) => {
  const token = (getState as RootState).auth.user.token;

  const respnse = await axios.put(
    `${url}/category/access/${category_id}`,
    {
      category_id,
      user_id,
      can_read,
      can_delete,
      can_write,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return respnse;
};

const deleteCategoryAccessByIDCall = async (id: number, getState: any) => {
  const token = (getState as RootState).auth.user.token;

  const response = await axios.delete(`${url}/category/access/${id}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return response;
};

//FILE CALLS
const createFileCall = async (
  { file_name, file_size, folder_id, category_id, description }: any,
  { getState }: any
) => {
  const token = (getState as RootState).auth.user.token;
  const response = await axios.post(
    `${url}/category/file/}`,
    {
      file_name,
      file_size,
      folder_id,
      category_id,
      description,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

export default {
  signupApiCall,
  loginApiCall,

  createCategoryCall,
  getCategoriesCall,
  getCategoryByIDCall,
  updateCategoryCall,
  deleteCategoryCall,

  createCategoryAccessCall,
  getCategoryAccessByIdCall,
  getCategoryAccessByCategoryIdCall,
  updateCategoryAccessCall,
  deleteCategoryAccessByIDCall,

  createFileCall,
};
