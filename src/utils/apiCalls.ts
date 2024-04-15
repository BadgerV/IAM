//importing axios
import axios from "axios";
import { LoginCredentials, SignupCredentials } from "./types";

const url = "http://localhost:8000/api/v1/";

const signupApiCall = async ({
  username,
  email,
  password,
}: SignupCredentials) => {
  const response = await axios.post(`${url}/auth/register`, {
    username,
    password,
    email,
  });

  return response;
};

const loginApiCall = async ({ username, password }: LoginCredentials) => {
  const response = await axios.post(`${url}/auth/login`, {
    username,
    password,
  });

  return response;
};

export default { signupApiCall, loginApiCall };
