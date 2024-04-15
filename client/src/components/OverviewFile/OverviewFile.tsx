import { ChangeEvent, useEffect, useState } from "react";
import "./overviewFile.css";
import { OverviewData } from "../../utils/types";

const OverviewFile = ({
  name,
  email,
  status,
  
  selectAll,
}: OverviewData) => {
  const [isChecked, setIsChecked] = useState(selectAll);

  useEffect(() => {
    setIsChecked(selectAll);
  }, [selectAll]);
  
  return (
    <div className="overview-file">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIsChecked(e.target.checked)
        }
      />

      <div className="overview-file-name-and-pic-cont">
        <div>
          <span className="overview-file-name">{name}</span>
          <span className="overview-file-email">{email}</span>
        </div>
      </div>

      <span className="overview-status-text">{status}</span>

      <div className="overview-file-view-profile">
        <div>
          <span>View Profile</span>
          <img src="/assets/link-square.png" alt="" />
        </div>

        <img src="/assets/options-dark.png" alt="Options" />
      </div>
    </div>
  );
};

export default OverviewFile;