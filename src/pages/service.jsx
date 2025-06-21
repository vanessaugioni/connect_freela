import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    deadline: ""
  });

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("user="));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      setUser(userData);
    }
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    }
  };

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
    fetchServices();
    fetchUsers();
  }, []);

  const getUserName = (id) => users.find((u) => u.id === id)?.name || "Desconhecido";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price } = formData;
    if (!title || !description || !price) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const serviceData = { ...formData, userId: user.id };

    try {
      if (editingService) {
        await fetch(`http://localhost:3000/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData)
        });
      } else {
        await fetch("http://localhost:3000/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData)
        });
      }
      await fetchServices();
      setShowForm(false);
      setEditingService(null);
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingService(service);
    setShowForm(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNew = () => {
    setFormData({ title: "", description: "", price: "", category: "", deadline: "" });
    setEditingService(null);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      {user && (
        <button onClick={handleNew} className="bg-green-500 text-white px-4 py-2 rounded mb-6">
          Novo Serviço
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
            <p className="text-sm mt-1">Categoria: {service.category}</p>
            <p className="text-sm">Prazo: {service.deadline}</p>
            <p className="text-blue-700 font-semibold mt-2">R$ {service.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              Criado por: <strong>{getUserName(service.userId)}</strong>
            </p>
            {user?.id === service.userId && (
              <button
                onClick={() => handleEdit(service)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Editar
              </button>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Título *" className="border p-2 rounded" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição *" className="border p-2 rounded" required />
              <input name="price" value={formData.price} onChange={handleChange} placeholder="Preço *" className="border p-2 rounded" required />
              <input name="category" value={formData.category} onChange={handleChange} placeholder="Categoria" className="border p-2 rounded" />
              <input name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Prazo (ex: 7 dias)" className="border p-2 rounded" />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
