import { useEffect, useState } from "react";

export default function Servico() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  });

  // Fetch session user
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      setUser(userData);
    }
  }, []);

  const fetchServices = async () => {
    const res = await fetch("http://localhost:3000/services");
    const data = await res.json();
    setServices(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchServices();
    fetchUsers();
  }, []);

  const getUserName = (id) => {
    const u = users.find((u) => u.id === id);
    return u?.name || "Desconhecido";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNew = () => {
    setFormData({ title: "", description: "", price: "" });
    setEditingService(null);
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      userId: user.id
    };

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

    setShowForm(false);
    setEditingService(null);
    await fetchServices();
  };

  return (
    <div className="p-5">
      {user && (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2 p-2">
          <h1 className="text-2xl font-bold text-gray-800">Serviços disponíveis</h1>
          <button
            onClick={handleNew}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
          >
            Novo Serviço
          </button>
        </div>
      )}

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-gray-100 border border-gray-200 rounded-xl p-3 shadow-sm hover:bg-sky-700 hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <h3 className="text-lg font-semibold text-sky-700 group-hover:text-white transition">
                {service.title}
              </h3>

              <p className="text-gray-700 mt-1 text-sm group-hover:text-gray-100 transition line-clamp-2">
                {service.description}
              </p>

              <p className="text-sky-700 font-semibold mt-2 group-hover:text-white transition">
                R$ {service.price}
              </p>

              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-200 transition">
                Criado por: <strong>{getUserName(service.userId)}</strong>
              </p>
            </div>

            {user?.id === service.userId && (
              <div className="flex items-center gap-2 mt-3 justify-end">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-sky-700 text-white border px-3 py-1.5 rounded-md text-sm font-medium hover:bg-sky-900 hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white border px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-700 hover:text-white transition"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>


        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Título"
                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
              />

              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição"
                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
              />

              <input
                name="price"
                required
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Preço"
                className="border border-gray-300 focus:border-sky-700 focus:ring-sky-700 p-2 rounded-md outline-none transition"
              />

              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="submit"
                  className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-md transition"
                >
                  Salvar
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
