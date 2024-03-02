
export const enum DetailWears {
    New = 'New',
    CanBeUsed = 'CanBeUsed',
    NeedFix = 'NeedFix'
}

export const enum StatusRequest {
    APPROVED = 'Approved',
    DECLINED = 'Declined',
    IN_VIEWING = 'In_Viewing'
}

export const enum Bans {
    Null = 'Null',
    Temporary = 'Temporary',
    Constant = 'Constant',
    Warning = 'Warning'
}

export const enum StatusOrganization {
    Busy = 'Busy',
    Free = 'Free',
    Waiting = 'Waiting'
}

export const enum UserRoles {
    Person = 'Person',
    Admin = 'Admin',
    Moderator = 'Moderator'
}

export const enum AppTypeError {
    ValidationError = 'validationError',
    InternalError = 'internalError'
}