import { UserRoles } from "@shared"

export interface SidebarItem {
    id: number
    path: string
    text: string
    iconType: string
    permissionForUserRole?: UserRoles[]
    onlyOrganization?: boolean
}

export interface Sidebar {
    items: SidebarItem[]
}