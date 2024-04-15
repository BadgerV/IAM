import { useState, useRef, useEffect, ChangeEvent } from "react";
import "./file.css";
import { Data } from "../../utils/types";

const File = ({
  fileName,
  name,
  email,
  size,
  lastModified,

  selectAll,
}: Data) => {
  console.log(fileName, name, email, size);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

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
        <span> {fileName} </span>
      </div>

      <div className="uploaded-by-cont">
        <div>
          <span className="file-name-text">{name}</span>
          <span className="file-email-text">{email}</span>
        </div>
      </div>

      <span className="file-size-text">{size}</span>

      <div className="last-modified-and-options">
        <span className="file-last-modified-text">{lastModified}</span>
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
            <div>
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
            <div>
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
