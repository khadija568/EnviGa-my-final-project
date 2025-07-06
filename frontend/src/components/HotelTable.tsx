// app/Components/HotelTable.tsx
import React from "react";

const hotels = [
  { id: 1, name: "Hotel A", city: "Paris", rating: 4.5 },
  { id: 2, name: "Hotel B", city: "Rome", rating: 4.2 },
  { id: 3, name: "Hotel C", city: "Madrid", rating: 3.9 },
];

export default function HotelTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200 shadow-sm rounded">
        <thead className="bg-emerald-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">City</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">{hotel.name}</td>
              <td className="px-4 py-2">{hotel.city}</td>
              <td className="px-4 py-2">{hotel.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}