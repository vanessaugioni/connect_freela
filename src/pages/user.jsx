import { useEffect, useState } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: ""
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, name, email } = formData;
    if (!username || !password || !name || !email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const method = selectedUser ? "PUT" : "POST";
      const url = selectedUser
        ? `http://localhost:3000/users/${selectedUser.id}`
        : "http://localhost:3000/users";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      await fetchUsers();
      setShowForm(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNewUser = () => {
    setSelectedUser(null);
    setFormData({ username: "", password: "", name: "", email: "", phone: "" });
    setShowForm(true);
  };

  const handleSelect = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setShowForm(true);
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="flex flex-col items-center gap-2 w-1/2">
        <button onClick={handleNewUser} className="bg-green-500 text-white px-4 py-2 rounded">
          Novo Cliente
        </button>
        {users.map((user) => (
          <div
            key={user.id}
            className="p-2 w-full border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(user)}
          >
            <strong>{user.name}</strong>
            <p className="text-sm">{user.email}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="username" value={formData.username} onChange={handleChange} placeholder="Username *" className="border p-2 rounded" required />
              <input name="password" value={formData.password} onChange={handleChange} placeholder="Senha *" className="border p-2 rounded" required />
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome *" className="border p-2 rounded" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="border p-2 rounded" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" className="border p-2 rounded" />
              <div className="flex gap-2 mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
