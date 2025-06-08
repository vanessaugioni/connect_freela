import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
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

          {/* Navegação */}
          <div className="flex space-x-4">
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
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
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
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
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
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              Usuários
            </NavLink>
          </div>
          
        </div>
      </div>
    </nav>
  )
}
