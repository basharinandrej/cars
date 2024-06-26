import { NextFunction } from "express"
import ApiError from '@api-error/index'
import User from '@models/user'
import {DtoUserRegistration, DtoUserLogin, DtoUserGetAll, DtoInitUser, DtoUserUpdate, DtoUserChangePassword} from '@dtos/dto-user/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from '@common/utils/get-hash-password'
import {compareHashPassword} from '@common/utils/compare-hash-password'
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
                next(ApiError.internal(error.message, 'ServiceUser.registration'))
            }
        }
    }

    async login(dtoUserLogin: DtoUserLogin, next: NextFunction) {
        try {
            const canditate = await User.findOne({
                where: {email: dtoUserLogin.email},
                attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber', 'ban', 'password']
            })

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoUserLogin.email)))
            } 

            const isMatchPasswords = await compareHashPassword(dtoUserLogin.password, canditate.dataValues.password)

            if(isMatchPasswords) {
                const {refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                    role: canditate.dataValues.role
                })

                return {
                    refreshToken,
                    user: {
                        id: canditate.dataValues.id,
                        name: canditate.dataValues.name,
                        surname: canditate.dataValues.surname, 
                        email: canditate.dataValues.email,
                        role: canditate.dataValues.role,
                        phoneNumber: canditate.dataValues.phoneNumber,
                        ban: canditate.dataValues.ban
                    }
                }
            } else {
                next(ApiError.bedRequest(errorStrings.errorPasswordOrEmail()))
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceUser.login'))
            }
        }
    }

    async getAllUsers({role, limit, offset}: DtoUserGetAll, next: NextFunction) {
        try {
            if(role) {
                const users = await User.findAndCountAll({
                    limit,
                    offset,
                    where: { role },
                    attributes: ['id', 'name', 'surname', 'email', 'role', 'ban']
                })
                return users
            }
            
            if(limit && offset >= 0) {
                const users = await User.findAndCountAll({
                    limit,
                    offset,
                    attributes: ['id', 'name', 'surname', 'email', 'role', 'ban']
                })
                return users
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceUser.getAllUsers'))
            }
        }
    }

    async initUser(dtoUserInit: DtoInitUser, next: NextFunction) {
        try {
            if(dtoUserInit.id) {
                const user = await User.findOne({
                    where: {id: dtoUserInit.id},
                    attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber', 'ban']
                })
                if(!user) {
                    return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoUserInit.id.toString())))
                }

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
                next(ApiError.internal(error.message, 'ServiceUser.initUser'))
            }
        }
    }

    async updateUser(dtoUpdateUser: DtoUserUpdate, next: NextFunction) {
        try {
            const user = await User.update(
                dtoUpdateUser,
                {
                    where: {id: dtoUpdateUser.id}
                },
            )
            return user
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceUser.updateUser'))
            }
        }
    }

    async dropUser(id: number, next: NextFunction) {
        try {
            const candidate = await User.findOne({
                where: {id}
            })
            if(!candidate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(id.toString())))
            }

            if(candidate.dataValues.role === UserRoles.Admin) {
                return next(ApiError.bedRequest(errorStrings.canNotDeleteAdmin))
            } else {
                const result = await User.destroy({
                    where: {id},
                })
                return result ? id : false
            }
            
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceUser.dropUser'))
            }
        }
    }

    async changePassword({userId, oldPassword, newPassword}: DtoUserChangePassword, next: NextFunction) {
        try {
            const candidate = await User.findOne({
                where: {id: userId},
                attributes: ['id', 'password']
            })
            if(!candidate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(userId.toString())))
            }

            const hashNewPassword = await getHashPassword(newPassword)
            const isMatchOldPasswords = await compareHashPassword(oldPassword, candidate.dataValues.password)
            
            if(isMatchOldPasswords) {
                const user = await User.update(
                    {password: hashNewPassword},
                    {
                        where: {id: userId}
                    },
                )
                return user
            } else {
                next(ApiError.bedRequest(errorStrings.errorPasswordOrEmail()))
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceUser.changePassword'))
            }
        }
    }
}

export default new ServiceUser()