import { PayloadToken } from "@common/types";
import { UserRoles } from "@commonenums";
import { UserAttributes } from "@models/user/types";


export const isAdministrator = (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.Admin
}

export const isPerson= (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.Person
}

export const isModerator = (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.Moderator
}
