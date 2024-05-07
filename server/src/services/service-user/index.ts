import { NextFunction } from "express"
import ApiError from '@api-error/index'
import User from '@models/user'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll, DtoInitUser, DtoUserUpdate} from '@dtos/dto-user/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from '@common/utils/get-hash-password'
import {compareHashPassword} from '@common/utils/compare-hash-password'
import {getAllUserMapper} from './user-mappers/get-all-user-mapper'
import { UserRoles } from "@common/enums"


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
                phoneNumber: dtoUserRegistration.phoneNumber,
                ban: dtoUserRegistration.ban
            })

            const {refreshToken} = serviceToken.generateTokens({
                id: user.dataValues.id,
                name: user.dataValues.name,
                role: user.dataValues.role
            })

            return {
                refreshToken,
                user
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async login(dtoUserLogin: DtoUserLogin, next: NextFunction) {
        try {
            const canditate = await User.findOne({
                where: {email: dtoUserLogin.email},
                attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber', 'ban']
            })

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoUserLogin.email)))
            } 

            const hashPassword = await getHashPassword(dtoUserLogin.password)
            const isMatchPasswords = await compareHashPassword(dtoUserLogin.password, hashPassword)

            if(isMatchPasswords) {
                const {refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                    role: canditate.dataValues.role
                })

                return {
                    refreshToken,
                    user: canditate
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

    async initUser(dtoUserInit:DtoInitUser,next: NextFunction) {
        try {
            if(dtoUserInit.id) {
                const user = await User.findOne({
                    where: {id: dtoUserInit.id},
                    attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber', 'ban']
                })
                const {refreshToken} = serviceToken.generateTokens({
                    id: user.dataValues.id,
                    name: user.dataValues.name,
                    role: user.dataValues.role
                })
                return {
                    refreshToken,
                    user
                }
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async updateUser(dtoUpdateUser: DtoUserUpdate, next: NextFunction) {
        try {
            const user = await User.update(
                dtoUpdateUser,
                {where: {id: dtoUpdateUser.id}}
            )
            return user
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async dropUser(id: number, next: NextFunction) {
        try {
            const candidate = await User.findOne({
                where: {id}
            })
            if(candidate.dataValues.role === UserRoles.Admin) {
                return next(ApiError.bedRequest(errorStrings.canNotDeleteAdmin))
            } else {
                const result = await User.destroy({
                    where: {id},
                })
                return result ? id : false
            }
            
        } catch (error) {
            next(ApiError.internal(error))

        }
    }
}

export default new ServiceUser()