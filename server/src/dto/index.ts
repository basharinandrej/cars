import {RegistrationUserDto, LoginUserDto, GetAllUserDto} from '@common/dtos'
import {UserAttributes} from '@models/user/types'


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

    getAllUsersDto(query: any): GetAllUserDto {

        return {
            limit: query.limit,
            offset: query.offset
        }
    }
}

export default new Dto()