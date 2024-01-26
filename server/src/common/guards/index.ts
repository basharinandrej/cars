import { PayloadToken } from "@common/types";
import { SortOrderBy, UserRoles } from "@common/enums";
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

export const isOrderByAsc = (orderBy: SortOrderBy) => {
    return orderBy === SortOrderBy.Asc
}

export const isOrderByDesc = (orderBy: SortOrderBy) => {
    return orderBy === SortOrderBy.Desc
}