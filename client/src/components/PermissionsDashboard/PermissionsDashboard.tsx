import { ChangeEvent, useEffect, useState } from "react";
import "./permissionsDashboard.css";

import Select from "react-select";
import PermissionFile from "../PermissionsFile/PermissionsFile";

import { Options, PermissionsDataType } from "../../utils/types";
import { customStylesPermissions } from "../..//utils/helpers";
import { Link } from "react-router-dom";
import apiCalls from "../../utils/apiCalls";

//import from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const PermissionsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  const [users, setUsers] = useState<any[]>([]);

  //loading state
  const [userLoadingState, setUserLoadingState] = useState<boolean>(true);

  //get user role
  const userRole = useSelector((state: RootState) => state.auth.user.role);

  const [sortedArray, setSortedArray] = useState<PermissionsDataType[]>([]);

  const handleSortBasedOnRole = (category: string | null) => {
    const filteredArray = users.filter((data: PermissionsDataType) => {
      return data.role === category;
    });

    setSortedArray(filteredArray);
  };
  const fetchUsers = async () => {
    try {
      apiCalls.getUsersCall().then((res) => {
        setUserLoadingState(false);
        console.log(res.data);
        setUsers(res.data);
      });
    } catch (error) {
      setUserLoadingState(false);

      toast.error("Error fetching users", {
        position: "top-right",
      });
      console.error("Error fetching users:", error);
    }
  };

  //call the fecth functions when the oage loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="permissions-dashboard">
      <span className="users-access-text">User's access and permission</span>

      <div className="permissions-dashboard-top">
        <div className="permissions-dashboaord-top-left">
          <span
            className={selectedCategory === 1 ? "dashboard-nav-selected" : ""}
            onClick={() => {
              setSelectedCategory(1);
              setSortedArray([]);
            }}
          >
            All users
          </span>
          <span
            className={selectedCategory === 2 ? "dashboard-nav-selected" : ""}
            onClick={() => {
              setSelectedCategory(2);
              handleSortBasedOnRole("super_admin");
            }}
          >
            Administrator
          </span>
          <span
            className={selectedCategory === 3 ? "dashboard-nav-selected" : ""}
            onClick={() => {
              setSelectedCategory(3);
              handleSortBasedOnRole("manager");
            }}
          >
            Manager
          </span>
          <span
            className={selectedCategory === 4 ? "dashboard-nav-selected" : ""}
            onClick={() => {
              setSelectedCategory(4);
              handleSortBasedOnRole("employee");
            }}
          >
            Employee
          </span>
        </div>

        <div className="permissions-dashboard-top-right">
          <div className="permissions-input-cont">
            <img src="/assets/search.png" alt="Search" />
            <input type="text" placeholder="Search" />
          </div>

          {/* <Select
            styles={customStylesPermissions}
            options={options}
            placeholder="Select"
          /> */}

          {userRole === "super_admin" && (
            <Link to="/add-user" className="permissions-add-new-button">
              <span>Add new user</span>
              <img src="/assets/user-add.png" alt="" />
            </Link>
          )}
        </div>
      </div>

      <div className="permissions-dashboard-bottom">
        <div
          className="permissions-dashboard-table-header"
          style={
            userRole === "super_admin"
              ? {
                  gridTemplateColumns:
                    "minmax(20px, 0.5fr) minmax(300px, 6fr) minmax(200px, 3fr) minmax(100px, 3fr) minmax(15px, 0.5fr)",
                }
              : {
                  gridTemplateColumns:
                    "minmax(20px, 0.5fr) minmax(300px, 6fr) minmax(200px, 3fr) minmax(150px, 3fr)",
                }
          }
        >
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectAll(e.target.checked)
            }
          />
          <span>Name</span>
          <span>Role assigned</span>
          <span>Status</span>
          {userRole === "super_admin" && <div>&nbsp; </div>}
        </div>

        <div className="permissions-dashboard-table-content">
          {userLoadingState ? (
            <>Loading . . . </>
          ) : selectedCategory === 1 ? (
            users.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} data={file} key={index} />
            ))
          ) : selectedCategory === 2 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} data={file} key={index} />
            ))
          ) : selectedCategory === 3 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} data={file} key={index} />
            ))
          ) : selectedCategory === 4 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} data={file} key={index} />
            ))
          ) : selectedCategory === 2 ? (
            <span className="decline-span">There are no administrators</span>
          ) : selectedCategory === 3 ? (
            <span className="decline-span">There are no managers</span>
          ) : selectedCategory === 4 ? (
            <span className="decline-span">There are no employees</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PermissionsDashboard;
