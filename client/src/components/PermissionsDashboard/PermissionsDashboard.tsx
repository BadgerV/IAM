import { ChangeEvent, useState } from "react";
import "./permissionsDashboard.css";

import Select from "react-select";
import PermissionFile from "../PermissionsFile/PermissionsFile";

import { Options, PermissionsDataType } from "../../utils/types";
import { customStylesPermissions } from "../..//utils/helpers";

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const PermissionsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  const [sortedArray, setSortedArray] = useState<PermissionsDataType[]>([]);

  const handleSortBasedOnRole = (category: string | null) => {
    const filteredArray = overviewFileData.filter(
      (data: PermissionsDataType) => {
        return data.role === category;
      }
    );

    setSortedArray(filteredArray);
  };

  const overviewFileData: PermissionsDataType[] = [
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
      role: "admin",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
      role: "manager",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
      role: "admin",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
      role: "admin",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
      role: "admin",
    },
  ];

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
              handleSortBasedOnRole("admin");
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

          <Select
            styles={customStylesPermissions}
            options={options}
            placeholder="Select"
          />

          <button className="permissions-add-new-button">
            <span>Add new user</span>
            <img src="/assets/user-add.png" alt="" />
          </button>
        </div>
      </div>

      <div className="permissions-dashboard-bottom">
        <div className="permissions-dashboard-table-header">
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectAll(e.target.checked)
            }
          />
          <span>Name</span>
          <span>Role assigned</span>
          <span>Status</span>
          <div>&nbsp; </div>
        </div>

        <div className="permissions-dashboard-table-content">
          {selectedCategory === 1 ? (
            overviewFileData.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 2 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 3 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} {...file} key={index} />
            ))
          ) : selectedCategory === 4 && sortedArray.length > 0 ? (
            sortedArray.map((file: PermissionsDataType, index) => (
              <PermissionFile selectAll={selectAll} {...file} key={index} />
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
