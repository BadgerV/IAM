import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import "./folderPage.css";
import { useEffect, useState } from "react";
import { GetFolders } from "../../redux/slices/folderSlice";
import { Folder } from "../../utils/types";

const FolderPage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const folders: Folder[] | null = useSelector(
    (state: RootState) => state.folder.fetchedFolders
  );

  useEffect(() => {
    if (folders) {
      setLoadingState(false);

      console.log(folders);
    }
  }, [folders]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetFolders());
  }, []);

  return (
    <div className="folder-page">
      {loadingState ? (
        <>Loading</>
      ) : (
        folders?.map((folder: Folder) => {
          return <span>{folder.name}</span>;
        })
      )}
    </div>
  );
};

export default FolderPage;
