import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assuming these imports and definitions are correct
import apiCalls from "../../utils/apiCalls";
import fileApiCalls from "../../services/fileApiCalls";
import requestAccessApiCalls from "../../services/requestAccessApiCalls";
import { formatDate } from "../../utils/helpers";
import { RootState } from "../../redux/store";
import "./manageAccessFile.css";

// Correctly defined interfaces above

const ManageAccessFile: React.FC<any> = ({
  user_id,
  file_id,
  status,
  created_at,
  reason,
  id,
  setGetRequestAgain,
}) => {
  const [loadingState, setLoadingState] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<any>(null);

  let number = 1;

  const token = useSelector((state: RootState) => state.auth.user.token);
  const role = useSelector((state: RootState) => state.auth.user.role);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiCalls.getUserCall(user_id);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const getFile = async () => {
      try {
        const res = await fileApiCalls.getFileCall(file_id, token);
        setFile(res.data);
      } catch (error) {
        console.error("Failed to fetch file:", error);
      }
    };

    getUser();
    getFile();
  }, [user_id, file_id, token]);

  useEffect(() => {
    if (user && file) {
      setLoadingState(false);
    }
  }, [user, file]);

  // Define changeStatusOfRequest and other necessary code...
  const changeStatusOfRequest = async () => {
    let theStatus;
    try {
      console.log(id, file_id, user_id, !status, reason);
      const accessRequest = await 
      // Assuming id, file_id, user_id, status, reason, and token are defined elsewhere
      requestAccessApiCalls
        .updateRequestAccess(id, file_id, user_id, !status, reason, token)
        .then((res) => {
          if (res) {
            toast.success("Permission updated successfully", {
              position: "top-right",
            });

            setGetRequestAgain(number++); // Assuming this function sets a state to re-fetch data
          }
        });
    } catch (error) {
      console.error(error); // It's good to log the actual error to the console for debugging
      toast.error("Error updating permission", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="manage-access-file">
      {loadingState ? (
        <>Loading . . . .</>
      ) : (
        <>
          <span>{`${user.username} requested for file ${file.file_name}`}</span>
          <span>{formatDate(created_at)}</span>
          <span>{reason}</span>
          <button
            className={status ? "manage-access-green" : "manage-access-red"}
            style={{ cursor: role === "super_admin" ? "pointer" : "default" }}
            onClick={role === "super_admin" ? changeStatusOfRequest : undefined}
          >
            {status ? (
              <>
                <img src="/assets/check-mark-circle-icon.png" alt="" />
                <span>
                  {role === "super_admin" ? "Remove Access" : "Approved"}
                </span>
              </>
            ) : (
              <>
                <img src="/assets/cancel-circle-icon.png" alt="" />
                <span>
                  {role === "super_admin" ? "Approve" : "Not approved"}
                </span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default ManageAccessFile;
