import { TokenAttributes } from '@models/user/token/types'
import {UserAttributes} from '@models/user/types'

export interface UserRequestParams extends UserAttributes, Pick<TokenAttributes, 'fingerPrint'> {}


export interface Tokens {
    accessToken: string
    refreshToken: string
}