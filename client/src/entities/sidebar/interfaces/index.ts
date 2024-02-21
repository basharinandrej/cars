
interface SidebarItem {
    id: number
    path: string
    text: string
    iconType: string
}

export interface Sidebar {
    items: SidebarItem[]
}