import {UserRoles, Bans} from '@shared'

export interface ProfileResponse {
    user: {
        id: number | null
        name: string | null
        surname: string| null
        email: string | null
        role: UserRoles
        phoneNumber: number | null
        ban: Bans
    }
}

export interface InitUserResponse extends ProfileResponse {}