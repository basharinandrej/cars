import { Bans, UserRoles } from "@shared"


export interface User {
    id: number,
    name:string
    surname: string
    email: string,
    role: UserRoles
    ban: Bans
}

export interface UsersResponse {
    count: number,
    rows: User[]
}

export interface FormUpdateUserValueTypes {
    name: string
    surname: string
    email: string
    role: UserRoles
    ban: Bans
}