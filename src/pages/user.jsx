import { useEffect, useState } from "react";

export default function User() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        contact: "",
        email: ""
    });

    const fetchUsers = async () => {
        try {
            const res  = await fetch("http://localhost:3000/users");
            const data = await res.json();
            setUsers(data);            
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            const data = [];
            setUsers(data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSelect = (user) => {
        setSelectedUser(user);
        setFormData(user);
        setShowForm(true);
    };

    const handleNewUser = () => {
        setSelectedUser(null);
        setFormData({ username: "", password: "", name: "", contact: "", email: "" });
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedUser) {
            try {
                await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            } catch (error) {
                console.error("Erro ao atualizar usuário:", error);
            }

        } else {
            try {
                await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            } catch (error) {
                console.error("Erro ao criar novo usuário:", error);
            }
        }

        await fetchUsers();

        setSelectedUser(null);
        setFormData({ username: "", password: "", name: "", contact: "", email: "" });
        setShowForm(false);
    };

    const handleDelete = async (user) => {
  const confirmDelete = window.confirm(`Tem certeza que deseja excluir o cliente "${user.name}"?`);
  if (!confirmDelete) return;

  try {
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
    });
    await fetchUsers(); 
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    alert("Erro ao tentar excluir o usuário.");
  }
};

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2 p-2">
                <h1 className="text-2xl font-bold text-gray-800">Clientes cadastrados</h1>
                <button
                    onClick={handleNewUser}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                >
                    Novo Cliente
                </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 max-h-[600px] overflow-y-auto">
                {users.map((user) => (
                    
                        <div
                            key={user.id || user.username}
                            onClick={() => handleSelect(user)}
                            className="cursor-pointer group bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm hover:bg-sky-700 hover:shadow-md transition duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-sky-700 group-hover:text-white transition">
                                    {user.name}
                                </h3>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-sky-700 text-white border px-3 py-1.5 rounded-md text-sm font-medium hover:bg-sky-900 hover:text-white transition"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="bg-red-600 text-white border px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-700 hover:text-white transition"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-200 transition">
                                E-mail: {user.email}
                            </p>
                        </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">
                            {selectedUser ? `Editando ${selectedUser.name}` : "Novo Cliente"}
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
                            />
                            <input
                                name="password"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Senha"
                                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
                            />

                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
                            />

                            <input
                                name="contact"
                                required
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Contato"
                                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
                            />

                            <input
                                name="email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-md transition"
                                >
                                    {selectedUser ? "Salvar Alterações" : "Adicionar Usuário"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
} 
