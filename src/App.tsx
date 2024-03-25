import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Permissions from "./pages/Permissions/Permissions";
import Overview from "./pages/Overview/Overview";
import EditPermissions from "./pages/EditPermissions/EditPermissions";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="overview" element={<Overview />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/edit-permissions" element={<EditPermissions />} />
    </Routes>
  );
};

export default App;
