import "./manageAccessFile.css";

interface ManageAccessFileType {
  request: string;
  dateOfRequest: string;
  statusOfRequest: string;
}

const ManageAccessFile = ({
  request,
  dateOfRequest,
  statusOfRequest,
}: ManageAccessFileType) => {
  return (
    <div className="manage-access-file">
      <span>{request}</span>
      <span>{dateOfRequest}</span>
      <div
        className={
          statusOfRequest.toLowerCase() === "approved"
            ? "manage-access-green"
            : "manage-access-red"
        }
      >
        {statusOfRequest}
        {statusOfRequest.toLowerCase() === "approved" ? (
          <img src="/assets/check-mark-circle-icon.png" alt="" />
        ) : (
          <img src="/assets/cancel-circle-icon.png" alt="" />
        )}
      </div>
    </div>
  );
};

export default ManageAccessFile;
