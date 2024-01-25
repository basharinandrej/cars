import { NextFunction } from "express"
import ApiError from '@api-error/index'
import User from '@models/user'
import {RegistrationUserDto, LoginUserDto, GetAllUserDto} from '@dtos/dto-user/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from './user-utils/get-hash-password'
import {compareHashPassword} from './user-utils/compare-hash-password'
import {loginUserMapper} from './user-mappers/login-user-mapper'
import {getAllUserMapper} from './user-mappers/get-all-user-mapper'


class ServiceUser {
    async registration(createUserDto: RegistrationUserDto, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: createUserDto.email}})

            if(canditate) {
                next(ApiError.bedRequest(errorStrings.userAlreadyExist(canditate.dataValues.email)))
            }

            const hashPassword = await getHashPassword(createUserDto.password)

            const user = await User.create({
                name: createUserDto.name,
                surname: createUserDto.surname,
                password: hashPassword,
                email: createUserDto.email,
                role: createUserDto.role,
                phoneNumber: createUserDto.phoneNumber
            })
            //добавить почту

            const {accessToken, refreshToken} = serviceToken.generateTokens({
                id: user.dataValues.id,
                name: user.dataValues.name,
                role: user.dataValues.role
            })

            await serviceToken.saveToken(refreshToken, user.dataValues.id)

            return {
                refreshToken, 
                user, 
                accessToken
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async login(loginUserDto: LoginUserDto, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: loginUserDto.email}})

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(loginUserDto.email)))
            } 

            const hashPassword = await getHashPassword(loginUserDto.password)
            const isMatchPasswords = await compareHashPassword(loginUserDto.password, hashPassword)

            if(isMatchPasswords) {
                const {accessToken, refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                    role: canditate.dataValues.role
                })
                await serviceToken.saveToken(refreshToken, canditate.dataValues.id)

                return {
                    refreshToken,
                    user: loginUserMapper(canditate),
                    accessToken
                }
            } else {
                next(ApiError.bedRequest(errorStrings.errorPassword()))
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllUsers({role, limit, offset}: GetAllUserDto, next: NextFunction) {

        try {
            if(role) {
                const users = await User.findAndCountAll({
                    limit,
                    offset,
                    where: { role }
                })
                return getAllUserMapper(users)
            }
            
            if(limit && (offset || offset === 0)) {
                const users = await User.findAndCountAll({
                    limit,
                    offset,
                })
                return getAllUserMapper(users)
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceUser()