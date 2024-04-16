import { ChangeEvent, useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import File from "../../components/FIle/File";
import "./filesPage.css";
import { FileData } from "../../utils/types";

const FilesPage = () => {
  // Loading state
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const folder = "Overview";

  // Get files from Redux store
  const allFiles = useSelector((state: RootState) => state.file.files);

  useEffect(() => {
    if (allFiles) {
      setLoadingState(false);
    }
  }, [allFiles]);

  return (
    <div className="file-page-container">
      {loadingState ? (
        <div>Loading . . .</div>
      ) : (
        <div className="file-page">
          <span className="file-page-text">Files from {folder} folder</span>

          <div className="file-page-bottom">
            <div className="file-page-table-header">
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

            <div className="file-page-table-content">
              {allFiles?.map((file: FileData, index: number) => (
                <File selectAll={selectAll} file={file} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesPage;
