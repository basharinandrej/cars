import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll} from './types'
import { ParamsUserGetAll} from '@controllers/controller-user/types'
import { Bans } from '@common/enums'
import {UserRequestParams} from '@common/interfaces'


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
            fingerPrint: user.fingerPrint
        }
    }

    loginUserDto(user: UserRequestParams): DtoUserLogin {

        return {
            email: user.email,
            password: user.password,
            fingerPrint: user.fingerPrint
        }
    }

    getAllUsersDto(query: ParamsUserGetAll): DtoUserGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            role: query.role
        }
    }
}

export default new DtoUser()