import {UserRoles, Bans} from '@shared'

export interface User {
    id: number | null
    name: string | null
    surname: string| null
    email: string | null
    role: UserRoles
    phoneNumber: number | null
    ban: Bans
}
export interface ProfileResponse {
    user: User
}

export interface InitUserResponse extends ProfileResponse {}