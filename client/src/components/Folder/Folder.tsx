import "./folder.css";
import { useRef, useState } from "react";
import { FolderType } from "../../utils/types";

const Folder = ({ folderName, noOfFiles, fileSize, img }: FolderType) => {
  const folderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="folder"
      ref={folderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="folder-top">
        <img
          src={`${img}${isHovered ? "light.png" : "dark.png"}`}
          alt="folder"
          className="folder-file-img"
        />
        <img
          src={`/assets/options-${isHovered ? "light.png" : "dark.png"}`}
          alt="options"
          className="folder-options"
        />
      </div>
      <div className="folder-middle">{folderName}</div>
      <div className="folder-bottom">
        <span>{noOfFiles} files</span>
        <span>{fileSize}</span>
      </div>
    </div>
  );
};

export default Folder;
