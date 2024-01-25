import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import {RegistrationUserDto, LoginUserDto, GetAllUserDto} from './types'
import {UserAttributes} from '@models/user/types'
import { GetUsersRequest} from '@routers/router-user/types'


class Dto {

    registrationUserDto(user: UserAttributes): RegistrationUserDto {

        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            addres: user.addres,
            password: user.password,
            balance: user.balance,
            banType: user.banType,
            avatar: user.avatar,
        }
    }

    loginUserDto(user: UserAttributes): LoginUserDto {

        return {
            email: user.email,
            password: user.password
        }
    }

    getAllUsersDto(req: GetUsersRequest): GetAllUserDto {

        return {
            limit: req.query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: req.query.offset || PAGINATION_DEFAULT_OFFSET,
            role: req.query.role
        }
    }
}

export default new Dto()