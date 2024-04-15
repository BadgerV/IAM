import "./recentActivity.css";

interface RecentActivityData {
  image: string;
  activityText: string;
  timeAgo: string;
}

const RecentActivity = ({
  image,
  activityText,
  timeAgo,
}: RecentActivityData) => {
  return (
    <div className="recent-activity">
      <div className="recent-activity-left">
        <img src={image} alt="Avatar" />
      </div>
      <div className="recent-activity-middle">{activityText}</div>
      <div className="recent-activity-right">{timeAgo}</div>
    </div>
  );
};

export default RecentActivity;
