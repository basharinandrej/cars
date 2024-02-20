
interface SidebarItem {
    id: number
    path: string
    text: string
}

export interface Sidebar {
    items: SidebarItem[]
}