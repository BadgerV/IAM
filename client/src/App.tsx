import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Permissions from "./pages/Permissions/Permissions";
import Overview from "./pages/Overview/Overview";
import EditPermissions from "./pages/EditPermissions/EditPermissions";
import ManageAccess from "./pages/ManageAccess/ManageAccess";
import UploadFiles from "./pages/UploadFiles/UploadFiles";
import Signup from "./pages/Signup/Signup";
import WithAuth from "./HOCs/WithAuth";

const App = () => {
  //secure routes usingg HOCs
  const SecureAuth = WithAuth(Layout);
  const SecureEditPermissions = WithAuth(EditPermissions);
  
  return (
    <Routes>
      <Route path="/" element={<SecureAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/manage-access" element={<ManageAccess />} />
        <Route path="/file-upload" element={<UploadFiles />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/edit-permissions" element={<SecureEditPermissions />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
