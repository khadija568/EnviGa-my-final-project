import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type WasteRequest = {
  _id: string;
  weight: number;
  status: string;
  createdAt: string;
  notes?: string;
  hotel: {
    name: string;
    address?: string;
  };
};

export default function PickupRequests() {
  const [requests, setRequests] = useState<WasteRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/waste/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 ضع التوكن الصحيح هنا
        },
      });
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/waste/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 ضع التوكن الصحيح هنا
        },
      });

      if (res.ok) {
        toast.success("Delete successful");
        setRequests((prev) => prev.filter((req) => req._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting waste");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/waste/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      toast.success("Status updated");
      const updated = await res.json();
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updated : req))
      );
    } else {
      toast.error("Failed to update status");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating status");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-green-700 mb-6">Pickup Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="bg-white p-6 rounded-2xl shadow-md mb-5 border border-green-100 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">{req.hotel?.name || "Unknown Hotel"}</h3>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${req.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : req.status === "accepted"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
              }`}>
                {req.status}
              </span>
            </div>
            <p className="text-gray-700 mb-1"><strong>Weight:</strong> {req.weight} kg</p>
            {req.notes && <p className="text-gray-600 mb-2"><strong>Notes:</strong> {req.notes}</p>}
            <p className="text-sm text-gray-400">Submitted on: {new Date(req.createdAt).toLocaleDateString()}</p>

            <div className="mt-3 flex gap-2 items-center">
  <select
    value={req.status}
    onChange={(e) => handleStatusChange(req._id, e.target.value)}
    className="px-2 py-1 border rounded bg-gray-100 text-xs"
  >
    <option value="pending">Pending</option>
    <option value="accepted">Accepted</option>
    <option value="picked_up">Picked Up</option>
  </select>
  
  <button
    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
    onClick={() => handleDelete(req._id)}
  >
    Delete
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}