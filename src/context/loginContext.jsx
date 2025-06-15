import { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      setUser(userData);
    }
  }, []);

  const login = (userData) => {
    const expires = new Date(Date.now() + 4 * 60 * 60 * 1000).toUTCString();
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires}; path=/`;
    setUser(userData);
  };

  const logout = () => {
    document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
