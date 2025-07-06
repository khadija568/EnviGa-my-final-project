import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "./app/Pages/Home";
import LoginPage from "./app/Pages/login-page";
import RegisterPage from "./app/Pages/register-page";

// لوحات التحكم
//import DashboardLayout from "@/layouts/DashboardLayout";
import HotelDashboardLayout from "@/layouts/HotelDashboardLayout.tsx";
import AssociationDashboardLayout from "./layouts/AssociationDashboardLayout.tsx";

// صفحات الفندق
import HotelStatisticsPage from "@/app/Pages/HotelStatisticsPage";
import HotelChatPage from "@/app/Pages/HotelChatPage";
import HotelWastePage from "@/app/Pages/HotelWastePage";
import HotelPickupStatusPage from "@/app/Pages/HotelPickupStatusPage";
import HotelCertificate from "./app/Pages/HotelCertificate.tsx";

//Association pages
import AssociationStatsPage from "./app/Pages/AssociationStatsPage.tsx";
import AssociationChatPage from "./app/Pages/AssociationMessage.tsx";
import PickupRequests from "./app/Pages/PickupRequests.tsx"

// مكونات مستقبلية (اختياري)
// import OverviewPage from "@/pages/OverviewPage";
// import BookingsPage from "@/pages/BookingsPage";
// import UsersPage from "@/pages/UsersPage";

function App() {
  return (
  
      <Routes>
        {/* المسارات العامة */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        لوحة تحكم عامة (ممكن للمشرف مثلاً)
        {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
          {/* <Route path="overview" element={<OverviewPage />} /> */}
          {/* <Route path="bookings" element={<BookingsPage />} /> */}
          {/* <Route path="users" element={<UsersPage />} /> */}
        {/* </Route> */}

        {/* لوحة تحكم الفندق */}
        <Route path="/dashboard/hotel" element={<HotelDashboardLayout />}>
          <Route index element={<Navigate to="statistics" />} />
          <Route path="statistics" element={<HotelStatisticsPage />} />
          <Route path="chat" element={<HotelChatPage />} />
          <Route path="waste" element={<HotelWastePage />} />
          <Route path="pickups" element={<HotelPickupStatusPage />} />
          <Route path="Certificate" element={<HotelCertificate />} />
        </Route>

        {/* لاحقًا: لوحة تحكم الجمعية */}
        <Route path="/dashboard/association" element={<AssociationDashboardLayout />}>
          <Route path="statistics" element={<AssociationStatsPage />} />
          <Route path="chat" element={<AssociationChatPage />} />
          <Route path="requests" element={<PickupRequests />} />
        </Route>
      </Routes>
    
  );
}

export default App;