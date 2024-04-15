import { ChangeEvent, useState } from "react";
import Folder from "../Folder/Folder";
import "./overviewDashboard.css";
import OverviewFile from "../OverviewFile/OverviewFile";
import RecentActivity from "../RecentActivity/RecentActivity";
import { OverviewData } from "@/utils/types";

const OverviewDashboard = () => {
  const boxes = [
    {
      folderName: "Development",
      noOfFiles: 17,
      img: "/assets/user-group-",
    },
    {
      folderName: "Pending Requests",
      noOfFiles: 5,
      img: "/assets/clock-",
    },
    {
      folderName: "Restricted",
      noOfFiles: 2,
      img: "/assets/file-block-",
    },
  ];

  const overviewData: OverviewData[] = [
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      role: "manager",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      role: "employee",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      role: "manager",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      role: "manager",
    },
  ];

  const recentActivitiesData = [
    {
      image: "/assets/avatar-mini.png",
      activityText: "Emily Radiance was made administrator",
      timeAgo: "2 mins",
    },
    {
      image: "/assets/avatar-mini.png",
      activityText: "Emily Radiance was made administrator",
      timeAgo: "2 mins",
    },
    {
      image: "/assets/avatar-mini.png",
      activityText: "Emily Radiance was made administrator",
      timeAgo: "2 mins",
    },
    {
      image: "/assets/avatar-mini.png",
      activityText: "Emily Radiance was made administrator",
      timeAgo: "2 mins",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [sortedArray, setSortedArray] = useState<OverviewData[]>([]);

  const handleSortBasedOnRole = (category: string | null) => {
    const filteredArray = overviewData.filter((data: OverviewData) => {
      return data.role === category;
    });

    setSortedArray(filteredArray);
  };

  return (
    <div className="overview-dashboard">
      <div className="overview-dashboard-top">
        {boxes.map((box, index) => {
          return <Folder {...box} key={index} />;
        })}
      </div>
      <div className="overview-dashboard-middle">
        <span className="users-access-text">User's access permissions</span>

        <div className="overview-roles">
          <span
            className={selectedCategory === 1 ? "dashboard-nav-selected" : ""}
            onClick={() => {
              setSelectedCategory(1);
              setSortedArray([]);
              handleSortBasedOnRole(null);
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
      </div>

      <div className="overview-dashboard-bottom">
        <div className="overview-dashboard-bottom-left">
          <div className="overview-dashboard-table-header">
            <input
              type="checkbox"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectAll(e.target.checked)
              }
            />
            <span>Name</span>
            <span>Status</span>
            <span>&nbsp;</span>
          </div>
          <div className="overview-dashboard-table-content">
            {selectedCategory === 1 ? (
              overviewData.map((file: OverviewData, index) => (
                <OverviewFile selectAll={selectAll} {...file} key={index} />
              ))
            ) : selectedCategory === 2 && sortedArray.length > 0 ? (
              sortedArray.map((file: OverviewData, index) => (
                <OverviewFile selectAll={selectAll} {...file} key={index} />
              ))
            ) : selectedCategory === 3 && sortedArray.length > 0 ? (
              sortedArray.map((file: OverviewData, index) => (
                <OverviewFile selectAll={selectAll} {...file} key={index} />
              ))
            ) : selectedCategory === 4 && sortedArray.length > 0 ? (
              sortedArray.map((file: OverviewData, index) => (
                <OverviewFile selectAll={selectAll} {...file} key={index} />
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
        <div className="overview-dashboard-bottom-right">
          <span className="recent-activities-text">Recent Activites</span>

          <div className="recent-activities">
            {recentActivitiesData.map((activity, index) => {
              return <RecentActivity {...activity} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
