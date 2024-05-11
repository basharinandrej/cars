import { TokenAttributes } from '@models/user/token/types'
import {UserAttributes} from '@models/user/types'
import { OrganizationAttributes } from '@models/organization/types'
import {AddressAttributes} from '@models/address/types'

export interface UserRequestParams extends UserAttributes, TokenAttributes {}
export interface OrganizationRequestParams extends OrganizationAttributes, TokenAttributes, AddressAttributes {}
export interface UserDeleteParams {
    id: number
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export interface Cookies {
    refreshToken: string
}

export interface UserChangePasswordParams {
    oldPassword: string
    newPassword: string
}

export interface OrganizationChangePasswordParams {
    oldPassword: string
    newPassword: string
}