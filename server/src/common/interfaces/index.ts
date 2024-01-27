import { TokenAttributes } from '@models/user/token/types'
import {UserAttributes} from '@models/user/types'
import { OrganizationAttributes } from '@models/organization/types'

export interface UserRequestParams extends UserAttributes, Pick<TokenAttributes, 'fingerPrint'> {}
export interface OrganizationRequestParams extends OrganizationAttributes, Pick<TokenAttributes, 'fingerPrint'> {}


export interface Tokens {
    accessToken: string
    refreshToken: string
}