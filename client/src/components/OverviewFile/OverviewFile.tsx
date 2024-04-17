import { ChangeEvent, useEffect, useState } from "react";
import "./overviewFile.css";
import { OverviewData } from "../../utils/types";
import { reviseRole } from "../../utils/helpers";

const OverviewFile: React.FC<{ data: OverviewData; selectAll: any }> = ({
  data,
  selectAll,
}) => {
  const [isChecked, setIsChecked] = useState(selectAll);

  const { username, email, is_active, role } = data;

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
          <span className="overview-file-name">{username}</span>
          <span className="overview-file-email">{email}</span>
        </div>
      </div>

      <span className="overview-status-text">
        {is_active ? "Active" : "Inactive"}
      </span>

      <div className="overview-file-view-profile">
        <div>
          <span>{reviseRole(role)}</span>
        </div>

        <img src="/assets/options-dark.png" alt="Options" />
      </div>
    </div>
  );
};

export default OverviewFile;
