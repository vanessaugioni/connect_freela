import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-sky-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <span className="text-white text-xl font-bold select-none">Connect Freela</span>
            </div>
          </div>

          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-4xl px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${isActive
                    ? 'bg-sky-900 text-white underline-offset-4'
                    : 'text-white hover:bg-sky-600 hover:text-white'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Sobre
              </NavLink>
              <NavLink
                to="/client"
                className={({ isActive }) =>
                  `rounded-4xl px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${isActive
                    ? 'bg-sky-900 text-white underline-offset-4'
                    : 'text-white hover:bg-sky-600 hover:text-white'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Serviços
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
