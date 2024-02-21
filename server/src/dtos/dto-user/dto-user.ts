import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll, DtoInitUser, DtoUserUpdate} from './types'
import { ParamsUserGetAll} from '@controllers/controller-user/types'
import { Bans } from '@common/enums'
import {UserRequestParams, Cookies} from '@common/interfaces'
import {serviceToken} from '@services/service-token'


class DtoUser {

    registrationUserDto(user: UserRequestParams): DtoUserRegistration {

        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            password: user.password,
            ban: user.ban || Bans.Null,
        }
    }

    loginUserDto(user: UserRequestParams): DtoUserLogin {

        return {
            email: user.email,
            password: user.password,
        }
    }

    getAllUsersDto(query: ParamsUserGetAll): DtoUserGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            role: query.role
        }
    }

    getDtoInitUser(cookies: Cookies): DtoInitUser {
        const token = cookies.refreshToken
        return serviceToken.validationToken(token)
    }

    getDtoUpdateUser(user: UserRequestParams): DtoUserUpdate {

        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            password: user.password,
            ban: user.ban
        }
    }
}

export default new DtoUser()