import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {ParamsUserGetAll} from '@controllers/controller-user/types'
import serviceUser from '@services/service-user'
import dtoUser from '@dtos/dto-user/dto-user'
import { RequestCreation, RequestGetAll, RequestGetOne, RequestDelete } from "@common/types"
import {UserRequestParams, UserDeleteParams} from '@common/interfaces'
import { errorStrings } from "@common/error-strings"

class ControllerUser {
    async registration(req: RequestCreation<UserRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoUserRegistration = dtoUser.registrationUserDto(req.body)
            const result = await serviceUser.registration(dtoUserRegistration, next)

            if(result) {
                const {refreshToken, user} = result

                if(!refreshToken) throw Error(errorStrings.notBeEmptyVariable('refreshToken'))
                if(!user.dataValues.id) throw Error(errorStrings.notBeEmptyField('id'))
    
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send(user)
            } else {
                throw Error(errorStrings.notBeEmptyVariable('result'))
            }


        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.registration'))
            }
        }
    }
    async login(req: RequestCreation<UserRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoUserLogin = dtoUser.loginUserDto(req.body)
            const result = await serviceUser.login(dtoUserLogin, next)

            if(result) {
                const {refreshToken, user} = result
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send(user)
            } else {
                throw Error(errorStrings.notBeEmptyVariable('result'))
            }
        } catch (error) {                
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.login'))
            }
        }
    }

    async getAllUsers(req: RequestGetAll<ParamsUserGetAll>, res: Response, next: NextFunction) {
        try {
            const dtoUserGetAll = dtoUser.getAllUsersDto(req.query)
            const users = await serviceUser.getAllUsers(dtoUserGetAll, next)
    
            res.send(users)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.getAllUsers'))
            }
        }
    }

    async initUser(req: RequestGetOne<void>, res: Response, next: NextFunction) {
        try{
            const dtoUserInit = dtoUser.getDtoInitUser(req.cookies)
            const result = await serviceUser.initUser(dtoUserInit, next)

            if(result) {
                const {user, refreshToken} = result

                if(!refreshToken) throw Error(errorStrings.notBeEmptyVariable('refreshToken'))
                if(!user.dataValues.id) throw Error(errorStrings.notBeEmptyField('id'))
    
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send(user)
            } else {
                throw Error(errorStrings.notBeEmptyVariable('result'))
            }
        } catch(err) {
            if(err instanceof Error) {
                next(ApiError.internal(err.message, 'ControllerUser.initUser'))
            }
        }
    }

    async update(req:RequestCreation<UserRequestParams> , res: Response, next: NextFunction) {
        try {
            const dtoUserUpdate = dtoUser.getDtoUpdateUser(req.body)
            const user = await serviceUser.updateUser(dtoUserUpdate, next)

            res.send(user)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.update'))
            }
        }
    }

    async logout(_: unknown, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken')
            res.send('logout')
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.logout'))
            }
        }
    }

    async dropUser(req: RequestDelete<UserDeleteParams>, res: Response, next: NextFunction) {
        try {
            const id = await serviceUser.dropUser(req.query.id, next)
            if(id) {
                res.send(id)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerUser.dropUser'))
            }
        }
    }

    // async dropPassword

    // async changePassword ?
}

export default new ControllerUser()