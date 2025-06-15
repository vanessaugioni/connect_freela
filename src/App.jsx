import React   from 'react'
import {
  BrowserRouter,
  Routes,
  Route }      from 'react-router-dom'
import About   from './pages/about'
import Servico from './pages/service'
import Footer  from './components/footer'
import Navbar  from './components/navbar'
import User    from './pages/user'
import Login   from './pages/Login'
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/service" element={<Servico />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App
