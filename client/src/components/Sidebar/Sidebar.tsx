import { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ setIsSidebarOpen }: any) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth); // Update the windowWidth state
      if (newWidth >= 1130) {
        setIsSidebarOpen(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once on initial mount
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1 className="fileshield-text">IAM</h1>
        <img
          src="/assets/arrow-left.png"
          alt="Close"
          className="arrow-close"
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>

      <nav className="navigation">
        <ul className="navigation-top-links">
          <Link
            to="/overview"
            className="nav-link"
            onClick={() => windowWidth <= 1130 && setIsSidebarOpen(false)}
          >
            <li>
              <img src="/assets/dashboard.svg" alt="Dashboard" />
              <span>Overview</span>
            </li>
          </Link>

          <Link
            to="/"
            className="nav-link"
            onClick={() => windowWidth <= 1130 && setIsSidebarOpen(false)}
          >
            <li>
              <img src="/assets/folder-management.svg" alt="Dashboard" />
              <span>File Management</span>
            </li>
          </Link>

          <Link
            to="/permissions"
            className="nav-link"
            onClick={() => windowWidth <= 1130 && setIsSidebarOpen(false)}
          >
            <li>
              <img src="/assets/security-icon.svg" alt="Dashboard" />
              <span>Permissions</span>
            </li>
          </Link>

          <Link
            to="/manage-access"
            className="nav-link"
            onClick={() => windowWidth <= 1130 && setIsSidebarOpen(false)}
          >
            <li>
              <img src="/assets/user-icon.svg" alt="Dashboard" />
              <span>Manage Access</span>
            </li>
          </Link>
          {/* <Link
            to="/categories"
            className="nav-link"
            onClick={() => windowWidth <= 1130 && setIsSidebarOpen(false)}
          >
            <li>
              <img src="/assets/user-icon.svg" alt="Dashboard" />
              <span>Categories</span>
            </li>
          </Link> */}
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
