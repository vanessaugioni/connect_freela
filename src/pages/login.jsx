import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', name: '', email: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

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
    const { username, password, name, email } = formData;

    if (!username || !password || (isRegistering && (!name || !email))) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (isRegistering) {
        const checkRes = await fetch(`http://localhost:3000/users?username=${username}`);
        const existing = await checkRes.json();
        if (existing.length > 0) {
          alert('Usuário já existe.');
          return;
        }

        const newUser = {
          id: crypto.randomUUID(),
          username,
          password,
          name,
          email
        };

        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        setCookie('user', newUser, 4);
        navigate('/');
      } else {
        const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
        const users = await res.json();

        if (users.length > 0) {
          setCookie('user', users[0], 4);
          navigate('/');
        } else {
          alert('Usuário ou senha inválidos.');
        }
      }
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao processar sua solicitação.");
    }
  };

  const setCookie = (key, value, hours) => {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow">
        <h2 className="text-xl font-semibold mb-4">
          {isRegistering ? 'Criar Conta' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username *" className="border p-2 rounded" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Senha *" className="border p-2 rounded" required />
          {isRegistering && (
            <>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome *" className="border p-2 rounded" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="border p-2 rounded" required />
            </>
          )}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {isRegistering ? 'Criar Conta' : 'Entrar'}
          </button>
          <button type="button" onClick={() => setIsRegistering(prev => !prev)} className="text-sm text-blue-600 underline mt-2">
            {isRegistering ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar uma'}
          </button>
        </form>
      </div>
    </div>
  );
}
