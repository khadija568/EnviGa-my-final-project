// src/app/Pages/HotelPickupStatusPage.tsx
import { useEffect, useState } from "react";

type WastePickup = {
  id: number;
  createdAt: string;
  weight: number;
  status: "pending" | "picked_up" | "accepted";
};

// const mockPickups: WastePickup[] = [
//   { id: 1, date: "2025-06-01", amount: 120, status: "Picked Up" },
//   { id: 2, date: "2025-06-05", amount: 100, status: "Pending" },
//   { id: 3, date: "2025-06-08", amount: 150, status: "Pending" },
// ];

export default function HotelPickupStatusPage() {

  const [pickups, setPickups] = useState<WastePickup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/waste/hotel", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // لو تستخدم JWT
          }
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setPickups(data);
        } else {
          console.error("Failed to fetch pickups");
        }
      } catch (error) {
        console.error("Error fetching pickups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPickups();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">Pickup Status</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border">
          <thead className="bg-emerald-100 text-emerald-800">
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Amount (kg)</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((pickup) => (
              <tr key={pickup.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{pickup.createdAt}</td>
                <td className="py-2 px-4 border">{pickup.weight}</td>
                <td className="py-2 px-4 border">
                  {pickup.status === "pending" ? (
                  <span className="text-yellow-600 font-medium">⏳ Pending</span>
                  ) : pickup.status === "picked_up" ? (
                  <span className="text-green-700 font-medium">✅ Picked Up</span>
                  ) : pickup.status === "accepted" ? (
                  <span className="text-blue-600 font-medium">✔️ Accepted</span>
                  ) : (
                  <span className="text-red-600 font-medium">❌ Unknown</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}