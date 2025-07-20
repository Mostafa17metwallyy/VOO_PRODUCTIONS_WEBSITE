import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminEpisodic() {
  const [episodicList, setEpisodicList] = useState([]);
  const [newEpisodic, setNewEpisodic] = useState({
    title: "",
    poster: "",
    trailer: "",
    brief: "",
    rating: ""
  });

  // ✅ Fetch episodic data on load
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/episodic")
      .then((res) => res.json())
      .then((data) => setEpisodicList(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add new episodic
  const handleAddEpisodic = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/admin/episodic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEpisodic)
    });
    const data = await res.json();
    if (data.success) {
      setEpisodicList([...episodicList, data.episodic]);
      setNewEpisodic({ title: "", poster: "", trailer: "", brief: "", rating: "" });
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Episodic Content</h2>
      
      {/* Add Episodic Form */}
      <form onSubmit={handleAddEpisodic} className="bg-white p-4 rounded-md shadow-md mb-6 space-y-3">
        <input
          placeholder="Episodic Title"
          value={newEpisodic.title}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Poster URL"
          value={newEpisodic.poster}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, poster: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Trailer URL (embed link)"
          value={newEpisodic.trailer}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, trailer: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Brief Description"
          value={newEpisodic.brief}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, brief: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          placeholder="Rating"
          value={newEpisodic.rating}
          onChange={(e) => setNewEpisodic({ ...newEpisodic, rating: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Episodic</button>
      </form>

      {/* Existing Episodic Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {episodicList.map((ep, idx) => (
          <div key={idx} className="bg-white rounded-md p-4 shadow">
            <img src={ep.poster} alt={ep.title} className="w-full rounded-md mb-2" />
            <h3 className="font-bold">{ep.title}</h3>
            <p className="text-sm text-gray-600">{ep.brief}</p>
            <p className="text-yellow-500 mt-1">⭐ {ep.rating}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
