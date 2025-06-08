import React from 'react'
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-sky-700 text-white text-center py-2 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-balance font-light select-none">
          ©2025 <span className="font-bold">Connect Freela</span>. Todos os direitos reservados.
        </p>

        <div className="flex gap-3">
        <div className="p-2 rounded-full hover:bg-white/20 transition duration-300 ease-in-out cursor-pointer">
         <Mail size={20} />
         </div>
         <div className="p-2 rounded-full hover:bg-white/20 transition duration-300 ease-in-out cursor-pointer">
         <Phone size={20} />
         </div>
        </div>

      </div>
    </footer>
  )
}
