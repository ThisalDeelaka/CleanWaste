import React, { createContext, useContext, useState, useEffect } from "react";

const DriverAuthContext = createContext();

export const useDriverAuth = () => useContext(DriverAuthContext);

export const DriverAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const login = (user) => {
    setAuth({ user });
    localStorage.setItem("auth", JSON.stringify({ user }));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <DriverAuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </DriverAuthContext.Provider>
  );
};
