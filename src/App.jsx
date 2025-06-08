import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about'
import Servico from './pages/service'
import Footer from './components/footer'
import Navbar from './components/navbar'
import Cliente from './pages/Client'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
<Navbar/>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/service" element={<Servico/>} />
            <Route path="/client" element={<Cliente/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
