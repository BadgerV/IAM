import { Outlet } from "react-router-dom";
import "./layout.css";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <div className="header">{/* <h1>Header</h1> */}</div>
      <div className="content">
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <div className="layout-outlet">
          <Outlet />
        </div>
      </div>
      <div className="footer">{/* <h1>Footer</h1> */}</div>
    </div>
  );
};

export default Layout;
