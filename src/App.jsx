import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import About from './pages/about'
import Servico from './pages/service'
import Footer from './components/footer'
import Navbar from './components/navbar'
import User from './pages/user'
import Login from './pages/login'
import { LoginProvider } from './context/LoginContext';

// Padrão SPA
function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`min-h-screen flex flex-col ${isLoginPage ? 'bg-sky-700' : 'bg-white'}`}>
      {!isLoginPage && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/service" element={<Servico />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <AppLayout />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
