import {UserRoles, Bans} from '@shared'


export interface LoginUserResponse {
    id: number | null
    name: string | null
    surname: string| null
    email: string | null
    role: UserRoles
    phoneNumber: number | null
    ban: Bans
}

export type FieldTypeLoginForm = {
    email?: string;
    password?: string;
};