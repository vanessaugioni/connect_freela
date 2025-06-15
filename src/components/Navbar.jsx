import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ⏱️ Detect changes in location (including after login)
  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    if (cookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        setUser(userData);
      } catch (e) {
        console.error('Erro ao analisar cookie do usuário:', e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]); // 🔁 Runs again every time route changes

  const handleLogout = () => {
    document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-sky-700 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              Connect Freela
            </span>
            <p className="text-sm sm:text-base text-sky-100">
              Encontre ou publique serviços freelancers com facilidade.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? 'bg-sky-900 text-white underline-offset-4'
                    : 'text-white hover:bg-sky-600 hover:text-white'
                }`
              }
            >
              Sobre
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? 'bg-sky-900 text-white underline-offset-4'
                    : 'text-white hover:bg-sky-600 hover:text-white'
                }`
              }
            >
              Serviços
            </NavLink>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? 'bg-sky-900 text-white underline-offset-4'
                    : 'text-white hover:bg-sky-600 hover:text-white'
                }`
              }
            >
              Usuários
            </NavLink>

            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition duration-300"
              >
                Sair ({user.username})
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition duration-300"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
