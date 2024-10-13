import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
// import Dashboard from '../pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  </Router>
);

export default AppRouter;
