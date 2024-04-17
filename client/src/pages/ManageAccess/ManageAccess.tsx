import { useState } from "react";
import "./manageAccess.css";
import ManageAccessFile from "../../components/ManageAccessFile/ManageAccessFile";

const ManageAccess = () => {
  const [selectetdCategory, setSelectedCategory] = useState(1);

  const demoData = [
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Approved",
    },
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Approved",
    },
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Declined",
    },
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Approved",
    },
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Declined",
    },
    {
      request: "Manging resouces by Emily Radiance",
      dateOfRequest: "2-01-2024",
      statusOfRequest: "Approved",
    },
  ];

  return (
    <div className="manage-access">
      
      <div className="manage-access-bottom">
        <span className="manage-access-bottom-title">Request History</span>
        <div className="manage-access-nav">
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
        </div>

        <div className="manage-access-table">
          <div className="manage-access-table-header">
            <span>Request</span>
            <span>Date of Request</span>
            <span>Status of Request</span>
          </div>
          <div className="manage-access-table-content">
            {demoData.map((data, index) => {
              return <ManageAccessFile {...data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccess;
