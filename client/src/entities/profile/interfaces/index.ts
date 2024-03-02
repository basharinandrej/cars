import {UserRoles, Bans, StatusOrganization} from '@shared'

export interface User {
    id: number | null
    name: string | null
    surname: string| null
    email: string | null
    role: UserRoles
    phoneNumber: number | null
    ban: Bans
}
interface Organization {
    id: number | null
    name: string | null
    email: string | null
    avatar: string
    phoneNumber: number | null
    status: StatusOrganization,
}
export interface ProfileResponse {
    user?: User
    organization?: Organization
}

export interface InitUserResponse extends ProfileResponse {}