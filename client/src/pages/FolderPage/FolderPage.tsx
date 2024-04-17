import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import "./folderPage.css";
import { useEffect, useState } from "react";
import { GetFolders } from "../../redux/slices/folderSlice";
import { FolderType } from "../../utils/types";
import Folder from "../../components/Folder/Folder";
import {
  calculateTotalFileSize,
  countNonNullValues,
} from "../../utils/helpers";

const FolderPage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState<boolean>(true);

  //getting folders from state
  const folders: FolderType[] | null = useSelector(
    (state: RootState) => state.folder.fetchedFolders
  );

  useEffect(() => {
    if (folders) {
      setLoadingState(false);
    }
  }, [folders]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetFolders());
  }, []);

  return (
    <div className="folder-page">
      {loadingState ? (
        <div>Loading...</div>
      ) : (
        <div className="folder-page-folders">
          {folders?.map((folder: FolderType) => {
            let fileSize = "0 Kb";
            if (countNonNullValues(folder.files) > 0) {
              fileSize = calculateTotalFileSize(folder.files);
            }
            return <Folder key={folder.id} {...folder} fileSize={fileSize} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
