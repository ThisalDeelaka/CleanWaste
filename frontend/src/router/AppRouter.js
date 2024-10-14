import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";

import DriverHome from "../pages/driver/driverHomePage";
import CommunityPage from "../pages/community/CommunityPage";
import CreateEvent from "../pages/community/CreateEvent";

import WasteTypeSelection from "../pages/user/WasteTypeSelection";
import SortingGuidelines from "../pages/user/SortingGuidelines";
import CreateWasteRequest from '../pages/user/CreateWasteRequest';
import AdminHomePage from '../pages/admin/AdminHomePage';

// import Dashboard from '../pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />

      <Route path="/driverHomePage" element={<DriverHome />} />
  
      <Route path="/" element={<HomePage />} />

      <Route path="/Community" element={<CommunityPage/>}/>
      <Route path="/CreateEvent" element={<CreateEvent/>}/>
      
      
      <Route path="/selection" element={<WasteTypeSelection />} />
      <Route path="/sorting-guidelines" element={<SortingGuidelines />} />
      <Route path="/create-waste-request" element={<CreateWasteRequest />} />
      <Route path="/AdminHomePage" element={<AdminHomePage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    </Routes>
  </Router>
);

export default AppRouter;
