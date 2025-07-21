import { useState, useEffect } from "react";

export default function AdminEpisodic() {
  const [episodics, setEpisodics] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEpisodic, setNewEpisodic] = useState({
    title: "",
    posterUrl: "",
    trailerUrl: "",
    description: "",
    rating: "",
  });

  // ✅ Fetch episodics
  const fetchEpisodics = async () => {
    const res = await fetch("http://localhost:5000/api/episodic");
    const data = await res.json();
    if (data.success) setEpisodics(data.data);
  };

  useEffect(() => {
    fetchEpisodics();
  }, []);

  // ✅ Add/Update
  const handleSave = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/api/episodic/${editingId}`
      : "http://localhost:5000/api/episodic";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEpisodic),
    });

    const data = await res.json();

    if (data.success) {
      alert(editingId ? "✅ Episodic updated!" : "✅ Episodic added!");
      fetchEpisodics();
      setNewEpisodic({ title: "", posterUrl: "", trailerUrl: "", description: "", rating: "" });
      setEditingId(null);
    } else {
      alert("❌ Failed to save");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this episodic?")) return;

    const res = await fetch(`http://localhost:5000/api/episodic/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Deleted");
      fetchEpisodics();
    } else {
      alert("❌ Failed to delete");
    }
  };

  // ✅ Edit
  const handleEdit = (ep) => {
    setEditingId(ep._id);
    setNewEpisodic({
      title: ep.title,
      posterUrl: ep.posterUrl,
      trailerUrl: ep.trailerUrl,
      description: ep.description,
      rating: ep.rating,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Episodic Content</h2>

      {/* ✅ Add/Edit Form */}
      <form onSubmit={handleSave} className="bg-white p-4 rounded-md shadow-md mb-6 space-y-3">
        <input
          placeholder="Title"
          value={newEpisodic.title}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Poster URL"
          value={newEpisodic.posterUrl}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, posterUrl: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Trailer URL"
          value={newEpisodic.trailerUrl}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, trailerUrl: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newEpisodic.description}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Rating"
          type="number"
          step="0.1"
          value={newEpisodic.rating}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, rating: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {editingId ? "Update Episodic" : "Add Episodic"}
        </button>
      </form>

      {/* ✅ List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {episodics.map((ep) => (
          <div key={ep._id} className="bg-white rounded-md p-4 shadow">
            <img src={ep.posterUrl} alt={ep.title} className="w-full h-64 object-cover rounded-md mb-2" />
            <h3 className="font-bold text-lg">{ep.title}</h3>
            <p className="text-sm text-gray-600">{ep.description}</p>
            <p className="text-yellow-500 mt-1">⭐ {ep.rating}/10</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(ep)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ep._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
