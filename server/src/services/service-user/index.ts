import { NextFunction } from "express"
import ApiError from '@api-error/index'
import User from '@models/user'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll} from '@dtos/dto-user/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from './user-utils/get-hash-password'
import {compareHashPassword} from './user-utils/compare-hash-password'
import {mapperUserLogin} from './user-mappers/mapper-user-login'
import {getAllUserMapper} from './user-mappers/get-all-user-mapper'


class ServiceUser {
    async registration(dtoUserRegistration: DtoUserRegistration, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: dtoUserRegistration.email}})

            if(canditate) {
                next(ApiError.bedRequest(errorStrings.userAlreadyExist(canditate.dataValues.email)))
            }

            const hashPassword = await getHashPassword(dtoUserRegistration.password)

            const user = await User.create({
                name: dtoUserRegistration.name,
                surname: dtoUserRegistration.surname,
                password: hashPassword,
                email: dtoUserRegistration.email,
                role: dtoUserRegistration.role,
                phoneNumber: dtoUserRegistration.phoneNumber
            })
            //todo добавить почту

            const {accessToken, refreshToken} = serviceToken.generateTokens({
                id: user.dataValues.id,
                name: user.dataValues.name,
                role: user.dataValues.role
            })

            await serviceToken.saveToken(refreshToken, user.dataValues.id)

            return {
                refreshToken, 
                //todo добавить mapper для реги
                user: mapperUserLogin(user), 
                accessToken
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async login(dtoUserLogin: DtoUserLogin, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: dtoUserLogin.email}})

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoUserLogin.email)))
            } 

            const hashPassword = await getHashPassword(dtoUserLogin.password)
            const isMatchPasswords = await compareHashPassword(dtoUserLogin.password, hashPassword)

            if(isMatchPasswords) {
                const {accessToken, refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                    role: canditate.dataValues.role
                })
                await serviceToken.saveToken(refreshToken, canditate.dataValues.id)

                return {
                    refreshToken,
                    user: mapperUserLogin(canditate),
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

    async getAllUsers({role, limit, offset}: DtoUserGetAll, next: NextFunction) {

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