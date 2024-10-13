import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";
import DriverHome from "../pages/driver/driverHomePage";
import DriverLogin from "../pages/driver/drivreLogin";
import DriverSignUp from "../pages/driver/driverSignUp";
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
    </Routes>
  </Router>
);

export default AppRouter;
