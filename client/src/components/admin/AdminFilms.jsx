import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminFilms() {
  const [films, setFilms] = useState([]);
  const [newFilm, setNewFilm] = useState({
    title: "",
    poster: "",
    trailer: "",
    brief: "",
    rating: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/films")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddFilm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/admin/films", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFilm)
    });
    const data = await res.json();
    if (data.success) {
      setFilms([...films, data.film]);
      setNewFilm({ title: "", poster: "", trailer: "", brief: "", rating: "" });
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Films</h2>
      
      {/* Add Film Form */}
      <form onSubmit={handleAddFilm} className="bg-white p-4 rounded-md shadow-md mb-6 space-y-3">
        <input
          placeholder="Film Title"
          value={newFilm.title}
          onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Poster URL"
          value={newFilm.poster}
          onChange={(e) => setNewFilm({ ...newFilm, poster: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Trailer URL (embed link)"
          value={newFilm.trailer}
          onChange={(e) => setNewFilm({ ...newFilm, trailer: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Brief Description"
          value={newFilm.brief}
          onChange={(e) => setNewFilm({ ...newFilm, brief: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Rating"
          value={newFilm.rating}
          onChange={(e) => setNewFilm({ ...newFilm, rating: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Film</button>
      </form>

      {/* Existing Films */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {films.map((film, idx) => (
          <div key={idx} className="bg-white rounded-md p-4 shadow">
            <img src={film.poster} alt={film.title} className="w-full rounded-md mb-2" />
            <h3 className="font-bold">{film.title}</h3>
            <p className="text-sm text-gray-600">{film.brief}</p>
            <p className="text-yellow-500 mt-1">⭐ {film.rating}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
