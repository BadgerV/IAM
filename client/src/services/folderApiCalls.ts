// import { RootState } from "../redux/store";
import axios from "axios";
import { RootState } from "../redux/store";

const url = "http://localhost:8000/api/v1";

const getFoldersCall = async () => {
  const response = await axios.get(`${url}/folder`);

  return response;
};

const createFolderCall = async (
  name: string,
  description: string,
  getState: any
) => {
  const token = (getState() as RootState).auth.user.token;

  const response = await axios.post(
    `${url}/folder`,
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

  console.log(response);

  return response;
};
export default { getFoldersCall, createFolderCall };
