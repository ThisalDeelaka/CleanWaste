import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const DriverAuthContext = createContext();

// Custom hook to use the auth context
export const useDriverAuth = () => useContext(DriverAuthContext);

// Provider component
export const DriverAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // When the component mounts, check if there's a token in localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth)); // Parse and set the stored auth
    }
  }, []);

  // Function to log in a driver
  const login = (user) => {
    setAuth({ user });
    localStorage.setItem("auth", JSON.stringify({ user })); // Save auth state to localStorage
  };

  // Function to log out a driver
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth"); // Remove the auth state from localStorage
  };

  return (
    <DriverAuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </DriverAuthContext.Provider>
  );
};
