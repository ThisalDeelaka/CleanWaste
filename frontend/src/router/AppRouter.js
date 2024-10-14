import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";

import DriverHome from "../pages/driver/driverHomePage";

import WasteTypeSelection from "../pages/user/WasteTypeSelection";
import SortingGuidelines from "../pages/user/SortingGuidelines";
import CreateWasteRequest from '../pages/user/CreateWasteRequest';
import ProfilePage from '../pages/user/profile/ProfilePage';
import Membership from '../pages/user/profile/Membership';
import Recycling from '../pages/user/profile/Recycling';
import AdminHomePage from '../pages/admin/AdminHomePage';

// import Dashboard from '../pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      {/* auth routes */}
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />
       {/* user routes */}
       <Route path="/" element={<HomePage />} />
       <Route path="/selection" element={<WasteTypeSelection />} />
      <Route path="/sorting-guidelines" element={<SortingGuidelines />} />
      <Route path="/create-waste-request" element={<CreateWasteRequest />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Membership" element={<Membership />} />
      <Route path="/recycling" element={<Recycling />} />
     {/* driver routes */}
      <Route path="/driverHomePage" element={<DriverHome />} />
        {/* admin routes */}
      <Route path="/AdminHomePage" element={<AdminHomePage />} />
    </Routes>
  </Router>
);

export default AppRouter;
