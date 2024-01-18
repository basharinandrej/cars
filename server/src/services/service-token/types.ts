import { UserRoles } from "@common/enums";

export interface PayloadToken {
    id: number,
    name: string,
    role: UserRoles
}