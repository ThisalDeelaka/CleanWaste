import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  // Check localStorage for user and token when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setAuth({
        user: JSON.parse(storedUser),
        token: storedToken,
      });
    }
  }, []);

  const login = (user, token) => {
    setAuth({ user, token });
    localStorage.setItem('user', JSON.stringify(user));  // Store user in local storage
    localStorage.setItem('token', token);  // Store token in local storage
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('user');  // Remove user from local storage
    localStorage.removeItem('token');  // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
