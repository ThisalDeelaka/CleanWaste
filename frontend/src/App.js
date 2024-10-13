import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { DriverAuthProvider } from "./context/driverAuthContext"; // Import the DriverAuthProvider
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <AuthProvider>
      <DriverAuthProvider>
        <AppRouter />
      </DriverAuthProvider>
    </AuthProvider>
  );
};

export default App;
