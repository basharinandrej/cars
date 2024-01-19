import { UserRoles } from "@common/enums";

export type EmptyString = ''


export interface PayloadToken {
    id: number,
    name: string,
    role: UserRoles
}