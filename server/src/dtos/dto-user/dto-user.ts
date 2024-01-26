import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll} from './types'
import {UserAttributes} from '@models/user/types'
import { ParamsUserGetAll} from '@routers/router-user/types'
import { Bans } from '@common/enums'


class Dto {

    registrationUserDto(user: UserAttributes): DtoUserRegistration {

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

    loginUserDto(user: UserAttributes): DtoUserLogin {

        return {
            email: user.email,
            password: user.password
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

export default new Dto()