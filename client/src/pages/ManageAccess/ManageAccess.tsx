import { useEffect, useState } from "react";
import "./manageAccess.css";
import ManageAccessFile from "../../components/ManageAccessFile/ManageAccessFile";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import requestAccessApiCalls from "../../services/requestAccessApiCalls";

const ManageAccess = () => {
  const [selectetdCategory, setSelectedCategory] = useState(1);

  const [requests, setRequests] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const role = useSelector((state: RootState) => state.auth.user.role);
  const token = useSelector((state: RootState) => state.auth.user.token);

  const [getrequestAgain, setGetRequestAgain] = useState(0);

  const getAllRequests = async () => {
    setLoadingState(true);
    const res = requestAccessApiCalls.getAllAccessRequests(token);

    setRequests((await res).data);

    setLoadingState(false);
  };

  useEffect(() => {
    getAllRequests();
  }, [getrequestAgain]);

  useEffect(() => {
    if (role === "super_admin" || role === "admin") {
      getAllRequests();
    }
  }, []);

  return (
    <div className="manage-access">
      {loadingState ? (
        <>Loading . . . . </>
      ) : (
        <div className="manage-access-bottom">
          <span className="manage-access-bottom-title">Request History</span>
          {/* <div className="manage-access-nav">
          <span
            className={
              selectetdCategory === 1 ? "manage-access-nav-selected" : ""
            }
            onClick={() => setSelectedCategory(1)}
          >
            All
          </span>
          <span
            className={
              selectetdCategory === 2 ? "manage-access-nav-selected" : ""
            }
            onClick={() => setSelectedCategory(2)}
          >
            Files
          </span>
          <span
            className={
              selectetdCategory === 3 ? "manage-access-nav-selected" : ""
            }
            onClick={() => setSelectedCategory(3)}
          >
            Folders
          </span>
        </div> */}

          <div className="manage-access-table">
            <div className="manage-access-table-header">
              <span>Request</span>
              <span>Reason for request</span>
              <span>Date of Request</span>
              <span>Status of Request</span>
            </div>
            <div className="manage-access-table-content">
              {requests.map((data, index) => {
                return (
                  <ManageAccessFile
                    {...data}
                    key={index}
                    setGetRequestAgain={setGetRequestAgain}
                    setLoading={setLoadingState}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccess;
