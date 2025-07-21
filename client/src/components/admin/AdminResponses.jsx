import { useEffect, useState } from "react";

export default function AdminResponses() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        const data = await res.json();

        console.log("Fetched responses:", data); // ✅ Debugging log

        if (data.success && Array.isArray(data.data)) {
          setResponses(data.data);
        } else {
          console.warn("Unexpected response format:", data);
          setResponses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching responses:", err);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (loading) {
    return <p className="text-center p-4 text-gray-500">Loading responses...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📩 Form Responses</h2>

      {responses.length === 0 ? (
        <p className="text-gray-500">No responses yet.</p>
      ) : (
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Project Type</th>
                <th className="p-3">Message</th>
                <th className="p-3">Source</th>
                <th className="p-3">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((res) => (
                <tr
                  key={res._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{res.name}</td>
                  <td className="p-3">{res.email}</td>
                  <td className="p-3">{res.projectType}</td>
                  <td className="p-3">{res.message}</td>
                  <td className="p-3">{res.source}</td>
                  <td className="p-3">
                    {new Date(res.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
