import { useState, useEffect } from "react";

export default function AdminFilms() {
  const [films, setFilms] = useState([]);
  const [editingFilmId, setEditingFilmId] = useState(null); // ✅ Track which film is being edited
  const [newFilm, setNewFilm] = useState({
    title: "",
    posterUrl: "",
    trailerUrl: "",
    description: "",
    rating: "",
  });

  // ✅ Fetch films
  const fetchFilms = async () => {
    const res = await fetch("http://localhost:5000/api/films");
    const data = await res.json();
    if (data.success) setFilms(data.data);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  // ✅ Add or Update Film
  const handleSaveFilm = async (e) => {
    e.preventDefault();

    const url = editingFilmId
      ? `http://localhost:5000/api/films/${editingFilmId}` // PUT if editing
      : "http://localhost:5000/api/films"; // POST if new

    const method = editingFilmId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFilm),
    });

    const data = await res.json();

    if (data.success) {
      alert(editingFilmId ? "✅ Film updated!" : "✅ Film added!");
      fetchFilms(); // Refresh list
      setNewFilm({ title: "", posterUrl: "", trailerUrl: "", description: "", rating: "" });
      setEditingFilmId(null); // Reset edit mode
    } else {
      alert("❌ Failed to save film");
    }
  };

  // ✅ Delete Film
  const handleDeleteFilm = async (id) => {
    if (!window.confirm("Are you sure you want to delete this film?")) return;

    const res = await fetch(`http://localhost:5000/api/films/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Film deleted");
      fetchFilms(); // Refresh list
    } else {
      alert("❌ Failed to delete film");
    }
  };

  // ✅ Populate form for editing
  const handleEditFilm = (film) => {
    setEditingFilmId(film._id);
    setNewFilm({
      title: film.title,
      posterUrl: film.posterUrl,
      trailerUrl: film.trailerUrl,
      description: film.description,
      rating: film.rating,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Films</h2>

      {/* ✅ Add/Edit Film Form */}
      <form onSubmit={handleSaveFilm} className="bg-white p-4 rounded-md shadow-md mb-6 space-y-3">
        <input
          placeholder="Film Title"
          value={newFilm.title}
          onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Poster URL"
          value={newFilm.posterUrl}
          onChange={(e) => setNewFilm({ ...newFilm, posterUrl: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Trailer URL"
          value={newFilm.trailerUrl}
          onChange={(e) => setNewFilm({ ...newFilm, trailerUrl: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newFilm.description}
          onChange={(e) => setNewFilm({ ...newFilm, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Rating"
          type="number"
          step="0.1"
          value={newFilm.rating}
          onChange={(e) => setNewFilm({ ...newFilm, rating: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {editingFilmId ? "Update Film" : "Add Film"}
        </button>
      </form>

      {/* ✅ Film List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {films.map((film) => (
          <div key={film._id} className="bg-white rounded-md p-4 shadow">
            <img src={film.posterUrl} alt={film.title} className="w-full h-64 object-cover rounded-md mb-2" />
            <h3 className="font-bold text-lg">{film.title}</h3>
            <p className="text-sm text-gray-600">{film.description}</p>
            <p className="text-yellow-500 mt-1">⭐ {film.rating}/10</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEditFilm(film)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFilm(film._id)}
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
