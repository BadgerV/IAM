import { ChangeEvent, useState } from "react";
import "./permissionsDashboard.css";
import Select, {
  ControlProps,
  IndicatorSeparatorProps,
  OptionProps,
} from "react-select";
import OverviewFile from "../PermissionsFile/PermissionsFile";

interface Options {
  value: string;
  label: string;
}

interface PermissionsData {
  name: string;
  email: string;
  roleAssigned: string;
  status: string;
  img?: string;
}

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const PermissionsDashboard = () => {
  const [selectetdCategory, setSelectedCategory] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  const overviewFileData: PermissionsData[] = [
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
    },
    {
      name: "Emily Radiance",
      email: "Segunfoazan112@gmail.com",
      roleAssigned: "Administrator",
      status: "Active",
    },
  ];

  const customStyles = {
    
    control: (provided: any) => ({
      ...provided,
      border: "1px solid #ececec",

      minHeight: "2.5rem",
      borderRadius: "8px",
      fontSize: "0.85rem",
      color: "black",
      boxShadow: "none", // Remove box shadow
      "&:focus": {
        outline: "none", // Remove outline on focus
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none", // Remove the vertical line between indicator and text
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "0.85rem", // Set font size of dropdown options
    }),
  };

  return (
    <div className="permissions-dashboard">
      <span className="users-access-text">User's access and permission</span>

      <div className="permissions-dashboard-top">
        <div className="permissions-dashboaord-top-left">
          <span
            className={selectetdCategory === 1 ? "dashboard-nav-selected" : ""}
            onClick={() => setSelectedCategory(1)}
          >
            All users
          </span>
          <span
            className={selectetdCategory === 2 ? "dashboard-nav-selected" : ""}
            onClick={() => setSelectedCategory(2)}
          >
            Administrator
          </span>
          <span
            className={selectetdCategory === 3 ? "dashboard-nav-selected" : ""}
            onClick={() => setSelectedCategory(3)}
          >
            Manager
          </span>
          <span
            className={selectetdCategory === 4 ? "dashboard-nav-selected" : ""}
            onClick={() => setSelectedCategory(4)}
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
            styles={customStyles}
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
          {overviewFileData.map((file: PermissionsData) => {
            return <OverviewFile selectAll={selectAll} {...file} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PermissionsDashboard;
