import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      </>
    </SidebarProvider>
  )
}