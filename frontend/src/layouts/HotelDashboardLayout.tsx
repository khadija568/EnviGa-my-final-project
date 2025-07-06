//HotelDashboardLayout.tsx 
import { Outlet, NavLink } from "react-router-dom"; 
import { useState } from "react"; 
import { LogOut, Home, MessageCircle, Trash2, PackageCheck } from "lucide-react";

export default function HotelDashboardLayout() { 
const [active, setActive] = useState("dashboard");

const menu = [ { name: "Dashboard", path: "/dashboard/hotel", icon: <Home size={18} /> }, 
{ name: "Waste Submission", path: "/dashboard/hotel/waste", icon: <Trash2 size={18} /> },
{ name: "Pickup Status", path: "/dashboard/hotel/pickups", icon: <PackageCheck size={18} /> },
{ name: "Chat", path: "/dashboard/hotel/chat", icon: <MessageCircle size={18} /> },
{ name: "certificate", path: "/dashboard/hotel/certificate", icon: <MessageCircle size={18} /> }, ];

return ( <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50"> 
{/* Sidebar */} 
<aside className="w-64 bg-emerald-900 text-white p-6 shadow-lg flex flex-col justify-between">
  <div> 
    <div className="mb-10 text-center"> 
      <h1 className="text-2xl font-bold text-lime-200">EnviGa</h1> 
      <p className="text-xs text-emerald-100">Hotel Dashboard</p> 
    </div>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                isActive ? "bg-lime-300 text-emerald-900" : "hover:bg-lime-200 hover:text-emerald-900"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </nav>
  </div>

    <button className="flex items-center gap-2 text-sm hover:text-lime-300 transition">
      <LogOut size={18} /> Logout
    </button>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-8 overflow-y-auto">
    <Outlet />
  </main>
</div>

); }