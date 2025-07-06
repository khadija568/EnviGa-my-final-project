// src/app/Pages/WasteSubmissionPage.tsx
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HotelWastePage() {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/waste", {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // ✅ هذا هو المهم
  },
  body: JSON.stringify({ weight, notes }),
});

    if (res.ok) {
      toast.success("Submission successful!");
      setWeight("");
      setNotes("");
    } else {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <ToastContainer />
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Waste Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
        >
          Submit Waste
        </button>
      </form>
    </div>
  );
}