//importing axios
import axios from "axios";
import {
  // FileData,
  LoginCredentials,
  SignupCredentials,
} from "./types";

const url = "http://localhost:8000/api/v1";

//AUTH CALLS
const signupApiCall = async (
  { username, email, password, role = "employee" }: SignupCredentials,
  token: string
) => {
  const response = await axios.post(
    `${url}/auth/register`,
    {
      username: username,
      password: password,
      email: email,
      role: role,
      is_active: true,
      is_admin: false,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

const loginApiCall = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(`${url}/auth/signin`, {
    email,
    password,
  });

  return response;
};

const getUsersCall = async () => {
  const response = await axios.get(`${url}/auth/users`);

  return response;
};

export default {
  signupApiCall,
  loginApiCall,
  getUsersCall,
};
