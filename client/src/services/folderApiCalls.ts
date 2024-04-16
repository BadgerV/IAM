// import { RootState } from "../redux/store";
import axios from "axios";
import { RootState } from "../redux/store";
import { FolderDetails } from "../utils/types";

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

  return response;
};

const getFolderCall = async (id: number, token: string) => {
  const response = await axios.get(`${url}/folder/${id}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return response;
};

const updateFolderCall = async (
  id: number,
  name: string,
  description: string,
  token: string
) => {
  const response = await axios.put(
    `${url}/folder/${id}`,
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

const deleteFolderCall = async (id: number, token: string) => {
  const response = await axios.delete(`${url}/folder,${id}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return response;
};

//FOLDER ACCESS CALLS
const createFolderAccessCall = async (
  folderDetails: FolderDetails,
  token: string
) => {
  const response = await axios.post(
    `${url}/folder/access`,
    {
      folderDetails,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

const getFolderAccessByIDCall = async (id: number, token: string) => {
  const response = await axios.get(`${url}/folder/access/${id}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return response;
};

const getFolderAccessByFolderIDCall = async (
  folderId: number,
  token: string
) => {
  const response = await axios.get(`${url}/folder/access/folder/${folderId}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return response;
};

const updateFolderAccessCall = async (
  id: number,
  folderDetails: FolderDetails,
  token: string
) => {
  const response = await axios.put(
    `${url}/folder/access/${id}`,
    {
      folderDetails,
    },
    {
      headers: {
        authorization: `authorization ${token}`,
      },
    }
  );

  return response;
};

const deleteFolderAccessByIDCall = async (id: number, token: string) => {
  const repsonse = await axios.delete(`${url}/folder/access/${id}`, {
    headers: {
      authorization: `authorization ${token}`,
    },
  });

  return repsonse;
};

export default {
  getFoldersCall,
  createFolderCall,
  getFolderCall,
  updateFolderCall,
  deleteFolderCall,

  //folder access
  createFolderAccessCall,
  getFolderAccessByIDCall,
  getFolderAccessByFolderIDCall,
  updateFolderAccessCall,
  deleteFolderAccessByIDCall,
};
