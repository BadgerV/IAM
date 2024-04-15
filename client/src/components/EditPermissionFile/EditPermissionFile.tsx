import { useState } from "react";
import "./editPermissionFile.css";

const EditPermissionFile = () => {
  const [isTrue, setIsTrue] = useState(false);
  return (
    <div className="edit-permission-file">
      <div className="edit-permission-file-left">
        <img src="/assets/edit-file.png" alt="File" />

        <div>
          <span className="edit-permission-file-big-text">Edit files</span>
          <span className="edit-permission-file-small-text">
            Allow access to edit and review all files
          </span>
        </div>
      </div>
      <div className="edit-permission-file-right">
        <div
          className="permission-input-slider"
          style={
            isTrue
              ? { backgroundColor: "#34c759" }
              : { backgroundColor: "#F2F2F7" }
          }
          onClick={() => setIsTrue(!isTrue)}
        >
          <span
            className="permission-input-circle"
            style={
              isTrue
                ? { left: "75%", color: "green" }
                : { left: "25%", color: "white" }
            }
          ></span>
        </div>
      </div>
    </div>
  );
};

export default EditPermissionFile;
