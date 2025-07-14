// src/layouts/AssociationDashboardLayout.tsx

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, BarChart, MessageCircle, PackageSearch } from "lucide-react";

export default function AssociationDashboardLayout() {
  const [active, setActive] = useState("statistics");

  const menu = [
    {
      name: "Statistics",
      path: "/dashboard/association/statistics",
      icon: <BarChart size={18} />,
    },
    {
      name: "Chat",
      path: "/dashboard/association/chat",
      icon: <MessageCircle size={18} />,
    },
    {
      name: "Pickup Requests",
      path: "/dashboard/association/requests",
      icon: <PackageSearch size={18} />,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white p-6 shadow-lg flex flex-col justify-between">
        <div>
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-lime-200">EnviGa</h1>
            <p className="text-xs text-emerald-100">Association Dashboard</p>
          </div>

          <nav className="flex flex-col gap-3">
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-lime-300 text-emerald-900"
                      : "hover:bg-lime-200 hover:text-emerald-900"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm hover:text-lime-300 transition">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}