import * as React from "react"
import { Leaf, LogOut, BarChart2, MessageCircleMore, Trash2 } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, /*SidebarMenuSub*/ /*SidebarMenuSubButton, /*SidebarMenuSubItem*/ SidebarRail, } from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) { return ( <Sidebar className="bg-gradient-to-b from-green-900 to-emerald-700 text-white shadow-xl" {...props} > {/* Header */} <SidebarHeader> <SidebarMenu> <SidebarMenuItem> <SidebarMenuButton size="lg" asChild> <NavLink to="/" className="group flex items-center gap-2"> <div className="bg-white text-green-700 group-hover:bg-emerald-100 group-hover:text-emerald-900 flex size-8 items-center justify-center rounded-lg shadow-md transition-colors"> <Leaf className="size-4" /> </div> <div className="flex flex-col gap-0.5 leading-none text-white"> <span className="font-semibold group-hover:text-lime-200">EnviGa</span> <span className="text-xs text-emerald-100 group-hover:text-emerald-200">Hotel Panel</span> </div> </NavLink> </SidebarMenuButton> </SidebarMenuItem> </SidebarMenu> </SidebarHeader>

{/* Menu Items */}
  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* <SidebarMenuButton asChild>
            <NavLink
              to="/dashboard/hotel/statistics"
              className={({ isActive }) =>
                `transition-all duration-200 font-medium ${
                  isActive ? "text-lime-300" : "text-white hover:text-lime-200"
                }`
              }
            >
              <span className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4" />
                  Statistics
              </span>
            </NavLink>
          </SidebarMenuButton> */}
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to="/dashboard/hotel/chat"
              end
              className={({ isActive }) =>
                `transition-all duration-200 font-medium flex items-center gap-2 ${
                  isActive ? "text-lime-300" : "text-white hover:text-lime-200"
                }`
              }
            >
              <span className="flex items-center gap-2">
                <MessageCircleMore className="w-4 h-4" />
                  Chat
              </span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to="/dashboard/hotel/waste"
              end
              className={({ isActive }) =>
                `transition-all duration-200 font-medium flex items-center gap-2 ${
                  isActive ? "text-lime-300" : "text-white hover:text-lime-200"
                }`
              }
            >
              <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Manage Waste
              </span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>

  {/* Footer */}
  <div className="p-4 border-t border-emerald-800">
    <button className="flex items-center gap-2 text-sm text-emerald-200 hover:text-white transition-all">
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  </div>

  <SidebarRail />
</Sidebar>

) }