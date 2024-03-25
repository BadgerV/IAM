import { useRef, useState, useEffect } from "react";
import EditPermissionFile from "../../components/EditPermissionFile/EditPermissionFile";
import "./editPermissions.css";

const EditPermissions = () => {
  const permissions = [1, 2, 3, 4, 5];
  const optionsRef = useRef(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [assignedRole, setAssignedRole] = useState("manager");

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
    <div className="edit-permissions-cont">
      <div className="edit-permissions">
        <div className="edit-permissions-header">
          <div className="edit-permissions-header-left">
            <img src="/assets/avatar-mini.png" alt="Avatar" />
            <div>
              <span className="edit-permissions-name">Emily Radiance</span>
              <span className="edit-permissions-email">
                Emilyradiance@gmail.com
              </span>
            </div>
          </div>
          <div className="edit-permissions-header-right">
            <span>View Profile</span>
            <img src="/assets/link-square-colored.png" alt="" />
          </div>
        </div>
        <div className="edit-permissions-content">
          <div className="edit-permissions-content-header">
            <div className="edit-permissions-content-header-left">
              <span>User</span>
            </div>
            <div
              className="edit-permissions-content-header-right"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
              <span>Administrator</span>
              <div className="edit-permission-absolute-container">
                <img src="/assets/arrow-down.png" alt="drop-down" />

                <div
                  className="edit-permission-absolute"
                  ref={optionsRef}
                  style={
                    isOptionsOpen ? { display: "flex" } : { display: "none" }
                  }
                >
                  <div onClick={() => setAssignedRole("admin")}>
                    <span>Administrator</span>
                    {assignedRole === "admin" && (
                      <img src="/assets/check-mark.png" alt="Check" />
                    )}
                  </div>
                  <div onClick={() => setAssignedRole("manager")}>
                    <span>Manager</span>
                    {assignedRole === "manager" && (
                      <img src="/assets/check-mark.png" alt="Check" />
                    )}
                  </div>
                  <div onClick={() => setAssignedRole("employee")}>
                    <span>Employee</span>
                    {assignedRole === "employee" && (
                      <img src="/assets/check-mark.png" alt="Check" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-permissions-content-content">
            {permissions.map(() => {
              return <EditPermissionFile />;
            })}
          </div>

          <div className="edit-permissions-bottom">
            <button>Save Chnages</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPermissions;
