import { useEffect, useState } from "react";

export default function User() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSelect = (user) => {
        setSelectedUser(user);
        setFormData(user);
        setNewUser(false);
        setShowForm(true);
    };

    const handleNewUser = () => {
        setSelectedUser(null);
        setFormData({ username: "", password: "", name: "", email: "" });
        setNewUser(true);
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedUser) {
            await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
        } else {
            await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
        }

        await fetchUsers();

        setSelectedUser(null);
        setFormData({ username: "", password: "", name: "", email: "" });
        setShowForm(false);
    };

    return (
        <div className="p-4 flex justify-center max-h-full">
            <div className="flex flex-col items-center gap-2 w-1/2">
                <button
                    onClick={handleNewUser}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-2 cursor-pointer"
                > Novo Cliente
                </button>
                {users.map((user) => (
                    <div
                        key={user.id || user.username}
                        className="p-2 w-full border rounded hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect(user)}
                    >
                        <strong>{user.name}</strong>
                        <p className="text-sm">{user.email}</p>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedUser ? `Editando ${selectedUser.name}` : "Novo Cliente"}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {newUser && (
                                <>
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="Senha"
                                        className="border p-2 rounded"
                                    />
                                </>
                            )}
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="border p-2 rounded"
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-2 rounded"
                            />

                            <div className="flex gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    {selectedUser ? "Salvar Alterações" : "Adicionar Usuário"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
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
