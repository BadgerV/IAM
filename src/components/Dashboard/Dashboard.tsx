import Folder from "../Folder/Folder";
import File from "../FIle/File";
import Select from "react-select";
import {
  IndicatorSeparatorProps,
  ControlProps,
  OptionProps,
} from "react-select";

import "./dashboard.css";
import { ChangeEvent, useState } from "react";

interface Options {
  value: string;
  label: string;
}

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

interface Data {
  fileName: string;
  name: string;
  email: string;
  size: string;
  lastModified: string;
  img: string;
}

const Dashboard = () => {
  const [selectAll, setSelectAll] = useState(false);
  const folders = [
    {
      folderName: "Development",
      noOfFiles: 17,
      fileSize: "1.3Gb",
      img: "/assets/folder-",
    },
    {
      folderName: "Data Cloud",
      noOfFiles: 20,
      fileSize: "6.3Gb",
      img: "/assets/folder-",
    },
    {
      folderName: "Game Development",
      noOfFiles: 172,
      fileSize: "190.3Gb",
      img: "/assets/folder-",
    },
  ];

  const [selectetdCategory, setSelectedCategory] = useState(1);

  const data: Data[] = [
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      img: "/assets/sample-user.png",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      img: "/assets/sample-user.png",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      img: "/assets/sample-user.png",
      size: "1.3MB",
      lastModified: "2-01-2024",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      img: "/assets/sample-user.png",
    },
  ];

  const customStyles = {
    control: (provided: ControlProps) => ({
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
    indicatorSeparator: (provided: IndicatorSeparatorProps) => ({
      ...provided,
      display: "none", // Remove the vertical line between indicator and text
    }),
    option: (provided: OptionProps) => ({
      ...provided,
      fontSize: "0.85rem", // Set font size of dropdown options
    }),
  };

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-top-upper">
          <span>Folders</span>

          <div className="dashboard-top-upper-right">
            <div className="show-all-button">
              <span>Show all</span>
              <img src="/assets/arrow-down.png" alt="arrow_down" />
            </div>

            <div className="uplaod-button">
              <span>Upload</span>
              <img src="/assets/cloud-upload.png" alt="cloud_icon" />
            </div>
          </div>
        </div>

        <div className="dashboard-folders">
          {folders.map((folder) => {
            return <Folder {...folder} />;
          })}
        </div>
      </div>
      <div className="dashboard-bottom">
        <span className="all-files-text">All Files</span>

        <div className="dashboard-nav">
          <div className="dashboard-nav-left">
            <span
              className={
                selectetdCategory === 1 ? "dashboard-nav-selected" : ""
              }
              onClick={() => setSelectedCategory(1)}
            >
              View All
            </span>
            <span
              className={
                selectetdCategory === 2 ? "dashboard-nav-selected" : ""
              }
              onClick={() => setSelectedCategory(2)}
            >
              Documents
            </span>
            <span
              className={
                selectetdCategory === 3 ? "dashboard-nav-selected" : ""
              }
              onClick={() => setSelectedCategory(3)}
            >
              PDFs
            </span>
            <span
              className={
                selectetdCategory === 4 ? "dashboard-nav-selected" : ""
              }
              onClick={() => setSelectedCategory(4)}
            >
              Images
            </span>
          </div>
          <div className="dashboard-nav-right">
            <div className="dashboard-input-cont">
              <img src="/assets/search.png" alt="Search" />
              <input type="text" placeholder="Search" />
            </div>

            <Select
              styles={customStyles}
              options={options}
              placeholder="Select"
            />
          </div>
        </div>

        <div className="dashboard-table-header">
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectAll(e.target.checked)
            }
          />
          <span>File name</span>
          <span>Uploaded By</span>
          <span>Size</span>
          <span>Last Modified</span>
        </div>

        <div className="dashboard-table-content">
          {data.map((propData) => {
            return <File {...propData} selectAll={selectAll} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
