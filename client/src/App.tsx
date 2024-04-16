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
import { ToastContainer } from "react-toastify";
import CategoryDashboard from "./pages/CategoryDashboard/CategoryDashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CreateCategoryPage from "./pages/CreateCategoryPage/CreateCategoryPage";
import FolderPage from "./pages/FolderPage/FolderPage";
import AddFolderPage from "./pages/AddFolderPage/AddFolderPage";

const App = () => {
  //secure routes usingg HOCs
  const SecureAuth = WithAuth(Layout);
  const SecureEditPermissions = WithAuth(EditPermissions);
  const SecureNotFoundPage = WithAuth(PageNotFound);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SecureAuth />}>
          <Route index path="/" element={<Home />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/manage-access" element={<ManageAccess />} />
          <Route path="/file-upload" element={<UploadFiles />} />

          {/* category routes */}
          <Route path="/categories" element={<CategoryDashboard />} />
          <Route path="/categories/create" element={<CreateCategoryPage />} />

          {/* folder routes */}
          <Route path="/folder" element={<FolderPage />} />
          <Route path="/folder/add" element={<AddFolderPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/edit-permissions" element={<SecureEditPermissions />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<SecureNotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
