import { RecentActivityData } from "../../utils/types";
import "./recentActivity.css";

const RecentActivity = ({ activityText, timeAgo }: RecentActivityData) => {
  return (
    <div className="recent-activity">
      <div className="recent-activity-middle">{activityText}</div>
      <div className="recent-activity-right">{timeAgo}</div>
    </div>
  );
};

export default RecentActivity;
