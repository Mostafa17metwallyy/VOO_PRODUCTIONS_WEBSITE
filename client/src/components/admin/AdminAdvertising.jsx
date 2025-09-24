import { useEffect, useState } from "react";

export default function AdminAdvertising() {
  const [ads, setAds] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    posterUrl: "",
    trailerUrl: "",
    description: "",
    rating: "",
    // Optional extras (safe to ignore if your backend doesn’t use them)
    category: "tv",   // "tv" | "digital" | "ooh"
    client: "",
    order: "",
    isPublished: true,
  });

  const token = localStorage.getItem("adminToken");

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // ✅ Fetch all ads
  const fetchAds = async () => {
    const res = await fetch("http://localhost:5000/api/advertising");
    const data = await res.json();
    if (data.success) setAds(data.data);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // ✅ Create/Update ad
  const handleSave = async (e) => {
    e.preventDefault();

    // Cast numbers properly
    const payload = {
      ...form,
      rating: form.rating === "" ? "" : Number(form.rating),
      order: form.order === "" ? 0 : Number(form.order),
    };

    const url = editingId
      ? `http://localhost:5000/api/advertising/${editingId}`
      : "http://localhost:5000/api/advertising";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders, // ⬅️ works whether route is protected or not
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert(editingId ? "✅ Advertising updated!" : "✅ Advertising added!");
      await fetchAds();
      setForm({
        title: "",
        posterUrl: "",
        trailerUrl: "",
        description: "",
        rating: "",
        category: "tv",
        client: "",
        order: "",
        isPublished: true,
      });
      setEditingId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert(`❌ Failed to save${data.message ? `: ${data.message}` : ""}`);
    }
  };

  // ✅ Delete ad
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this advertising item?")) return;

    const res = await fetch(`http://localhost:5000/api/advertising/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders },
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Deleted");
      fetchAds();
    } else {
      alert("❌ Failed to delete");
    }
  };

  // ✅ Edit ad (populate form)
  const handleEdit = (ad) => {
    setEditingId(ad._id);
    setForm({
      title: ad.title || "",
      posterUrl: ad.posterUrl || "",
      trailerUrl: ad.trailerUrl || "",
      description: ad.description || "",
      rating: ad.rating ?? "",
      category: ad.category || "tv",
      client: ad.client || "",
      order: ad.order ?? "",
      isPublished: ad.isPublished ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Advertising</h2>

      {/* ✅ Add/Edit Form */}
      <form onSubmit={handleSave} className="bg-white p-4 rounded-md shadow-md mb-6 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            placeholder="Client (optional)"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Poster URL"
            value={form.posterUrl}
            onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            placeholder="Trailer URL (YouTube embed)"
            value={form.trailerUrl}
            onChange={(e) => setForm({ ...form, trailerUrl: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="tv">TV / Cinema</option>
            <option value="digital">Digital / Social</option>
            <option value="ooh">OOH / LED</option>
          </select>

          <input
            placeholder="Order (optional)"
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            <span>Published</span>
          </label>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {editingId ? "Update Advertising" : "Add Advertising"}
        </button>
      </form>

      {/* ✅ List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad._id} className="bg-white rounded-md p-4 shadow">
            <img
              src={ad.posterUrl}
              alt={ad.title}
              className="w-full h-64 object-cover rounded-md mb-2"
            />
            <h3 className="font-bold text-lg">{ad.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{ad.description}</p>
            <p className="text-yellow-500 mt-1">⭐ {ad.rating}/10</p>
            <div className="text-xs text-gray-500 mt-1">
              <span className="uppercase">{ad.category}</span>
              {ad.client ? <> · {ad.client}</> : null}
              {typeof ad.order === "number" ? <> · order {ad.order}</> : null}
              {ad.isPublished === false ? " · (Unpublished)" : null}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(ad)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ad._id)}
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
