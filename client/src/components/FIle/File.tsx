import { useState, useRef, useEffect, ChangeEvent } from "react";
import "./file.css";
import { FileData } from "../../utils/types";
import { formatDate } from "../../utils/helpers";
import React from "react";
import axios from "axios";
import fileApiCalls from "../../services/fileApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { GetAllFiles } from "../../redux/slices/fileSlice";

const File: React.FC<{ file: FileData; selectAll: any }> = ({
  file,
  selectAll,
}) => {
  const {
    id,
    user_id,
    folder_id,
    category_id,
    file_name,
    file_size,
    description,
    category_name,
    cloud_url,
    folder_name,
    owner_username,
    created_at,
    updated_at,
  } = file;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //get token frokm state
  const token = useSelector((state: RootState) => state.auth.user.token);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

  const handleDownload = async () => {
    await fileApiCalls.getFileCall(id, token);
  };

  //declaring dispatch
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    setDeleteLoading(true);
    await fileApiCalls.deleteFileCall(id, token).then((res: any) => {
      setDeleteLoading(false);

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right", // Adjust position if needed
        });

        //call all the files from the backend again
        dispatch(GetAllFiles(token));
      } else {
        toast.error("Something went wrong", {
          position: "top-right", // Adjust position if needed
        });
      }
    });
  };

  //check if delete loading is true and close the options
  useEffect(() => {
    if (deleteLoading) {
      setIsOptionsOpen(false);
    }
  }, [deleteLoading]);

  return (
    <div className="file">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIsSelected(e.target.checked)
        }
      />

      <div className="filename-container">
        <img src="/assets/file.png" alt="File" />
        <span> {file_name} </span>
      </div>

      <div className="uploaded-by-cont">
        <div>
          {/* <span className="file-name-text">{file_name}</span> */}
          <span className="file-email-text">{owner_username}</span>
        </div>
      </div>

      <span className="file-size-text">{file_size}</span>

      <div className="last-modified-and-options">
        <span className="file-last-modified-text">
          {formatDate(updated_at)}
        </span>
        <div className="file-options">
          <img
            src="/assets/options-dark.png"
            alt="Options"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          />

          <div
            className="file-options-absolute-container"
            ref={optionsRef}
            style={isOptionsOpen ? { display: "flex" } : { display: "none" }}
          >
            <div onClick={handleDownload}>
              <img src="/assets/file-download.png" alt="" />
              <span>Downlaod</span>
            </div>
            <div>
              <img src="/assets/file-edit.png" alt="" />
              <span>Rename</span>
            </div>
            <div>
              <img src="/assets/link-square.png" alt="" />
              <span>Open in browser</span>
            </div>
            <div>
              <img src="/assets/wifi-disconnected.png" alt="" />
              <span>Make available offline</span>
            </div>
            <div onClick={handleDelete}>
              <img src="/assets/delete.png" alt="" />
              <span>Delete file</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default File;
