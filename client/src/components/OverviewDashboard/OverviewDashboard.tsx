import { ChangeEvent, useState } from "react";
import Folder from "../Folder/Folder";
import "./overviewDashboard.css";
import OverviewFile from "../OverviewFile/OverviewFile";
import RecentActivity from "../RecentActivity/RecentActivity";

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

  const overviewData = [
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      img: "/assets/avatar-mini.png",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      img: "/assets/avatar-mini.png",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      img: "/assets/avatar-mini.png",
    },
    {
      name: "Emily Raidance",
      email: "Emilyradiance@gmail.com",
      status: "Active",
      img: "/assets/avatar-mini.png",
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

  const [selectetdCategory, setSelectedCategory] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  return (
    <div className="overview-dashboard">
      <div className="overview-dashboard-top">
        {boxes.map((box) => {
          return <Folder {...box} />;
        })}
      </div>
      <div className="overview-dashboard-middle">
        <span className="users-access-text">User's access permissions</span>

        <div className="overview-roles">
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
            {overviewData.map((data) => {
              return <OverviewFile {...data} selectAll={selectAll} />;
            })}
          </div>
        </div>
        <div className="overview-dashboard-bottom-right">
          <span className="recent-activities-text">Recent Activites</span>

          <div className="recent-activities">
            {recentActivitiesData.map((activity) => {
              return <RecentActivity {...activity} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
