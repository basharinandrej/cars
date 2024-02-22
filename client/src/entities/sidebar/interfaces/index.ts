import { UserRoles } from "@shared"

interface SidebarItem {
    id: number
    path: string
    text: string
    iconType: string
    userRole?: UserRoles
}

export interface Sidebar {
    items: SidebarItem[]
}