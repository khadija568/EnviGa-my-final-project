// src/app/Pages/HotelDashboardHome.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelDashboardHome() {
  const [hotelName, setHotelName] = useState("Eco Hotel"); // من قاعدة البيانات لاحقًا
  const [lastSubmissionDate, setLastSubmissionDate] = useState("June 5, 2025");
  const [ecoScore, setEcoScore] = useState(72); // درجة بيئية تقديرية
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-white to-lime-50 min-h-screen text-emerald-800">
      <h1 className="text-3xl font-bold mb-4">Welcome, {hotelName} 🌿</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Box 1: Last Waste Submission */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Last Waste Submission</h2>
          <p className="text-gray-700">Date: {lastSubmissionDate}</p>
        </div>

        {/* Box 2: Eco Score */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Eco Participation Score</h2>
          <div className="text-4xl font-bold text-lime-600">{ecoScore}%</div>
          <p className="text-sm text-gray-600">Keep it up! 💪</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-emerald-100 rounded-xl p-6 shadow-inner">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button onClick={() => navigate("/dashboard/hotel/waste")} className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition">
            Submit Waste
          </button>
          <button onClick={() => navigate("/dashboard/hotel/pickups")} className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-lg transition">
            View Pickup Status
          </button>
          <button onClick={() => navigate("/dashboard/hotel/chat")} className="bg-white border border-emerald-400 text-emerald-700 py-2 px-4 rounded-lg hover:bg-emerald-50 transition">
            Chat with Association
          </button>
        </div>
      </div>
    </div>
  );
}