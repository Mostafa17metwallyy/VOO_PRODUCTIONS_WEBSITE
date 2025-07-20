import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminResponses() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/responses")
      .then((res) => res.json())
      .then((data) => setResponses(data))
      .catch((err) => console.error("Error fetching responses", err));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Form Responses</h2>
      <div className="bg-white shadow rounded-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Project Type</th>
              <th className="p-3">Message</th>
              <th className="p-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100">
                <td className="p-3">{res.name}</td>
                <td className="p-3">{res.email}</td>
                <td className="p-3">{res.projectType}</td>
                <td className="p-3">{res.message}</td>
                <td className="p-3">{res.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
