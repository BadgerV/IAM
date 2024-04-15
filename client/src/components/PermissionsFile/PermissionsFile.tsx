import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./permissionsFile.css";
import { Link } from "react-router-dom";

interface PermissionsData {
  name: string;
  email: string;
  roleAssigned: string;
  status: string;
  selectAll: boolean;
}

const PermissionsData = ({
  name,
  email,
  roleAssigned,
  status,
  selectAll,
}: PermissionsData) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null); // Ref for the options container

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

  useEffect(() => {
    // Function to handle clicks outside the options container
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false); // Close the options container
      }
    };

    // Add event listener for clicks on the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="permissions-file">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIsSelected(e.target.checked)
        }
      />

      <div className="permissions-file-pic-and-name">
        <img src="/assets/sample-user.png" alt="User" />
        <div>
          <span className="permissions-name">{name}</span>
          <span className="permissions-email">{email}</span>
        </div>
      </div>

      <span>{roleAssigned}</span>
      <span>{status}</span>

      <div className="view-profile-cont">
        <div>
          <span>View Profile</span>
          <img src="/assets/link-square.png" alt="" />
        </div>

        <div
          className="permission-options-icon"
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <img
            src="/assets/options-dark.png"
            alt="Options"
            className="options-icon"
          />

          <div
            className="permissions-file-options-absolute-container"
            ref={optionsRef}
            style={isOptionsOpen ? { display: "flex" } : { display: "none" }}
          >
            <Link
              to="/edit-permissions"
              className="permissions-file-options-absolute-container-file"
            >
              <img src="/assets/file-download.png" alt="" />
              <span>Edit permissions</span>
            </Link>
            <Link
              to="/edit-permissions"
              className="permissions-file-options-absolute-container-file"
            >
              <img src="/assets/file-edit.png" alt="" />
              <span>Add to a group</span>
            </Link>
            <Link
              to="/edit-permissions"
              className="permissions-file-options-absolute-container-file"
            >
              <img src="/assets/link-square.png" alt="" />
              <span>Assign role</span>
            </Link>
            <Link
              to="/edit-permissions"
              className="permissions-file-options-absolute-container-file"
            >
              <img src="/assets/wifi-disconnected.png" alt="" />
              <span>Disable user</span>
            </Link>
            <Link
              to="/edit-permissions"
              className="permissions-file-options-absolute-container-file"
            >
              <img src="/assets/delete.png" alt="" />
              <span>Remove user</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsData;
