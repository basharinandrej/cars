import { PayloadToken } from "@common/types";
import { UserRoles } from "@commonenums";
import { UserAttributes } from "@models/user/types";


export const isAdministrator = (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.ADMIN
}

export const isPerson= (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.PERSON
}

export const isModerator = (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.MODERATOR
}

export const isOrganization = (data: PayloadToken | UserAttributes) => {
    return data.role === UserRoles.ORGANIZATION
}