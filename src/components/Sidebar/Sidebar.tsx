import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ setIsSidebarOpen }: any) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1 className="fileshield-text">FileShield</h1>
        <img
          src="/assets/arrow-left.png"
          alt="Close"
          className="arrow-close"
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>

      <nav className="navigation">
        <ul className="navigation-top-links">
          <Link to="/overview" className="nav-link">
            <li>
              <img src="/assets/dashboard.svg" alt="Dashboard" />
              <span>Overview</span>
            </li>
          </Link>

          <Link to="/" className="nav-link">
            <li>
              <img src="/assets/folder-management.svg" alt="Dashboard" />
              <span>File Management</span>
            </li>
          </Link>

          <Link to="/permissions" className="nav-link">
            <li>
              <img src="/assets/security-icon.svg" alt="Dashboard" />
              <span>Permissions</span>
            </li>
          </Link>

          <li>
            <img src="/assets/user-icon.svg" alt="Dashboard" />
            <span>Manage Access</span>
          </li>
          <li>
            <img src="/assets/notification.svg" alt="Dashboard" />
            <span>Notifications</span>
          </li>
        </ul>

        <div className="nav-bottom">
          <ul className="navigation-bottom-links">
            <span className="support-text">Support</span>
            <li>
              <img src="/assets/help-circle.svg" alt="Help" />
              <span>Help & Support</span>
            </li>
            <li>
              <img src="/assets/elements.svg" alt="Help" />
              <span>Settings</span>
            </li>
          </ul>

          <div className="avatar-cont">
            <div className="avatar-cont-left">
              <img src="/assets/Rectangle.png" alt="avatar" />
              <span>Christine Bell</span>
            </div>

            <div className="avatar-cont-right">
              <img src="/assets/arrow-down-icon.png" alt="Arrow down" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
