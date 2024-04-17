import Folder from "../Folder/Folder";
import File from "../FIle/File";
import Select from "react-select";

import "./dashboard.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Data, FileData, Options } from "../../utils/types";
import { customStyles } from "../../utils/helpers";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

//import from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

import fileApiCalls from "../../services/fileApiCalls";
import folderApiCalls from "../../services/folderApiCalls";

const options: Options[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const Dashboard = () => {
  const [selectAll, setSelectAll] = useState(false);

  //loading states
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [folderLoadingState, setFolderLoadingState] = useState<boolean>(true);

  // const files = useSelector((state: RootState) => state.file.files);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState<any[]>([]);

  //get token from state
  const token = useSelector((state: RootState) => state.auth.user.token);

  //get role from state
  const userRole: string = useSelector(
    (state: RootState) => state.auth.user.role
  );

  console.log(userRole);

  const getAllFiles = async () => {
    try {
      const res = await fileApiCalls.getAllFilesCall(token);
      setFiles(res.data);
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      toast.error("Error fetching files", {
        position: "top-right",
      });
    }
  };

  const getFolders = async () => {
    try {
      const res = await folderApiCalls.getFoldersCall();
      setFolders(res.data);
      setFolderLoadingState(false);
    } catch (error) {
      console.log(error);
      setFolderLoadingState(false);
      toast.error("Error fetching files", {
        position: "top-right",
      });
    }
  };

  //call the getAllFiles method at intialization
  useEffect(() => {
    getAllFiles();
    getFolders();
  }, []);

  useEffect(() => {
    console.log(files);
  }, [files]);

  //correct the loading state
  useEffect(() => {
    if (files) {
      setLoadingState(false);
    }
  }, [files]);

  const [sortedArray, setSortedArray] = useState<Data[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(1);

  const data: Data[] = [
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "document",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",

      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
    {
      fileName: "Resource Management",
      name: "Emily Radiance",
      email: "emilyradiance94@gmail.com",
      size: "1.3MB",
      lastModified: "2-01-2024",
      type: "pdf",
    },
  ];

  const handleSortBasedOnType = (type: string) => {
    const filteredArray = data.filter((data: Data) => {
      return data.type === type;
    });
    setSortedArray(filteredArray);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-folder-collection">
          <div className="dashboard-top-upper">
            <span>Folders</span>

            <div className="dashboard-top-upper-right">
              <Link to="/folder" className="show-all-button">
                <span>Show all</span>
                <img src="/assets/arrow-down.png" alt="arrow_down" />
              </Link>

              {(userRole === "super_admin" ||
                userRole === "admin" ||
                userRole === "manager") && (
                <>
                  <div className="uplaod-button">
                    <Link to="/file-upload" className="dashboard-link">
                      Upload
                    </Link>
                    <img src="/assets/cloud-upload.png" alt="cloud_icon" />
                  </div>

                  <div className="uplaod-button">
                    <Link to="/folder/add" className="dashboard-link">
                      Add new folder
                    </Link>
                    <img src="/assets/cloud-upload.png" alt="cloud_icon" />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="dashboard-folders">
            {folderLoadingState ? (
              <>Loading . . . . </>
            ) : (
              folders.map((box, index) => {
                return <Folder {...box} key={index} />;
              })
            )}
          </div>
        </div>

        <div className="dashboard-folder-collection">
          {/* <div className="dashboard-top-upper">
            <span>Categories</span>

            <div className="dashboard-top-upper-right">
              <Link to="/folder" className="show-all-button">
                <span>Show all</span>
                <img src="/assets/arrow-down.png" alt="arrow_down" />
              </Link>
            </div>
          </div> */}
          {/* <div className="dashboard-folders">
            {categories.map((folder, i) => {
              return (
                <Folder
                  id={0}
                  name={""}
                  description={""}
                  created_at={""}
                  updated_at={""}
                  {...folder}
                  key={i}
                />
              );
            })}
          </div> */}
        </div>
      </div>
      <div className="dashboard-bottom">
        <span className="all-files-text">All Files</span>

        <div className="dashboard-nav">
          <div className="dashboard-nav-left">
            <span
              className={selectedCategory === 1 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(1);
                setSortedArray([]);
              }}
            >
              View All
            </span>
            <span
              className={selectedCategory === 2 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(2);
                handleSortBasedOnType("document");
              }}
            >
              Documents
            </span>
            <span
              className={selectedCategory === 3 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(3);
                handleSortBasedOnType("pdf");
              }}
            >
              PDFs
            </span>
            <span
              className={selectedCategory === 4 ? "dashboard-nav-selected" : ""}
              onClick={() => {
                setSelectedCategory(4);
                handleSortBasedOnType("image");
              }}
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

        {loadingState ? (
          <>Loading . . .</>
        ) : (
          <div className="dashboard-table-content">
            {selectedCategory === 1 ? (
              files?.map((file: FileData, index: number) => (
                <File selectAll={selectAll} file={file} key={index} />
              ))
            ) : selectedCategory === 2 && files!.length > 0 ? (
              files?.map((file: FileData, index: number) => (
                <File selectAll={selectAll} file={file} key={index} />
              ))
            ) : selectedCategory === 3 && files!.length > 0 ? (
              files?.map((file: FileData, index: number) => (
                <File selectAll={selectAll} file={file} key={index} />
              ))
            ) : selectedCategory === 4 && files!.length > 0 ? (
              files?.map((file: FileData, index: number) => (
                <File selectAll={selectAll} file={file} key={index} />
              ))
            ) : selectedCategory === 2 ? (
              <span className="decline-span">There are no documents</span>
            ) : selectedCategory === 3 ? (
              <span className="decline-span">There are no PDFs</span>
            ) : selectedCategory === 4 ? (
              <span className="decline-span">There are no images</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
