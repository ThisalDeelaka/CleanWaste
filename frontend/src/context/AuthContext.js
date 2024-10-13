import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  const login = (user, token) => {
    setAuth({ user, token });
    localStorage.setItem('token', token);  // Store token in local storage for persistence
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');  // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
