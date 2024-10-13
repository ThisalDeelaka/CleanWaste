import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";

import DriverHome from "../pages/driver/driverHomePage";
import DriverLogin from "../pages/driver/drivreLogin";
import DriverSignUp from "../pages/driver/driverSignUp";

import WasteTypeSelection from "../pages/user/WasteTypeSelection";
import SortingGuidelines from "../pages/user/SortingGuidelines";

// import Dashboard from '../pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />

      <Route path="/driverHomePage" element={<DriverHome />} />
      <Route path="/driverLogin" element={<DriverLogin />} />{" "}
      <Route path="/driverSignup" element={<DriverSignUp />} />{" "}

      <Route path="/" element={<HomePage />} />
      
      <Route path="/selection" element={<WasteTypeSelection />} />
      <Route path="/sorting-guidelines" element={<SortingGuidelines />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    </Routes>
  </Router>
);

export default AppRouter;
