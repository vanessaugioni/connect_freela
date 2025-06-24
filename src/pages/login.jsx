import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', name: '', contact: '', email: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Check for user cookie
  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      navigate('/');
    }
  }, [navigate]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, password, name, contact, email } = formData;

    if (isRegistering) {
      let existing;
      try {
        const checkRes = await fetch(`http://localhost:3000/users?username=${username}`);
        existing = await checkRes.json();
      } catch (error) {
        console.error('Erro ao checar novo usuário:', error);
        existing = [];
      }

      if (existing.length > 0) {
        alert('Usuário já existe.');
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        username,
        password,
        name,
        contact,
        email,
      };

      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      setCookie('user', newUser, 4);
      navigate('/');
    } else {
      // Login
      const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        setCookie('user', users[0], 4);
        navigate('/');
      } else {
        alert('Usuário ou senha inválidos.');
      }
    }
  };

  const setCookie = (key, value, hours) => {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
  };

  return (
<div className="h-screen flex justify-center items-center">
  <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-lg mx-4">
    <h2 className="text-xl font-semibold text-sky-700 mb-6 text-center">
      {isRegistering ? "Criar Conta" : "Login"}
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="border border-gray-300 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 p-3 rounded-md outline-none transition"
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Senha"
        required
        className="border border-gray-300 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 p-3 rounded-md outline-none transition"
      />

      {isRegistering && (
        <>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
            className="border border-gray-300 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 p-3 rounded-md outline-none transition"
          />
          <input
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contato"
            required
            className="border border-gray-300 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 p-3 rounded-md outline-none transition"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border border-gray-300 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 p-3 rounded-md outline-none transition"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-sky-700 hover:bg-sky-800 text-white p-3 rounded-md transition font-semibold"
      >
        {isRegistering ? "Criar Conta" : "Entrar"}
      </button>

      <button
        type="button"
        onClick={() => setIsRegistering((prev) => !prev)}
        className="text-sm text-sky-700 hover:text-sky-900 underline mt-3"
      >
        {isRegistering
          ? "Já tem uma conta? Entrar"
          : "Não tem conta? Criar uma"}
      </button>
    </form>
  </div>
</div>
  );
}
